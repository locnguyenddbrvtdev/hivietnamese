'use client';

import { UAParser } from 'ua-parser-js';

import axios, { endpoints } from 'src/lib/axios';

import { setSession } from './utils';
import { JWT_ACCESS_KEY } from './constant';
// import { IResponse } from 'src/types/reponse';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceId: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({
  email,
  password,
  rememberMe = true,
  deviceId,
}: SignInParams): Promise<void> => {
  try {
    const parser = UAParser();
    const params = { email, password, rememberMe, deviceId };

    const res = await axios.post(endpoints.auth.signIn, {
      ...params,
      deviceName: `${parser.os.name}-${parser.browser.name}`,
    });

    const { accessToken, refreshToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken, refreshToken);
  } catch (error) {
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<void> => {
  const params = {
    email,
    password,
    firstName,
    lastName,
  };

  try {
    const res = await axios.post(endpoints.auth.signUp, params);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null, null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
