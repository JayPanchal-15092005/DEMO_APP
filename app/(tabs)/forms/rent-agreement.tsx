import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function RentAgreementForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    landlordName: "",
    landlordFatherName: "",
    landlordAge: "",
    landlordAddress: "",
    tenantName: "",
    tenantFatherName: "",
    tenantAge: "",
    tenantAddress: "",
    propertyDescription: "",
    agreementDate: new Date().toLocaleDateString("en-IN"),
    months: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
    securityDeposit: "",
    landlordSignature: "",
    tenantSignature: "",
    witnessName: "",
    witnessAddress: "",
    agreementLocation: "", // New state for the location
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const onPrintPress = async () => {
  try {
    // Generate the HTML as you already do in onPreviewPress
    const asset = Asset.fromModule(
      require("../../templates/rent_agreement.html")
    );
    await asset.downloadAsync();
    const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri!);

    let finalHtml = htmlTemplate;

    for (const key in formData) {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      const value =
        formData[key as keyof typeof formData] || "____________________";
      finalHtml = finalHtml.replace(placeholder, value);
    }

    finalHtml = finalHtml
      .replace(/\/g/, "")
      .replace(/\[cite_start\]/g, "")
      .replace(/\[cite_end\]/g, "");

    // The print logic
    await Print.printAsync({
      html: finalHtml,
      // You can add more options here, like margins
    });
  } catch (e) {
    console.error("Error printing document:", e);
    Alert.alert("Error", "Could not print document. Please try again.");
  }
};

  const onPreviewPress = async () => {
    try {
      const asset = Asset.fromModule(
        require("../../templates/rent_agreement.html")
      );
      await asset.downloadAsync();

      const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri!);

      let finalHtml = htmlTemplate;

      for (const key in formData) {
        const placeholder = new RegExp(`{{${key}}}`, "g");
        const value =
          formData[key as keyof typeof formData] || "____________________";
        finalHtml = finalHtml.replace(placeholder, value);
      }

      finalHtml = finalHtml
        .replace(/\/g/, "")
        .replace(/\[cite_start\]/g, "")
        .replace(/\[cite_end\]/g, "");

      router.push({
        pathname: "/(tabs)/preview",
        params: { html: finalHtml },
      });
    } catch (e) {
      console.error("Error loading or processing template:", e);
      Alert.alert("Error", "Could not load template. Please try again.");
    }
  };

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity
//          onPress={onPreviewPress}
//          className="bg-blue-600 px-4 py-2 rounded-md"
//         >
//          <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
//        </TouchableOpacity>
// ),
//     });
//   }, [navigation, onPreviewPress]);

useEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <SafeAreaView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={onPrintPress}
          className="bg-green-600 px-4 py-2 rounded-md mr-2" // Add some margin
        >
          <Text className="text-white font-bold">પ્રિન્ટ કરો</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPreviewPress}
          className="bg-blue-600 px-4 py-2 rounded-md"
        >
          <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    ),
  });
}, [navigation, onPreviewPress, onPrintPress]);

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        className="p-5"
      >
        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
કરારની મુખ્ય વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="શહેર"
          onChangeText={(text) => handleChange("agreementLocation", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="કરારની તારીખ (DD/MM/YYYY)"
          onChangeText={(text) => handleChange("agreementDate", text)}
        />

        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
મકાનમાલિકની વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="નામ"
          onChangeText={(text) => handleChange("landlordName", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="પિતાનું નામ"
          onChangeText={(text) => handleChange("landlordFatherName", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="ઉંમર"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("landlordAge", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="રહેવાસી (સરનામું)"
          onChangeText={(text) => handleChange("landlordAddress", text)}
        />
        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
ભાડુઆતની વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="નામ"
          onChangeText={(text) => handleChange("tenantName", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="પિતાનું નામ"
          onChangeText={(text) => handleChange("tenantFatherName", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="ઉંમર"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("tenantAge", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="રહેવાસી (સરનામું)"
          onChangeText={(text) => handleChange("tenantAddress", text)}
        />
        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
મિલકત અને ભાડાની વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="મિલકતનું સંપૂર્ણ વર્ણન"
          onChangeText={(text) => handleChange("propertyDescription", text)}
          multiline
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="ભાડાનો સમયગાળો (મહિનામાં)"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("months", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="શરૂઆતની તારીખ (DD/MM/YYYY)"
          onChangeText={(text) => handleChange("startDate", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="અંતની તારીખ (DD/MM/YYYY)"
          onChangeText={(text) => handleChange("endDate", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="માસિક ભાડું (₹)"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("rentAmount", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="સિક્યોરિટી ડિપોઝીટ (₹)"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("securityDeposit", text)}
        />
        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
સહી કરનાર વ્યક્તિની વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
 placeholder="મકાનમાલિકની સહીનું નામ"
          onChangeText={(text) => handleChange("landlordSignature", text)}
        />
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="ભાડુઆતની સહીનું નામ"
          onChangeText={(text) => handleChange("tenantSignature", text)}
        />  
  
        <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
સાક્ષીની વિગતો
        </Text>
        <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="સાક્ષીનું નામ"
          onChangeText={(text) => handleChange("witnessName", text)}
        />
{/*         <TextInput
          className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
          placeholder="સાક્ષીનું સરનામું"
          onChangeText={(text) => handleChange("witnessAddress", text)}
        /> */}
      </ScrollView>
    </View>
  );
}

