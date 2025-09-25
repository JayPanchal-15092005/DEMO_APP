import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLoginPress = async () => {
    if (!isLoaded) return;

    try {
      setLoading(true);

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // ✅ activate session
        // router.replace("/(tabs)/dashboard"); // redirect to home tab
        router.replace("/(tabs)")
      } else {
        console.log("Login not complete:", result);
      }
    } catch (err: any) {
      Alert.alert(
        "Login failed",
        err.errors?.[0]?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <View className="bg-white rounded-2xl p-6 w-full shadow-lg">
        <Text className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-700"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-3 mb-6 text-gray-700"
        />

        <TouchableOpacity
          onPress={onLoginPress}
          disabled={loading}
          className={`rounded-lg py-3 ${
            loading ? "bg-blue-300" : "bg-blue-500"
          }`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-blue-500 font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
