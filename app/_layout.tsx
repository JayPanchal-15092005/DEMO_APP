
// gemini code working correctly log in and sign up with clerk and expo-router but with the swiching tabs Problmemm
// // app/_layout.tsx
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";

const CLERK_PUBLISHABLE_KEY = "pk_test_ZXF1aXBwZWQtbWFzdG9kb24tMC5jbGVyay5hY2NvdW50cy5kZXYk";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) { // !inAuthGroup
      router.replace('/(tabs)/dashboard');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [isLoaded, isSignedIn, segments]);

  return <Stack screenOptions={{ headerShown: false}} />;
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <InitialLayout />
      <StatusBar style="dark" />
    </ClerkProvider>
  );
}

// app/_layout.tsx
// Chatgpt code but with the login and sign up Problems
// import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
// import { Stack, useRouter, useSegments } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect } from "react";
// import "../global.css";

// const CLERK_PUBLISHABLE_KEY = "pk_test_ZXF1aXBwZWQtbWFzdG9kb24tMC5jbGVyay5hY2NvdW50cy5kZXYk";

// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

// function InitialLayout() {
//   const { isLoaded, isSignedIn } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoaded) return;

//     const inAuthGroup = segments[0] === "(auth)";

//     if (isSignedIn && inAuthGroup) {
//       // 👇 Redirect to a real screen inside (tabs)
//       // router.replace("/(tabs)"); // or "/(tabs)/dashboard"
//       router.replace("/(tabs)/dashboard");
//     } else if (!isSignedIn && !inAuthGroup) {
//       router.replace("/(auth)/login");
//     }
//   }, [isLoaded, isSignedIn, segments]);

//   return <Stack />;
// }

// export default function RootLayout() {
//   return (
//     <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
//       <InitialLayout />
//       <StatusBar style="dark" />
//     </ClerkProvider>
//   );
// }

