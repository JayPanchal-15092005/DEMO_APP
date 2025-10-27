import { useAuth } from "@clerk/clerk-expo";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4B0082" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* --- Header Section --- */}
        <View>
          <View className="absolute inset-0 bg-gradient-to-br from-[#7B68EE] to-[#4B0082] rounded-b-[40px]" />

          <View className="relative z-10 p-6 md:p-8 w-full max-w-4xl mx-auto">
            {/* --- Navigation Bar --- */}
            <View className="flex-row items-center justify-between mb-8">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-2">🏛️</Text>
                {/* <Text className="text-2xl text-black font-[Inter_700Bold]">
                  Legal Documentation
                </Text> */}
              </View>
              <TouchableOpacity
                onPress={handleSignOut}
                className="flex-row items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg shadow-md"
              >
                <FontAwesome name="sign-out" size={18} color="white" />
                <Text className="text-white font-[Inter_700Bold]">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>

            {/* --- Hero Content --- */}
            <View className="flex-col md:flex-row items-center justify-between pt-4 pb-24">
              <View className="w-full md:w-1/2 mb-8 md:mb-0">
                {/* FIX: Changed text color to white for readability */}
                <Text className="text-4xl md:text-5xl text-black font-[Inter_800ExtraBold] leading-tight md:leading-snug">
                  Create Legal Documents Instantly
                </Text>
                <Text className="text-sm text-black/80 mt-4 mb-6 font-[Inter_400Regular]">
                  Fill in your details and get perfectly formatted Legal
                  documents ready to print. No more waiting in long queues.
                </Text>
                <View className="flex-row space-x-4">
                  <TouchableOpacity
                    className="flex-row items-center bg-lime-400 px-6 py-3 rounded-full shadow-lg active:opacity-80"
                    onPress={() => router.push("/(tabs)/products")}
                  >
                    <Text className="text-indigo-900 font-[Inter_700Bold] mr-2 text-base">
                      Start Creating
                    </Text>
                    <Feather
                      name="arrow-right-circle"
                      size={22}
                      color="#312E81"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="w-full flex-row justify-center mt-8">
                <View className="bg-white/10 p-6 rounded-sm border border-white/20 shadow-lg w-full max-w-xs">
                  <Text className="text-lg text-black font-[Inter_700Bold] mb-2">
                    Create Documents like...
                  </Text>
                  <View className="gap-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-[Inter_400Regular]">
                        Padhinama
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-green-300 mr-1.5">✓</Text>
                        <Text className="text-green-300 font-[Inter_400Regular]">
                          Ready
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-[Inter_400Regular]">
                        Rent Agreement
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-green-300 mr-1.5">✓</Text>
                        <Text className="text-green-300 font-[Inter_400Regular]">
                          Ready
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-[Inter_400Regular]">
                        Affidavit
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-green-300 mr-1.5">✓</Text>
                        <Text className="text-green-300 font-[Inter_400Regular]">
                          Ready
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-[Inter_400Regular]">
                        Birth Certificate
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-green-300 mr-1.5">✓</Text>
                        <Text className="text-green-300 font-[Inter_400Regular]">
                          Ready
                        </Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-black font-[Inter_400Regular]">
                        Marriage Certificate
                      </Text>
                      <View className="flex-row items-center">
                        <Text className="text-green-300 mr-1.5">✓</Text>
                        <Text className="text-green-300 font-[Inter_400Regular]">
                          Ready
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* --- Stats Section --- */}
        {/* FIX: Adjusted negative margin to prevent overlap */}
        <View className="flex-row justify-around py-8 -mt-20 z-20 bg-white mx-4 rounded-xl shadow-lg">
          <View className="flex-1 items-center">
            <Text className="text-3xl font-[Inter_700Bold] text-[#4B0082]">
              500+
            </Text>
            <Text className="text-sm text-gray-500 mt-1 font-[Inter_400Regular]">
              Documents Created
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-3xl font-[Inter_700Bold] text-[#4B0082]">
              99.9%
            </Text>
            <Text className="text-sm text-gray-500 mt-1 font-[Inter_400Regular]">
              Accuracy Rate
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text className="text-3xl font-[Inter_700Bold] text-[#4B0082]">
              24/7
            </Text>
            <Text className="text-sm text-gray-500 mt-1 font-[Inter_400Regular]">
              Available
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
