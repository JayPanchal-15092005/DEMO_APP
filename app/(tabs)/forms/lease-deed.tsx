import { useIsFocused } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import { useNavigation, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomRule {
  id: string;
  title: string;
  description: string;
}

interface RentPeriod {
  start: string;
  end: string;
  rent: string;
  months: string;
  total: string;
  note: string;
}

export default function LeaseDeedForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const [formData, setFormData] = useState({
    // Basic Details
    agreementLocation: "",
    agreementDate: new Date().toLocaleDateString("en-IN"),
    startDate: "",
    endDate: "",
    totalYears: "8",

    // Lessor Details
    lessorName: "",
    lessorFatherName: "",
    lessorAge: "",
    lessorOccupation: "",
    lessorReligion: "",
    lessorAddress1: "",
    lessorAddress2: "",
    lessorPincode: "",

    // Lessee Details
    lesseeName: "",
    lesseeFatherName: "",
    lesseeAge: "",
    lesseeOccupation: "",
    lesseeReligion: "",
    lesseeAddress1: "",
    lesseeAddress2: "",
    lesseePincode: "",

    // Property Details
    propertyDescription: "",
    boundaryEast: "",
    boundaryWest: "",
    boundaryNorth: "",
    boundarySouth: "",

    // Rent Details
    monthlyRent: "",
    monthlyRentWords: "",
    rentFreeMonths: "",
    lockInYears: "",
    rentIncrementYears: "",
    rentIncrementPercent: "",

    // Financial Summary (Calculated fields initialized)
    totalScheduledRent: "0",
    averageMonthlyRent: "0",
    securityDeposit: "",
    securityDepositWords: "",
    deposit1Amount: "",
    deposit1Date: "",
    deposit2Amount: "",
    municipalTax: "0",
    otherCharges: "0",
    totalPayable: "0",

    // Other Details
    businessType: "",
    lessorSignature: "",
    lesseeSignature: "",
    witness1Name: "",
    witness1Address: "", // <-- ADDED
    witness2Name: "",
    witness2Address: "", // <-- ADDED
    documentWriterName: "", // <-- ADDED
    signatureDate: "", // <-- ADDED
  });

  // Rent Periods State
  const [rentPeriods, setRentPeriods] = useState<RentPeriod[]>([
    { start: "", end: "", rent: "", months: "", total: "0", note: "" },
  ]);

  // Custom Rules State
  const [customRules, setCustomRules] = useState<CustomRule[]>([]);
  const [newRuleTitle, setNewRuleTitle] = useState("");
  const [newRuleDescription, setNewRuleDescription] = useState("");

  const handleChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // --- START: New Dynamic Period Functions ---

  // Handle changes in a specific period's input
  const handlePeriodChange = (
    index: number,
    field: keyof RentPeriod,
    value: string
  ) => {
    const newPeriods = [...rentPeriods];
    newPeriods[index][field] = value;

    // Auto-calculate total for the period
    const rent = parseFloat(newPeriods[index].rent) || 0;
    const months = parseInt(newPeriods[index].months) || 0;
    newPeriods[index].total = (rent * months).toString();

    setRentPeriods(newPeriods);
  };

  // Add a new empty period
  const addPeriod = () => {
    setRentPeriods([
      ...rentPeriods,
      { start: "", end: "", rent: "", months: "", total: "0", note: "" },
    ]);
  };

  // Remove a period by its index
  const removePeriod = (index: number) => {
    if (rentPeriods.length <= 1) {
      Alert.alert("ભૂલ", "ઓછામાં ઓછો એક સમયગાળો હોવો જરૂરી છે.");
      return;
    }
    const newPeriods = [...rentPeriods];
    newPeriods.splice(index, 1);
    setRentPeriods(newPeriods);
  };

  // --- END: New Dynamic Period Functions ---

  // --- START: New Calculation useEffect ---
  // This effect recalculates the financial summary whenever periods or other costs change
  useEffect(() => {
    let totalRent = 0;
    let totalMonths = 0;

    rentPeriods.forEach((p) => {
      totalRent += parseFloat(p.total) || 0;
      totalMonths += parseInt(p.months) || 0;
    });

    const avgRent = totalMonths > 0 ? totalRent / totalMonths : 0;
    const deposit = parseFloat(formData.securityDeposit) || 0;
    const tax = parseFloat(formData.municipalTax) || 0;
    const others = parseFloat(formData.otherCharges) || 0;
    const totalPayable = totalRent + deposit + tax + others;

    setFormData((prev) => ({
      ...prev,
      totalScheduledRent: totalRent.toString(),
      averageMonthlyRent: avgRent.toFixed(2), // Format to 2 decimal places
      totalPayable: totalPayable.toString(),
    }));
  }, [
    rentPeriods,
    formData.securityDeposit,
    formData.municipalTax,
    formData.otherCharges,
  ]);
  // --- END: New Calculation useEffect ---

  // Add Custom Rule
  const addCustomRule = () => {
    if (!newRuleTitle.trim()) {
      Alert.alert("ભૂલ", "કૃપા કરીને શરતનું શીર્ષક દાખલ કરો");
      return;
    }

    const newRule: CustomRule = {
      id: Date.now().toString(),
      title: newRuleTitle,
      description: newRuleDescription,
    };

    setCustomRules([...customRules, newRule]);
    setNewRuleTitle("");
    setNewRuleDescription("");
    Alert.alert("સફળતા", "નવી શરત ઉમેરાઈ ગઈ");
  };

  // Delete Custom Rule
  const deleteCustomRule = (id: string) => {
    Alert.alert(
      "શરત કાઢી નાખો",
      "શું તમે ખરેખર આ શરત કાઢી નાખવા માંગો છો?",
      [
        { text: "રદ કરો", style: "cancel" },
        {
          text: "કાઢી નાખો",
          style: "destructive",
          onPress: () => {
            setCustomRules(customRules.filter((rule) => rule.id !== id));
          },
        },
      ]
    );
  };

  // Generate Custom Rules HTML
  const generateCustomRulesHtml = () => {
    if (customRules.length === 0) return "";

    let rulesHtml = "";
    customRules.forEach((rule, index) => {
      // rulesHtml += `
      // <li class="custom-rule">
      //   <strong>${index + 21}. ${rule.title}</strong><br>
      //   ${rule.description}
      // </li>`;
      rulesHtml += `<strong>${21 + index}. ${rule.title}</strong><br>`;
    });

    return rulesHtml;
  };

  const generateHtml = useCallback(async () => {
    try {
      const asset = Asset.fromModule(
        require("../../templates/lease-deed.html")
      );
      await asset.downloadAsync();
      if (!asset.localUri) {
        throw new Error("Asset localUri is null. Unable to read the file.");
      }
      const htmlTemplate = await FileSystem.readAsStringAsync(asset.localUri);

      let finalHtml = htmlTemplate;

      const lessorAddress =
        `${formData.lessorAddress1} ${formData.lessorAddress2}`.trim();
      const lesseeAddress =
        `${formData.lesseeAddress1} ${formData.lesseeAddress2}`.trim();

      const customRulesHtml = generateCustomRulesHtml();

      const enhancedFormData = {
        ...formData,
        lessorAddress: lessorAddress || formData.lessorAddress1,
        lesseeAddress: lesseeAddress || formData.lesseeAddress1,
        customRulesHtml: customRulesHtml,
      };

      Object.entries(enhancedFormData).forEach(([key, value]) => {
        const placeholder = new RegExp(`{{${key}}}`, "g");
        let processedValue = value as string;

        if (key === "propertyDescription" && !value) {
          processedValue = "&nbsp;";
        } else if (key === "customRulesHtml") {
          processedValue = value as string;
        } else if (!value) {
          processedValue = "....................";
        }

        finalHtml = finalHtml.replace(placeholder, processedValue);
      });

      // --- UPDATED: Dynamic Rent Period HTML Generation ---
      const rentPeriodsHtml = rentPeriods
        .map(
          (p) => `
        <tr>
          <td>${p.start || "..."}</td>
          <td>${p.end || "..."}</td>
          <td>${p.rent || "0"}</td>
          <td>${p.months || "0"}</td>
          <td>${p.total || "0"}</td>
          <td>${p.note || ""}</td>
        </tr>`
        )
        .join("");
      finalHtml = finalHtml.replace("{{rentPeriodsHtml}}", rentPeriodsHtml);
      // --- END: Update ---

      return finalHtml;
    } catch (error) {
      console.error("Error generating HTML:", error);
      throw error;
    }
  }, [formData, customRules, rentPeriods]); // Added rentPeriods dependency

  const onSavePress = useCallback(async () => {
    try {
      const finalHtml = await generateHtml();

      const { uri } = await Print.printToFileAsync({
        html: finalHtml,
        margins: { top: 40, bottom: 40, left: 40, right: 40 },
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: "Save or Share your Lease Deed",
        });
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
        pathname: "/(preview)/[id]",
        params: { id: "unique-id", html: finalHtml },
      });
    } catch (e) {
      console.error("Error loading or processing template:", e);
      Alert.alert("Error", "Could not load template. Please try again.");
    }
  }, [generateHtml, router]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text className="text-lg font-bold text-gray-800">લીઝ ડીડ ફોર્મ</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
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
    <View style={{ flex: 1, paddingTop: isFocused ? insets.top : 0 }}>
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
          {/* ... (Keep all fields from "મુખ્ય વિગતો" to "ભાડા વિગતો" as they are) ... */}

          {/* મુખ્ય વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-2 text-gray-800">
            મુખ્ય વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સ્થળ / શહેર"
            placeholderTextColor="#888"
            value={formData.agreementLocation}
            onChangeText={(text) => handleChange("agreementLocation", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="દસ્તાવેજ તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.agreementDate}
            onChangeText={(text) => handleChange("agreementDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="લીઝ શરૂ થવાની તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.startDate}
            onChangeText={(text) => handleChange("startDate", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="લીઝ સમાપ્તિ તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.endDate}
            onChangeText={(text) => handleChange("endDate", text)}
          />

          {/* લીઝ આપનાર વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            લીઝ આપનાર (LESSOR) વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            value={formData.lessorName}
            onChangeText={(text) => handleChange("lessorName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર (Age)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.lessorAge}
            onChangeText={(text) => handleChange("lessorAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ધંધો (Occupation)"
            placeholderTextColor="#888"
            value={formData.lessorOccupation}
            onChangeText={(text) => handleChange("lessorOccupation", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ધર્મ (Religion)"
            placeholderTextColor="#888"
            value={formData.lessorReligion}
            onChangeText={(text) => handleChange("lessorReligion", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સરનામું - લાઈન 1"
            placeholderTextColor="#888"
            value={formData.lessorAddress1}
            onChangeText={(text) => handleChange("lessorAddress1", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સરનામું - લાઈન 2"
            placeholderTextColor="#888"
            value={formData.lessorAddress2}
            onChangeText={(text) => handleChange("lessorAddress2", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પીનકોડ"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={6}
            value={formData.lessorPincode}
            onChangeText={(text) => handleChange("lessorPincode", text)}
          />

          {/* લીઝ લેનાર વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            લીઝ લેનાર (LESSEE) વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="નામ"
            placeholderTextColor="#888"
            value={formData.lesseeName}
            onChangeText={(text) => handleChange("lesseeName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉંમર (Age)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.lesseeAge}
            onChangeText={(text) => handleChange("lesseeAge", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ધંધો (Occupation)"
            placeholderTextColor="#888"
            value={formData.lesseeOccupation}
            onChangeText={(text) => handleChange("lesseeOccupation", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ધર્મ (Religion)"
            placeholderTextColor="#888"
            value={formData.lesseeReligion}
            onChangeText={(text) => handleChange("lesseeReligion", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સરનામું - લાઈન 1"
            placeholderTextColor="#888"
            value={formData.lesseeAddress1}
            onChangeText={(text) => handleChange("lesseeAddress1", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સરનામું - લાઈન 2"
            placeholderTextColor="#888"
            value={formData.lesseeAddress2}
            onChangeText={(text) => handleChange("lesseeAddress2", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પીનકોડ"
            placeholderTextColor="#888"
            keyboardType="numeric"
            maxLength={6}
            value={formData.lesseePincode}
            onChangeText={(text) => handleChange("lesseePincode", text)}
          />

          {/* મિલકત વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            મિલકત વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મિલકતનું સંપૂર્ણ વર્ણન"
            placeholderTextColor="#888"
            value={formData.propertyDescription}
            onChangeText={(text) => handleChange("propertyDescription", text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text className="text-lg font-semibold mb-3 mt-2 text-gray-700">
            મિલકત ચારે ચુટણી વિગત:
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પૂર્વે (East)"
            placeholderTextColor="#888"
            value={formData.boundaryEast}
            onChangeText={(text) => handleChange("boundaryEast", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પશ્ચિમે (West)"
            placeholderTextColor="#888"
            value={formData.boundaryWest}
            onChangeText={(text) => handleChange("boundaryWest", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ઉત્તરે (North)"
            placeholderTextColor="#888"
            value={formData.boundaryNorth}
            onChangeText={(text) => handleChange("boundaryNorth", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="દક્ષિણે (South)"
            placeholderTextColor="#888"
            value={formData.boundarySouth}
            onChangeText={(text) => handleChange("boundarySouth", text)}
          />

          {/* ભાડા વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            ભાડા વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="માસિક ભાડું (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.monthlyRent}
            onChangeText={(text) => handleChange("monthlyRent", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="માસિક ભાડું શબ્દોમાં"
            placeholderTextColor="#888"
            value={formData.monthlyRentWords}
            onChangeText={(text) => handleChange("monthlyRentWords", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડા મુક્ત મહિના"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.rentFreeMonths}
            onChangeText={(text) => handleChange("rentFreeMonths", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="લોક-ઇન પિરિયડ (વર્ષ)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.lockInYears}
            onChangeText={(text) => handleChange("lockInYears", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડા વધારો દર કેટલા વર્ષે"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.rentIncrementYears}
            onChangeText={(text) => handleChange("rentIncrementYears", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ભાડા વધારો ટકાવારી (%)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.rentIncrementPercent}
            onChangeText={(text) => handleChange("rentIncrementPercent", text)}
          />

          {/* --- START: New Dynamic Rent Period UI --- */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            ભાડા ગણતરી સમયગાળો
          </Text>

          {rentPeriods.map((period, index) => (
            <View
              key={index}
              className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200"
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold text-gray-700">
                  સમયગાળો {index + 1}
                </Text>
                {index > 0 && (
                  <TouchableOpacity
                    onPress={() => removePeriod(index)}
                    className="bg-red-500 px-3 py-1 rounded-md"
                  >
                    <Text className="text-white font-bold text-xs">કાઢો</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="શરૂઆતની તારીખ"
                placeholderTextColor="#888"
                value={period.start}
                onChangeText={(text) => handlePeriodChange(index, "start", text)}
              />
              <TextInput
                className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="અંતિમ તારીખ"
                placeholderTextColor="#888"
                value={period.end}
                onChangeText={(text) => handlePeriodChange(index, "end", text)}
              />
              <TextInput
                className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="માસિક ભાડું (₹)"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={period.rent}
                onChangeText={(text) => handlePeriodChange(index, "rent", text)}
              />
              <TextInput
                className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="કુલ માસ"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={period.months}
                onChangeText={(text) =>
                  handlePeriodChange(index, "months", text)
                }
              />
              <TextInput
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="કુલ રકમ (₹)"
                placeholderTextColor="#888"
                editable={false}
                value={period.total}
              />
              <TextInput
                className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
                placeholder="નોંધ"
                placeholderTextColor="#888"
                value={period.note}
                onChangeText={(text) => handlePeriodChange(index, "note", text)}
              />
            </View>
          ))}

          <TouchableOpacity
            onPress={addPeriod}
            className="bg-green-600 p-3 rounded-lg mb-4"
          >
            <Text className="text-white text-center font-bold">
              + નવો પિરિયડ ઉમેરો
            </Text>
          </TouchableOpacity>
          {/* --- END: New Dynamic Rent Period UI --- */}

          {/* --- START: Updated Financial Summary UI --- */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            નાણાકીય સારાંશ
          </Text>

          <TextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="કુલ ભાડું (સમયસારણી અનુસાર) (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.totalScheduledRent}
            editable={false} // Calculated
          />

          <TextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સરેરાશ માસિક લીઝફી (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.averageMonthlyRent}
            editable={false} // Calculated
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સિક્યોરિટી ડિપોઝિટ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.securityDeposit}
            onChangeText={(text) => handleChange("securityDeposit", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સિક્યોરિટી ડિપોઝિટ શબ્દોમાં"
            placeholderTextColor="#888"
            value={formData.securityDepositWords}
            onChangeText={(text) => handleChange("securityDepositWords", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પ્રથમ હપ્તાની રકમ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.deposit1Amount}
            onChangeText={(text) => handleChange("deposit1Amount", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="પ્રથમ હપ્તાની તારીખ"
            placeholderTextColor="#888"
            value={formData.deposit1Date}
            onChangeText={(text) => handleChange("deposit1Date", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="બીજા હપ્તાની રકમ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.deposit2Amount}
            onChangeText={(text) => handleChange("deposit2Amount", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="મહાનગરપાલિકા ટેક્સ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.municipalTax}
            onChangeText={(text) => handleChange("municipalTax", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="અન્ય ચાર્જ / ખર્ચ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.otherCharges}
            onChangeText={(text) => handleChange("otherCharges", text)}
          />

          <TextInput
            className="bg-gray-100 border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="કુલ ચુકવવાની રકમ (₹)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={formData.totalPayable}
            editable={false} // Calculated
          />
          {/* --- END: Updated Financial Summary UI --- */}

          {/* અન્ય વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            અન્ય વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="ધંધાનો પ્રકાર (જેમ કે: હોટેલ, ઓફિસ)"
            placeholderTextColor="#888"
            value={formData.businessType}
            onChangeText={(text) => handleChange("businessType", text)}
          />

          {/* સહી વિગતો */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            સહી કરનાર વ્યક્તિ વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="લીઝ આપનારની સહી નામ"
            placeholderTextColor="#888"
            value={formData.lessorSignature}
            onChangeText={(text) => handleChange("lessorSignature", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="લીઝ લેનારની સહી નામ"
            placeholderTextColor="#888"
            value={formData.lesseeSignature}
            onChangeText={(text) => handleChange("lesseeSignature", text)}
          />

          {/* --- START: Updated Witness Section --- */}
          <Text className="text-xl font-bold mb-4 mt-4 text-gray-800">
            સાક્ષી અને સહીની વિગતો
          </Text>

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષી ૧ નું નામ"
            placeholderTextColor="#888"
            value={formData.witness1Name}
            onChangeText={(text) => handleChange("witness1Name", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષી ૧ નું સરનામું"
            placeholderTextColor="#888"
            value={formData.witness1Address}
            onChangeText={(text) => handleChange("witness1Address", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષી ૨ નું નામ"
            placeholderTextColor="#888"
            value={formData.witness2Name}
            onChangeText={(text) => handleChange("witness2Name", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સાક્ષી ૨ નું સરનામું"
            placeholderTextColor="#888"
            value={formData.witness2Address}
            onChangeText={(text) => handleChange("witness2Address", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="દસ્તાવેજ લખી આપનાર"
            placeholderTextColor="#888"
            value={formData.documentWriterName}
            onChangeText={(text) => handleChange("documentWriterName", text)}
          />

          <TextInput
            className="bg-white border border-gray-300 p-3 rounded-lg mb-4 text-base text-black"
            placeholder="સહી તારીખ (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={formData.signatureDate}
            onChangeText={(text) => handleChange("signatureDate", text)}
          />
          {/* --- END: Updated Witness Section --- */}


          {/* ભાડા પટ્ટાની શરતો - CUSTOM RULES SECTION */}
          <View className="bg-blue-50 p-4 rounded-lg mt-6 mb-4 border-2 border-blue-200">
            <Text className="text-xl font-bold mb-3 text-blue-900">
              ભાડા પટ્ટાની શરતો (નવી શરત ઉમેરો)
            </Text>

            <Text className="text-sm text-gray-600 mb-3">
              કુલ {customRules.length} શરતો ઉમેરાયેલ છે
            </Text>

            <TextInput
              className="bg-white border border-blue-300 p-3 rounded-lg mb-3 text-base text-black"
              placeholder="શરતનું શીર્ષક (જેમ કે: રિન્યુઅલ ઓપ્શન)"
              placeholderTextColor="#888"
              value={newRuleTitle}
              onChangeText={setNewRuleTitle}
            />

            <TextInput
              className="bg-white border border-blue-300 p-3 rounded-lg mb-3 text-base text-black"
              placeholder="શરતનું વર્ણન"
              placeholderTextColor="#888"
              value={newRuleDescription}
              onChangeText={setNewRuleDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity
              onPress={addCustomRule}
              className="bg-blue-600 p-3 rounded-lg"
            >
              <Text className="text-white text-center font-bold">
                + નવી શરત ઉમેરો
              </Text>
            </TouchableOpacity>
          </View>

          {/* Display Custom Rules */}
          {customRules.length > 0 && (
            <View className="mb-4">
              <Text className="text-lg font-bold mb-3 text-gray-800">
                ઉમેરાયેલ શરતો:
              </Text>
              {customRules.map((rule, index) => (
                <View
                  key={rule.id}
                  className="bg-gray-50 p-4 rounded-lg mb-3 border border-gray-200"
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-base font-bold text-gray-800 flex-1">
                      {index + 21}. {rule.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => deleteCustomRule(rule.id)}
                      className="bg-red-500 px-3 py-1 rounded-md ml-2"
                    >
                      <Text className="text-white font-bold text-xs">કાઢો</Text>
                    </TouchableOpacity>
                  </View>
                  <Text className="text-sm text-gray-700">
                    {rule.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}