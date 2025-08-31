import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import Cookies from 'js-cookie';

import { CONFIG } from 'src/global-config';

import { DEVICE_ID_KEY, JWT_ACCESS_KEY, JWT_REFRESH_KEY } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

const onReqConfig = async (config: InternalAxiosRequestConfig) => {
  const accessToken = Cookies.get(JWT_ACCESS_KEY);
  if (!config.headers['Authorization']) {
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  return config;
};

const onReqError = async (error: AxiosError) => error;

axiosInstance.interceptors.request.use(onReqConfig, onReqError);

let isRefreshing = false;

const refreshTokenFailed = (error: AxiosError) => {
  console.log('Refresh token failed, clearing session storage');
  Cookies.remove(JWT_ACCESS_KEY);
  Cookies.remove(JWT_REFRESH_KEY);
  isRefreshing = false;
  return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
};

const onResError = async (error: AxiosError) => {
  const originalConfig = error.config as InternalAxiosRequestConfig;

  const isSSR = typeof window === 'undefined';
  if (!isSSR) {
    if (
      error.response?.status === 401 &&
      typeof error.response.data === 'object' &&
      error.response.data !== null &&
      'message' in error.response.data &&
      (error.response.data as { message?: string }).message === 'Access denied'
    ) {
      console.log('Needs to refresh token');
      if (!isRefreshing) {
        isRefreshing = true;
        const currentRefreshToken = Cookies.get(JWT_REFRESH_KEY);
        const deviceId = Cookies.get(DEVICE_ID_KEY);
        if (!currentRefreshToken || !deviceId) {
          return refreshTokenFailed(error);
        }
        return await axios
          .post(
            CONFIG.serverUrl + endpoints.auth.refreshToken,
            {},
            { headers: { Authorization: `Bearer ${currentRefreshToken}`, 'device-id': deviceId } }
          )
          .then((res) => {
            console.log('Token refreshed successfully');
            Cookies.remove(JWT_ACCESS_KEY);
            Cookies.remove(JWT_REFRESH_KEY);
            const { accessToken, refreshToken } = res.data;
            Cookies.set(JWT_ACCESS_KEY, accessToken);
            Cookies.set(JWT_REFRESH_KEY, refreshToken);
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
            isRefreshing = false;
            return axiosInstance(originalConfig);
          })
          .catch((err) =>
            Promise.reject((error.response && error.response.data) || 'Something went wrong!')
          );
      } else {
        while (isRefreshing) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    } else {
      return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
    }
  } else {
    // case SSR
    return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => onResError(error)
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res?.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/user/me',
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    refreshToken: '/auth/refresh-token',
  },
} as const;
