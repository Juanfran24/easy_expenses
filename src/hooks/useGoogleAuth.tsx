import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithCredential,
  UserCredential,
} from "firebase/auth";
import { auth } from "../database";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID!,
    // clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB!,
    // redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCred) => {
          setUserCredential(userCred);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [response]);

  const handleGoogleAuth = () => {
    return promptAsync();
  };

  return {
    handleGoogleAuth,
    userCredential,
    error,
    request,
  };
}
