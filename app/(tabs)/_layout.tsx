// import React from "react";
// import { Tabs } from "expo-router";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { View } from "react-native";

// export default function TabsLayout() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#ffffff",
//           borderTopWidth: 1,
//           borderTopColor: "#e5e7eb",
//           height: 56 + insets.bottom,
//           paddingTop: 6,
//         },
//         tabBarActiveTintColor: "#1DA1F2",
//         tabBarInactiveTintColor: "#9ca3af",
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="dashboard"
//         options={{
//           title: "Dashboard",
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="dashboard" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { FontAwesome } from '@expo/vector-icons';
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          height: 56 + insets.bottom,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "#9ca3af",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Documents",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-alt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: "form",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="form" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="preview"
        options={{
          title: "preview",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="preview" size={size} color={color} />
          ),
        }}
       />
    </Tabs>
  );
}