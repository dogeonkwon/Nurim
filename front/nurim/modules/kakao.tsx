import React, {useState} from 'react';
import {
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';

export const signInWithKakao = async (): Promise<void> => {
  try {
    const token = await login();
    console.log(token);
    console.log(JSON.stringify(token));
    getProfile();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('login err', err);
  }
};

export const signOutWithKakao = async (): Promise<void> => {
  try {
    const message = await logout();

    setResult(message);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('signOut error', err);
  }
};

export const getProfile = async (): Promise<void> => {
  try {
    const profile = await getKakaoProfile();

    console.log(JSON.stringify(profile));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('signOut error', err);
  }
};

export const unlinkKakao = async (): Promise<void> => {
  try {
    const message = await unlink();

    setResult(message);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('signOut error', err);
  }
};
