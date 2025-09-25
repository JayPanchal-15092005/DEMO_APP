import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      // The key is to check for the created session, which confirms
      // the user is now authenticated and a session has been created.
      if (result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
        // router.replace("/(tabs)/dashboard"); // Redirect to the main app dashboard
      } else {
        // If a session isn't created, something went wrong, and
        // you should provide a clear error message to the user.
        console.log("Verification failed, session not created:", result);
        Alert.alert("Verification failed", "Something went wrong after verifying. Please try logging in or signing up again.");
      }
    } catch (err: any) {
      Alert.alert("Verification failed", err.errors?.[0]?.message || "Invalid code");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <View className="bg-white rounded-2xl p-6 w-full shadow-lg">
        {!pendingVerification ? (
          <>
            <Text className="text-3xl font-bold text-center mb-6">Sign Up</Text>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="border border-gray-300 rounded-lg px-4 py-3 mb-6"
            />
            <TouchableOpacity
              onPress={onSignUpPress}
              className="bg-blue-500 rounded-lg py-3"
            >
              <Text className="text-white text-center font-semibold">
                Continue
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-2xl font-bold text-center mb-6">
              Enter Verification Code
            </Text>
            <TextInput
              placeholder="Verification Code"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-center"
            />
            <TouchableOpacity
              onPress={onVerifyPress}
              className="bg-green-500 rounded-lg py-3"
            >
              <Text className="text-white text-center font-semibold">
                Verify & Sign Up
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}