import Cookie from 'js-cookie';

import { paths } from 'src/routes/paths';

import axios from 'src/lib/axios';

import { DEVICE_ID_KEY, JWT_ACCESS_KEY, JWT_REFRESH_KEY } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.');
      Cookie.remove(JWT_ACCESS_KEY);
      window.location.href = paths.auth.signIn;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null, refreshToken: string | null) {
  try {
    if (accessToken && refreshToken) {
      Cookie.set(JWT_ACCESS_KEY, accessToken);
      Cookie.set(JWT_REFRESH_KEY, refreshToken);
      const deviceId = Cookie.get(DEVICE_ID_KEY);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      axios.defaults.headers.common['device-id'] = deviceId || 'unknown-device';
      // const decodedToken = jwtDecode(accessToken);

      // if (decodedToken && 'exp' in decodedToken) {
      //   tokenExpired(decodedToken.exp);
      // } else {
      //   throw new Error('Access token không hợp lệ!');
      // }
    } else {
      Cookie.remove(JWT_ACCESS_KEY);
      Cookie.remove(JWT_REFRESH_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
