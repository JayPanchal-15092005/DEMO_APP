// import { useIsFocused } from "@react-navigation/native";
// import { Asset } from "expo-asset";
// import * as FileSystem from "expo-file-system/legacy";
// import * as Print from "expo-print";
// import { useNavigation, useRouter } from "expo-router";
// import * as Sharing from 'expo-sharing'; // <-- 1. Import Sharing
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import {
//   useSafeAreaInsets
// } from "react-native-safe-area-context";

// export default function RentAgreementForm() {
//   const router = useRouter();
//   const navigation = useNavigation();
//   const insets = useSafeAreaInsets();
//   const isFocused = useIsFocused();


//   // FIX 1: Add a state to know when the header is ready
//   const [isHeaderReady, setIsHeaderReady] = useState(false);

//   const [formData, setFormData] = useState({
//     landlordName: "",
//     landlordFatherName: "",
//     landlordAge: "",
//     landlordAddress: "",
//     tenantName: "",
//     tenantFatherName: "",
//     tenantAge: "",
//     tenantAddress: "",
//     propertyDescription: "",
//     agreementDate: new Date().toLocaleDateString("en-IN"),
//     months: "",
//     startDate: "",
//     endDate: "",
//     rentAmount: "",
//     securityDeposit: "",
//     landlordSignature: "",
//     tenantSignature: "",
//     witnessName: "",
//     witnessAddress: "",
//     agreementLocation: "",
//   });

//   const handleChange = (field: any, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const generateHtml = async () => {
//   const asset = Asset.fromModule(require("../../templates/rent_agreement.html"));
//   await asset.downloadAsync();
//   if (!asset.localUri) {
//     throw new Error("Asset localUri is null. Unable to read the file.");
//   }
//   const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri);

//   let finalHtml = htmlTemplate;
//   for (const key in formData) {
//     const placeholder = new RegExp(`{{${key}}}`, "g");

//     // --- FIX: Use a cleaner placeholder ---
//     let value = formData[key as keyof typeof formData];
//     if (key === 'propertyDescription' && !value) {
//       // For the property box, an empty space looks best
//       value = '&nbsp;'; 
//     } else if (!value) {
//       // For all other fields, use dots
//       value = '....................';
//     }
    
//     finalHtml = finalHtml.replace(placeholder, value);
//   }
//   return finalHtml;
// }

//   // FIX 2: New function to properly save and share the PDF
//   const onSavePress = async () => {
//     try {
//       const finalHtml = await generateHtml();

//       // Create a PDF file from the HTML
//       const { uri } = await Print.printToFileAsync({
//         html: finalHtml,
//         margins: { top: 40, bottom: 40, left: 40, right: 40 },
//       });

//       // Share the created PDF file
//       if (await Sharing.isAvailableAsync()) {
//         await Sharing.shareAsync(uri, { dialogTitle: 'Save or Share your Rent Agreement' });
//       } else {
//         Alert.alert("Sharing is not available on this device.");
//       }

//     } catch (e) {
//       console.error("Error saving/sharing document:", e);
//       Alert.alert("Error", "Could not save the document. Please try again.");
//     }
//   };


//   const onPreviewPress = async () => {
//     try {
//       const finalHtml = await generateHtml();
//       router.push({
//         pathname: "/(tabs)/preview",
//         params: { html: finalHtml },
//       });
//     } catch (e) {
//       console.error("Error loading or processing template:", e);
//       Alert.alert("Error", "Could not load template. Please try again.");
//     }
//   };

//   useEffect(() => {
//   navigation.setOptions({
//     // FIX 1: Remove the conflicting centered title
//     headerTitle: '', 
    
//     // FIX 2: Add the title to the left side of the header
//     headerLeft: () => (
//       <Text className="text-lg font-bold text-gray-800">
//         ભાડા કરાર ફોર્મ
//       </Text>
//     ),
    
//     // FIX 3: Your buttons now have plenty of space on the right
//     headerRight: () => (
//       <View style={{ flexDirection: "row", alignItems: "center" }}>
//         <TouchableOpacity
//           onPress={onSavePress}
//           className="bg-green-600 px-4 py-2 rounded-md mr-2"
//         >
//           <Text className="text-white font-bold">સેવ / શેર</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={onPreviewPress}
//           className="bg-blue-600 px-4 py-2 rounded-md"
//         >
//           <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
//         </TouchableOpacity>
//       </View>
//     ),
//   });

//    // FIX 2: Signal that the header is now ready
//     setIsHeaderReady(true);

// }, [navigation, formData, onSavePress, onPreviewPress]);  // onSavePress, onPreviewPress are not in the this array if the error come then remove this two.

//  if (!isHeaderReady) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

// //   useEffect(() => {
// //   const timer = setTimeout(() => setIsHeaderReady(true), 100);
// //   return () => clearTimeout(timer);
// // }, []); // Comments this if the Error comes


//   return (
//     <View style={{ flex: 1, paddingTop: isFocused ? insets.top : 0}}>
//       <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       keyboardVerticalOffset={100} // adjust if header overlaps
//       >
//            {" "}
//       <ScrollView
//         contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//        contentInsetAdjustmentBehavior="automatic"
//         className="p-5"
//       >
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           કરારની મુખ્ય વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="શહેર"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("agreementLocation", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="કરારની તારીખ (DD/MM/YYYY)"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("agreementDate", text)}
//         />
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           મકાનમાલિકની વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("landlordName", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="પિતાનું નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("landlordFatherName", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="ઉંમર"
//           placeholderTextColor="#888"
//           keyboardType="numeric"
//           onChangeText={(text) => handleChange("landlordAge", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="રહેવાસી (સરનામું)"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("landlordAddress", text)}
//         />
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           ભાડુઆતની વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("tenantName", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="પિતાનું નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("tenantFatherName", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="ઉંમર"
//           placeholderTextColor="#888"
//           keyboardType="numeric"
//           onChangeText={(text) => handleChange("tenantAge", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="રહેવાસી (સરનામું)"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("tenantAddress", text)}
//         />
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           મિલકત અને ભાડાની વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="મિલકતનું સંપૂર્ણ વર્ણન"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("propertyDescription", text)}
//           multiline
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="ભાડાનો સમયગાળો (મહિનામાં)"
//           placeholderTextColor="#888"
//           keyboardType="numeric"
//           onChangeText={(text) => handleChange("months", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="શરૂઆતની તારીખ (DD/MM/YYYY)"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("startDate", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="અંતની તારીખ (DD/MM/YYYY)"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("endDate", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="માસિક ભાડું (₹)"
//           placeholderTextColor="#888"
//           keyboardType="numeric"
//           onChangeText={(text) => handleChange("rentAmount", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="સિક્યોરિટી ડિપોઝીટ (₹)"
//           placeholderTextColor="#888"
//           keyboardType="numeric"
//           onChangeText={(text) => handleChange("securityDeposit", text)}
//         />
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           સહી કરનાર વ્યક્તિની વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="મકાનમાલિકની સહીનું નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("landlordSignature", text)}
//         />
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="ભાડુઆતની સહીનું નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("tenantSignature", text)}
//         />
//                {" "}
//         <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
//           સાક્ષીની વિગતો        {" "}
//         </Text>
//                {" "}
//         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
//           placeholder="સાક્ષીનું નામ"
//           placeholderTextColor="#888"
//           onChangeText={(text) => handleChange("witnessName", text)}
//         />
//         {/*         <TextInput
//           className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base"
//           placeholder="સાક્ષીનું સરનામું"
//           onChangeText={(text) => handleChange("witnessAddress", text)}
//         /> */}
//              {" "}
//       </ScrollView>
//       </KeyboardAvoidingView>
//          {" "}
//     </View>
//   );
// }

import { useIsFocused } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import { useNavigation, useRouter } from "expo-router";
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from "react";
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

  // Remove isHeaderReady state - not needed anymore
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

  const handleChange = (field: any, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateHtml = async () => {
    const asset = Asset.fromModule(require("../../templates/rent_agreement.html"));
    await asset.downloadAsync();
    if (!asset.localUri) {
      throw new Error("Asset localUri is null. Unable to read the file.");
    }
    const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri);

    let finalHtml = htmlTemplate;
    for (const key in formData) {
      const placeholder = new RegExp(`{{${key}}}`, "g");

      let value = formData[key as keyof typeof formData];
      if (key === 'propertyDescription' && !value) {
        value = '&nbsp;';
      } else if (!value) {
        value = '....................';
      }

      finalHtml = finalHtml.replace(placeholder, value);
    }
    return finalHtml;
  }

  const onSavePress = async () => {
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
  };

  const onPreviewPress = async () => {
    try {
      const finalHtml = await generateHtml();
      router.push({
        pathname: "/(tabs)/preview",
        params: { html: finalHtml },
      });
    } catch (e) {
      console.error("Error loading or processing template:", e);
      Alert.alert("Error", "Could not load template. Please try again.");
    }
  };

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
        <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={onSavePress}
            className="bg-green-600 px-5 py-2 rounded-md mr-5"
          >
            <Text className="text-white font-bold">સેવ / શેર</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPreviewPress}
            className="bg-blue-600 px-10 py-2 rounded-md"
          >
            <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]); // Remove formData dependency to avoid re-renders

  // Remove the loading state check - not needed anymore

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
            onChangeText={(text) => handleChange("agreementLocation", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="કરારની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("agreementDate", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            મકાનમાલિકની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("landlordName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પિતાનું નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("landlordFatherName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("landlordAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="રહેવાસી (સરનામું)"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("landlordAddress", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            ભાડુઆતની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("tenantName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પિતાનું નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("tenantFatherName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("tenantAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="રહેવાસી (સરનામું)"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("tenantAddress", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            મિલકત અને ભાડાની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મિલકતનું સંપૂર્ણ વર્ણન"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("propertyDescription", text)}
            multiline
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડાનો સમયગાળો (મહિનામાં)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("months", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="શરૂઆતની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("startDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="અંતની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("endDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="માસિક ભાડું (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("rentAmount", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સિક્યોરિટી ડિપોઝીટ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            onChangeText={(text) => handleChange("securityDeposit", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            સહી કરનાર વ્યક્તિની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મકાનમાલિકની સહીનું નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("landlordSignature", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડુઆતની સહીનું નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("tenantSignature", text)}
          />

          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            સાક્ષીની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષીનું નામ"
            placeholderTextColor="#888"
            onChangeText={(text) => handleChange("witnessName", text)}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}