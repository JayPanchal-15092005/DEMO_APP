// import {
//   Inter_400Regular,
//   Inter_500Medium,
//   Inter_600SemiBold,
//   Inter_700Bold,
//   Inter_800ExtraBold,
//   useFonts,
// } from "@expo-google-fonts/inter";
// import { router } from "expo-router";
// import React from "react";
// import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const { width } = Dimensions.get("window");

// const App = () => {
//   let [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//     Inter_700Bold,
//     Inter_800ExtraBold,
//   });

//   if (!fontsLoaded) {
//     return <View><Text>Loading...</Text></View>;
//   }

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="relative w-full" style={{ height: width > 768 ? 500 : 400 }}>
//         <View className="absolute inset-0 bg-gradient-to-br from-[#7B68EE] to-[#4B0082]" style={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />

//         <View className="relative z-10 p-8 w-full max-w-4xl mx-auto">
//           <View className="flex-row items-center justify-between mb-8">
//             <View className="flex-row items-center">
//               <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginRight: 8, fontFamily: 'Inter_700Bold' }}>🏛️</Text>
//               <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", fontFamily: 'Inter_700Bold' }}>
//                 Legal Documentation Portal
//               </Text>
//             </View>
//           </View>

//           <View className="flex-col md:flex-row items-center justify-between">
//             <View className="w-full md:w-1/2 mb-8 md:mb-0">
//               <Text style={{ fontSize: width > 768 ? 48 : 36, lineHeight: width > 768 ? 56 : 44, fontWeight: "medium", color: "black", fontFamily: 'Inter_800ExtraBold' }}>
//                 Create Legal Documents Instantly
//               </Text>
//               <Text style={{ fontSize: 14, color: "black", marginTop: 16, marginBottom: 24, fontFamily: 'Inter_400Regular' }}>
//                 Fill in your details and get perfectly formatted Legal documents
//                 ready to print. No more waiting in long queues or complex
//                 procedures.
//               </Text>
//               <View className="flex-row space-x-4">
//                 <TouchableOpacity className="flex-row items-center bg-white px-6 py-3 rounded-lg shadow-md"
//                 onPress={() => router.push("/(tabs)/products")}
//                 >
//                   <Text style={{ color: "#2563EB", fontWeight: "600", marginRight: 8, fontFamily: 'Inter_600SemiBold' }}>
//                     Start Creating Documents
//                   </Text>
//                   <Text style={{ color: "#2563EB", fontWeight: "600", fontFamily: 'Inter_600SemiBold' }}>→</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity className="bg-transparent border border-white px-6 py-3 rounded-lg">
//                   <Text style={{ color: "black", fontWeight: "600", fontFamily: 'Inter_600SemiBold' }}>
//                     About Our Portal
//                   </Text>
//                 </TouchableOpacity> */}
//               </View>
//             </View>

//             <View className="w-full md:w-1/2 md:pl-8 flex-row justify-center">
//               <View className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg" style={{ width: "100%", maxWidth: 350 }}>
//                 <Text style={{ fontSize: 18, fontWeight: "bold", color: "black", marginBottom: 8, fontFamily: 'Inter_700Bold' }}>
//                   Legal Documentation Portal
//                 </Text>
//                 <Text style={{ color: "black", fontSize: 14, marginBottom: 8, fontFamily: 'Inter_400Regular' }}>
//                   Create Documents like...
//                 </Text>
//                 <View className="space-y-3">
//                   <View className="flex-row items-center justify-between">
//                     <Text style={{ color: "black", fontFamily: 'Inter_400Regular' }}>Padhinama</Text>
//                     <View className="flex-row items-center">
//                       <Text style={{ color: "#4CAF50", marginRight: 4 }}>✓</Text>
//                       <Text style={{ color: "#4CAF50", fontFamily: 'Inter_400Regular' }}>Ready</Text>
//                     </View>
//                   </View>
//                   <View className="flex-row items-center justify-between">
//                     <Text style={{ color: "black", fontFamily: 'Inter_400Regular' }}>Rent Agreement</Text>
//                     <View className="flex-row items-center">
//                       <Text style={{ color: "#4CAF50", marginRight: 4 }}>✓</Text>
//                       <Text style={{ color: "#4CAF50", fontFamily: 'Inter_400Regular' }}>Ready</Text>
//                     </View>
//                   </View>
//                   <View className="flex-row items-center justify-between">
//                     <Text style={{ color: "black", fontFamily: 'Inter_400Regular' }}>Affidavit</Text>
//                     <View className="flex-row items-center">
//                       <Text style={{ color: "#4CAF50", marginRight: 4 }}>✓</Text>
//                       <Text style={{ color: "#4CAF50", fontFamily: 'Inter_400Regular' }}>Ready</Text>
//                     </View>
//                   </View>
//                   <View className="flex-row items-center justify-between">
//                     <Text style={{ color: "black", fontFamily: 'Inter_400Regular' }}>Birth Certificate</Text>
//                     <View className="flex-row items-center">
//                       <Text style={{ color: "#4CAF50", marginRight: 4 }}>✓</Text>
//                       <Text style={{ color: "#4CAF50", fontFamily: 'Inter_400Regular' }}>Ready</Text>
//                     </View>
//                   </View>
//                   <View className="flex-row items-center justify-between">
//                     <Text style={{ color: "black", fontFamily: 'Inter_400Regular' }}>Marriage Certificate</Text>
//                     <View className="flex-row items-center">
//                       <Text style={{ color: "#4CAF50", marginRight: 4 }}>✓</Text>
//                       <Text style={{ color: "#4CAF50", fontFamily: 'Inter_400Regular' }}>Ready</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>

//       <View className="flex-row justify-around py-8" style={{ marginTop: -80, zIndex: 20 }}>
//         <View className="flex-1 items-center">
//           <Text style={{ fontSize: 36, fontWeight: "bold", color: "#2563EB", fontFamily: 'Inter_700Bold' }}>500+</Text>
//           <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4, fontFamily: 'Inter_400Regular' }}>Documents Created</Text>
//         </View>
//         <View className="flex-1 items-center">
//           <Text style={{ fontSize: 36, fontWeight: "bold", color: "#2563EB", fontFamily: 'Inter_700Bold' }}>99.9%</Text>
//           <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4, fontFamily: 'Inter_400Regular' }}>Accuracy Rate</Text>
//         </View>
//         <View className="flex-1 items-center">
//           <Text style={{ fontSize: 36, fontWeight: "bold", color: "#2563EB", fontFamily: 'Inter_700Bold' }}>24/7</Text>
//           <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4, fontFamily: 'Inter_400Regular' }}>Available</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   // No styles needed here, NativeWind handles them.
// });

// export default App;

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

  // Clerk's useAuth hook to get the signOut function
  const { signOut } = useAuth();

  // Handle the sign-out process
  const handleSignOut = async () => {
    try {
      await signOut();
      // After successful sign-out, you might want to navigate
      // the user to the login screen, though Clerk handles this.
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!fontsLoaded) {
    // A simple loading indicator while fonts are loading
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
        <View className="relative w-full h-[400px] md:h-[500px]">
          {/* Background Gradient */}
          <View className="absolute inset-0 bg-gradient-to-br from-[#7B68EE] to-[#4B0082] rounded-b-[40px]" />

          <View className="relative z-10 p-6 md:p-8 w-full max-w-4xl mx-auto">
            {/* --- Navigation Bar with Sign Out Button --- */}
            <View className="flex-row items-center justify-between mb-8">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-2">🏛️</Text>
                <Text className="text-2xl text-white font-[Inter_700Bold]">
                  Legal Documentation
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={handleSignOut}
                className="bg-white/20 px-4 py-2 rounded-lg border border-white/30"
              >
                <Text className="text-black font-[Inter_600SemiBold]">Sign Out</Text>
              </TouchableOpacity> */}

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
            <View className="flex-col md:flex-row items-center justify-between">
              <View className="w-full md:w-1/2 mb-8 md:mb-0">
                <Text className="text-4xl md:text-5xl text-black font-[Inter_800ExtraBold] leading-tight md:leading-snug">
                  Create Legal Documents Instantly
                </Text>
                <Text className="text-sm text-black/80 mt-4 mb-6 font-[Inter_400Regular]">
                  Fill in your details and get perfectly formatted Legal
                  documents ready to print. No more waiting in long queues.
                </Text>
                <View className="flex-row space-x-4">
                  {/* <TouchableOpacity
                    className="flex-row items-center bg-white px-6 py-3 rounded-lg shadow-md"
                    onPress={() => router.push("/(tabs)/products")}
                  >
                    <Text className="text-[#4B0082] font-[Inter_600SemiBold] mr-2">
                      Start Creating
                    </Text>
                    <Text className="text-[#4B0082] font-[Inter_600SemiBold]">
                      →
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    className="flex-row items-center bg-yellow-400 px-6 py-3 rounded-full shadow-lg active:opacity-80"
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

              <View className="w-full md:w-1/2 md:pl-8 flex-row justify-center">
                <View className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-lg w-full max-w-[350px]">
                  <Text className="text-lg text-black font-[Inter_700Bold] mb-2">
                    Create a Documents like...
                  </Text>
                  <View className="space-y-3">
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

        {/* You can add more content sections here below the stats */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
