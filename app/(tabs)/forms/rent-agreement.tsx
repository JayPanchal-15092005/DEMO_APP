import { useIsFocused } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import { useNavigation, useRouter } from "expo-router";
import * as Sharing from 'expo-sharing';
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  useSafeAreaInsets
} from "react-native-safe-area-context";

export default function RentAgreementForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

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
    agreementLocation: "",
  });

  const handleChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const generateHtml = useCallback(async () => {
    try {
        const asset = Asset.fromModule(require("../../templates/rent_agreement.html"));
      await asset.downloadAsync();
      if (!asset.localUri) {
        throw new Error("Asset localUri is null. Unable to read the file.");
      }
      const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri);

      let finalHtml = htmlTemplate;
      
      // Process each form field
      Object.entries(formData).forEach(([key, value]) => {
        const placeholder = new RegExp(`{{${key}}}`, "g");
        let processedValue = value;
        
        if (key === 'propertyDescription' && !value) {
          processedValue = '&nbsp;';
        } else if (!value) {
          processedValue = '....................';
        }
        
        finalHtml = finalHtml.replace(placeholder, processedValue);
      });

      return finalHtml;
    } catch (error) {
      console.error("Error generating HTML:", error);
      throw error;
    }
  }, [formData]);

  const onSavePress = useCallback(async () => {
    try {
      const finalHtml = await generateHtml();

      const { uri } = await Print.printToFileAsync({
        html: finalHtml, 
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { dialogTitle: 'Save or Share your Rent Agreement' });
      } else {
        Alert.alert("Sharing is not available on this device.");
      }

    } catch (e) {
      console.error("Error saving/sharing document:", e);
      Alert.alert("Error", "Could not save the document. Please try again.");
    }
  }, [generateHtml]);

  const onPreviewPress = useCallback(async () => {
    try {
      const finalHtml = await generateHtml();
      router.push({
        // pathname: "/(tabs)/preview",
        pathname: "/[id]",
        // params: { html: finalHtml },
        params: { id: 'unique-id', html: finalHtml},
      });
    } catch (e) {
      console.error("Error loading or processing template:", e);
      Alert.alert("Error", "Could not load template. Please try again.");
    }
  }, [generateHtml, router]);

  // Set header options immediately when component mounts
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text className="text-lg font-bold text-gray-800">
          ભાડા કરાર ફોર્મ
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            // onPress={() => router.push('/(tabs)/preview/[id]')}
            onPress={onPreviewPress}
            className="bg-blue-600 px-4 py-2 rounded-md"
          >
            <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSavePress}
            className="bg-green-600 px-4 py-2 rounded-md"
          >
            <Text className="text-white font-bold">સેવ / શેર</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, onSavePress, onPreviewPress]);

  return (
    <View style={{ flex: 1, paddingTop: isFocused ? insets.top : 0}}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          contentInsetAdjustmentBehavior="automatic"
          className="p-5"
        >
          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            કરારની મુખ્ય વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="શહેર"
            placeholderTextColor="#888"
            value={formData.agreementLocation}
            onChangeText={(text) => handleChange("agreementLocation", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="કરારની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.agreementDate}
            onChangeText={(text) => handleChange("agreementDate", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            મકાનમાલિકની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            value={formData.landlordName}
            onChangeText={(text) => handleChange("landlordName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પિતાનું નામ"
            placeholderTextColor="#888"
            value={formData.landlordFatherName}
            onChangeText={(text) => handleChange("landlordFatherName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.landlordAge}
            onChangeText={(text) => handleChange("landlordAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="રહેવાસી (સરનામું)"
            placeholderTextColor="#888"
            value={formData.landlordAddress}
            onChangeText={(text) => handleChange("landlordAddress", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            ભાડુઆતની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            value={formData.tenantName}
            onChangeText={(text) => handleChange("tenantName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પિતાનું નામ"
            placeholderTextColor="#888"
            value={formData.tenantFatherName}
            onChangeText={(text) => handleChange("tenantFatherName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.tenantAge}
            onChangeText={(text) => handleChange("tenantAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="રહેવાસી (સરનામું)"
            placeholderTextColor="#888"
            value={formData.tenantAddress}
            onChangeText={(text) => handleChange("tenantAddress", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            મિલકત અને ભાડાની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મિલકતનું સંપૂર્ણ વર્ણન"
            placeholderTextColor="#888"
            value={formData.propertyDescription}
            onChangeText={(text) => handleChange("propertyDescription", text)}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડાનો સમયગાળો (મહિનામાં)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.months}
            onChangeText={(text) => handleChange("months", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="શરૂઆતની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.startDate}
            onChangeText={(text) => handleChange("startDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="અંતની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.endDate}
            onChangeText={(text) => handleChange("endDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="માસિક ભાડું (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.rentAmount}
            onChangeText={(text) => handleChange("rentAmount", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સિક્યોરિટી ડિપોઝીટ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.securityDeposit}
            onChangeText={(text) => handleChange("securityDeposit", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            સહી કરનાર વ્યક્તિની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મકાનમાલિકની સહીનું નામ"
            placeholderTextColor="#888"
            value={formData.landlordSignature}
            onChangeText={(text) => handleChange("landlordSignature", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડુઆતની સહીનું નામ"
            placeholderTextColor="#888"
            value={formData.tenantSignature}
            onChangeText={(text) => handleChange("tenantSignature", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            સાક્ષીની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષીનું નામ"
            placeholderTextColor="#888"
            value={formData.witnessName}
            onChangeText={(text) => handleChange("witnessName", text)}
          />
{/* 
          Debug section - Remove this after testing
          <View className="bg-gray-100 p-3 rounded-lg mb-4">
            <Text className="text-sm text-gray-600">Debug: Form Data Status</Text>
            <Text className="text-xs text-gray-500">
              Landlord Name: {formData.landlordName || 'Empty'}
            </Text>
            <Text className="text-xs text-gray-500">
              Tenant Name: {formData.tenantName || 'Empty'}
            </Text>
            <Text className="text-xs text-gray-500">
              Property: {formData.propertyDescription || 'Empty'}
            </Text>
          </View> */}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}