import { Inter_400Regular, useFonts } from "@expo-google-fonts/inter";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView, // Added ScrollView import back
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const documentTemplates = [
  { id: "affidavit", name: "Affidavit", description: "General purpose affidavit for legal declarations", price: 500, category: "Legal" },
  { id: "will", name: "Will", description: "Last will and testament document", price: 500, category: "Legal" },
  { id: "rent_agreement", name: "Rent Agreement", description: "Rental agreement for property", price: 500, category: "Property" },
  { id: "marriage_certificate", name: "Marriage Certificate", description: "Official marriage certificate application", price: 500, category: "Personal" },
  { id: "birth_certificate", name: "Birth Certificate", description: "Birth certificate application form", price: 500, category: "Government" },
  { id: "domicile_certificate", name: "Domicile Certificate", description: "Domicile certificate for residence proof", price: 500, category: "Government" },
  { id: "Lease_Deed", name: "Lease Deed", description: "Lease Deed", price: 900, category: "Legal" },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  let [fontsLoaded] = useFonts({ Inter_400Regular });

  const categories = ["All", "Legal", "Property", "Personal", "Government"];

  const filteredTemplates = documentTemplates.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- START: Combined Navigation Logic ---
  const handleDocumentPress = (templateId: string) => {
    if (templateId === "rent_agreement") {
      router.push('/(tabs)/forms/rent-agreement'); // Navigate to Rent Agreement
    } else if (templateId === "Lease_Deed") {
      router.push('/(tabs)/forms/lease-deed'); // Navigate to Lease Deed
    } else {
      // Handle other documents or show an alert
      alert(`Navigating to form for ${templateId}`);
    }
  };
  // --- END: Combined Navigation Logic ---

  // --- START: Fixed Font Loading Check ---
  if (!fontsLoaded) { // Correctly check if fonts are loaded
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  // --- END: Fixed Font Loading Check ---

  const renderItem = ({ item }: { item: typeof documentTemplates[0] }) => (
    <TouchableOpacity
      // Use the combined handler
      onPress={() => handleDocumentPress(item.id)}
      className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-200 active:border-blue-500"
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full font-semibold">{item.category}</Text>
      </View>
      <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
      <Text className="text-base text-blue-600 font-semibold mt-2">₹{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen options={{ headerTitle: "Templates", headerShown: true }} />

      <FlatList
        data={filteredTemplates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        ListHeaderComponent={
          <>
            <Text className="text-xl font-bold text-gray-900 mt-2">Choose from our collection of templates.</Text>
            <Text className="text-sm text-gray-500 mt-1 mb-4">Fill in your details and get professionally formatted documents.</Text>

            <View className="flex-row items-center bg-white rounded-lg border border-gray-300 px-3 mb-4">
              <FontAwesome5 name="search" size={16} color="#9ca3af" />
              <TextInput
                className="flex-1 h-12 ml-2 text-gray-800"
                placeholder="Search documents..."
                placeholderTextColor="#9ca3af"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row space-x-2">
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    className={`py-2 px-5 rounded-full ${selectedCategory === category ? "bg-blue-600" : "bg-gray-200"}`}
                  >
                    <Text className={`${selectedCategory === category ? "text-white" : "text-gray-700"} font-semibold`}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        }
        ListEmptyComponent={() => (<Text className="text-center text-gray-500 mt-20">No documents found.</Text>)} 
      />
    </SafeAreaView>
  );
}