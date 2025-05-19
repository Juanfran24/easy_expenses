import Constants from "expo-constants";

export const API_KEY =
  process.env.EXPO_PUBLIC_API_KEY ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_API_KEY;
export const AUTH_DOMAIN =
  process.env.EXPO_PUBLIC_AUTH_DOMAIN ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_DOMAIN;
export const PROJECT_ID =
  process.env.EXPO_PUBLIC_PROJECT_ID ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_PROJECT_ID;
export const STORAGE_BUCKET =
  process.env.EXPO_PUBLIC_STORAGE_BUCKET ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_STORAGE_BUCKET;
export const MESSAGING_SENDER_ID =
  process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_MESSAGING_SENDER_ID;
export const APP_ID =
  process.env.EXPO_PUBLIC_APP_ID ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_APP_ID;
