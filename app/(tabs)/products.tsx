import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

// Document templates data
const documentTemplates = [
  {
    id: "affidavit",
    name: "Affidavit",
    description: "General purpose affidavit for legal declarations",
    price: 500,
    category: "Legal",
  },
  {
    id: "will",
    name: "Will",
    description: "Last will and testament document",
    price: 500,
    category: "Legal",
  },
  {
    id: "rent_agreement",
    name: "Rent Agreement",
    description: "Rental agreement for residential/commercial property",
    price: 500,
    category: "Property",
  },
  {
    id: "marriage_certificate",
    name: "Marriage Certificate",
    description: "Official marriage certificate application",
    price: 500,
    category: "Personal",
  },
  {
    id: "birth_certificate",
    name: "Birth Certificate",
    description: "Birth certificate application form",
    price: 500,
    category: "Government",
  },
  {
    id: "domicile_certificate",
    name: "Domicile Certificate",
    description: "Domicile certificate for state residence proof",
    price: 500,
    category: "Government",
  },
];

export default function ProductsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const categories = ["All", "Legal", "Property", "Personal", "Government"];

  // Filtered documents based on search term and category
  const filteredTemplates = documentTemplates.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplatePress = (templateId: string) => {
    if (templateId === "rent_agreement") {
        router.push('/(tabs)/forms/rent-agreement');
    } else {
      // Handle navigation for other document types
      alert(`Navigating to form for ${templateId}`);
    }
  };

  const renderItem = ({ item }: { item: (typeof documentTemplates)[0] }) => (
    <TouchableOpacity
      onPress={() => handleTemplatePress(item.id)}
      className="p-4 bg-white rounded-lg shadow-md mb-4 border-2 border-transparent active:border-blue-500"
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          {item.category}
        </Text>
      </View>
      <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
      <Text className="text-base text-blue-600 font-semibold mt-2">
        ₹{item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          headerTitle: "Templates",
          headerShown: true,
        }}
      />

      <View className="flex-1 p-4">
        {/* Header Section */}
        <Text className="text-xl font-bold text-gray-900 mt-2">
          Choose from our collection of government document templates.
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Fill in your details and get professionally formatted documents ready
          to print.
        </Text>

        {/* Search and Filter */}
        <View className="mt-4 flex-row items-center space-x-2">
          <View className="flex-1 relative">
            <FontAwesome5
              name="search"
              size={16}
              color="#9ca3af"
              className="absolute left-3 top-1/2 -mt-2"
            />
            <TextInput
              className="pl-10 pr-4 py-3 bg-white rounded-lg border border-gray-300 text-gray-800"
              placeholder="Search documents (e.g., affidavit, birth certificate)"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
        </View>

        {/* Categories as horizontal scroll */}
        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-2"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-full ${selectedCategory === category ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <Text
                  className={`${selectedCategory === category ? "text-white" : "text-gray-700"}`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Document List */}
        <View className="mt-4 flex-1">
          <FlatList
            data={filteredTemplates}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => (
              <Text className="text-center text-gray-500 mt-20">
                No documents found.
              </Text>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});
