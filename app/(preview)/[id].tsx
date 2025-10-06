import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function PreviewScreen() {
  const { html } = useLocalSearchParams<{ html?: string }>();

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "  દસ્તાવેજ",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center px-3 py-1 rounded-lg active:bg-gray-200 border-2 border-y-black"
            >
              <Ionicons name="arrow-back" size={22} color="black" />
              <Text className="ml-2 text-base font-semibold text-gray-800">
                back
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {html ? (
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          className="flex-1"
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-700 text-base">
            કોઈ ડોક્યુમેન્ટ ઉપલબ્ધ નથી
          </Text>
        </View>
      )}
    </View>
  );
}
