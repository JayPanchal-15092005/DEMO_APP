import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ClientData = [
  {
    id: "1",
    name: "Jay Panchal",
    contact: "jayapp@gmail.com",
    phone: "6666666666",
    location: "Ahmedabad, Gujarat",
    services: [
      { name: "Will", count: 1 },
      { name: "Rent Agreement", count: 1 },
    ],
    paymentStatus: "no payment",
    amount: "₹6,600",
  },
  {
    id: "2",
    name: "Ketan Panchal",
    contact: "try23@gmail.com",
    phone: "8347039945",
    location: "Ahmedabad, Gujarat",
    services: [
      { name: "Will", count: 1 },
      { name: "Marriage Certificate", count: 1 },
    ],
    paymentStatus: "no payment",
    amount: "₹5,588",
  },
];

// --- FIX: Form component moved outside of the App component ---
// This prevents it from being re-created on every state change in the parent.
interface AddClientFormProps {
  visible: boolean;
  onClose: () => void;
  clientData: {
    id: string;
    fullName: string;
    email: string;
    mobile: string;
    fullAddress: string;
    referenceName: string;
    referenceMobile: string;
    pincode: string;
    state: string;
    city: string;
    village: string;
    postOffice: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSubmit: () => void;
}

const AddClientForm: React.FC<AddClientFormProps> = React.memo(
  ({ visible, onClose, clientData, onInputChange, onSubmit }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center bg-black/50"
      >
        <View className="bg-white rounded-lg shadow-xl w-11/12 max-h-[85%]">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <View>
              <Text className="text-xl font-bold text-gray-800">
                Create a new client
              </Text>
              <Text className="text-sm text-gray-500">
                with selected services
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 font-bold text-2xl">×</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="mb-4 bg-gray-100 p-2 rounded-md">
              <Text className="text-gray-600 font-semibold">
                Client ID: {clientData.id}
              </Text>
            </View>

            {/* Form Fields */}
            <Text className="text-gray-700 font-semibold mb-1">
              Full Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter full name"
              value={clientData.fullName}
              onChangeText={(text) => onInputChange("fullName", text)}
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Email <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter email"
              value={clientData.email}
              onChangeText={(text) => onInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Mobile <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter 10-digit mobile number"
              value={clientData.mobile}
              onChangeText={(text) => onInputChange("mobile", text)}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Full Address
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 h-20 mb-4"
              placeholder="Enter full address"
              value={clientData.fullAddress}
              onChangeText={(text) => onInputChange("fullAddress", text)}
              multiline
              textAlignVertical="top"
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Reference Name
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter reference name"
              value={clientData.referenceName}
              onChangeText={(text) => onInputChange("referenceName", text)}
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Reference Mobile
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter 10-digit mobile number"
              value={clientData.referenceMobile}
              onChangeText={(text) => onInputChange("referenceMobile", text)}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <Text className="text-gray-700 font-semibold mb-1">Pincode</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter 6-digit pincode"
              value={clientData.pincode}
              onChangeText={(text) => onInputChange("pincode", text)}
              keyboardType="numeric"
              maxLength={6}
            />

            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-1">State</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-500 mb-4"
                  placeholder=""
                  editable={true}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 font-semibold mb-1">City</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-500 mb-4"
                  placeholder=""
                  editable={true}
                />
                {/* // value={clientData.city} */}
              </View>
            </View>

            <Text className="text-gray-700 font-semibold mb-1">Village</Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter village name"
              value={clientData.village}
              onChangeText={(text) => onInputChange("village", text)}
            />

            <Text className="text-gray-700 font-semibold mb-1">
              Post Office
            </Text>
            <TextInput
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-500 mb-4"
              placeholder="Enter pincode first"
              editable={true}
            />

            <View className="flex-row justify-end space-x-3 mt-2">
              <TouchableOpacity
                onPress={onClose}
                className="bg-gray-200 px-6 py-3 rounded-lg"
              >
                <Text className="text-gray-800 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSubmit}
                className="bg-blue-600 px-6 py-3 rounded-lg"
              >
                <Text className="text-white font-semibold">Add Client</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
);

interface ManagePricesFormProps {
  visible: boolean;
  onClose: () => void;
}

const ManagePricesForm: React.FC<ManagePricesFormProps> = React.memo(
  ({ visible, onClose }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 p-4">
        <View className="w-full max-w-lg bg-white p-6 rounded-lg shadow-xl">
          <Text className="text-xl font-bold mb-4">Manage Service Prices</Text>
          <Text>
            Manage prices form UI will be built here based on your future
            instructions.
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 mt-4 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
);

const App = () => {
  const [clients, setClients] = useState(ClientData);
  const [totalClients, setTotalClients] = useState(0);
  const [thisMonthClients, setThisMonthClients] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [showManagePricesForm, setShowManagePricesForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newClient, setNewClient] = useState({
    id: "----------",
    fullName: "",
    email: "",
    mobile: "",
    fullAddress: "",
    referenceName: "",
    referenceMobile: "",
    pincode: "",
    state: "",
    city: "",
    village: "",
    postOffice: "",
  });

  useEffect(() => {
    setTotalClients(clients.length);
    setThisMonthClients(5); // Placeholder
    const servicesCount = clients.reduce(
      (acc, client) =>
        acc + client.services.reduce((sum, service) => sum + service.count, 0),
      0
    );
    setTotalServices(servicesCount);
  }, [clients]);

  const handleAddClient = () => setShowAddClientForm(true);
  const handleManagePrices = () => setShowManagePricesForm(true);
  const handleCloseClientForm = () => setShowAddClientForm(false);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClient = (id: any) =>
    console.log(`Editing client with ID: ${id}`);
  const handleDeleteClient = (id: any) => {
    setClients(clients.filter((client) => client.id !== id));
    console.log(`Deleting client with ID: ${id}`);
  };
  const handleViewClient = (id: any) =>
    console.log(`Viewing client with ID: ${id}`);

  const handleInputChange = (field: any, value: any) => {
    setNewClient({ ...newClient, [field]: value });
  };

  const handleFormSubmit = () => {
    if (!newClient.fullName || !newClient.email || !newClient.mobile) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name: newClient.fullName,
      contact: newClient.email,
      phone: newClient.mobile,
      location:
        newClient.fullAddress || `${newClient.city}, ${newClient.state}`,
      services: [],
      paymentStatus: "no payment",
      amount: "₹0",
    };

    setClients((prevClients) => [newEntry, ...prevClients]);

    setNewClient({
      id: "----------",
      fullName: "",
      email: "",
      mobile: "",
      fullAddress: "",
      referenceName: "",
      referenceMobile: "",
      pincode: "",
      state: "",
      city: "",
      village: "",
      postOffice: "",
    });
    setShowAddClientForm(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4" keyboardShouldPersistTaps="handled">
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-800">Clients</Text>
            <Text className="text-gray-500 text-base mt-1">
              Manage your clients
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-2 w-full mb-6">
          <TouchableOpacity
            onPress={handleAddClient}
            className="flex-row flex-1 items-center justify-center bg-blue-600 px-5 py-3 rounded-lg shadow-md"
          >
            {/* <Text className="text-white font-bold text-lg mr-2">+</Text> */}
            <Text className="text-white font-semibold justify-center">
              Add Client
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleManagePrices} className="flex-row items-center bg-white border border-gray-300 px-4 py-3 rounded-lg shadow-md">
            <Text className="text-gray-700 font-semibold mr-2">₹</Text>
            <Text className="text-gray-700 font-semibold">Manage</Text>
          </TouchableOpacity> */}
        </View>

        <View className="space-y-4 mb-6">
          <View className="bg-blue-100 p-5 rounded-xl flex-row items-center justify-between shadow">
            <View>
              <Text className="text-sm text-gray-700">Total Clients</Text>
              <Text className="text-4xl font-bold text-blue-800 my-1">
                {totalClients}
              </Text>
            </View>
            <Text className="text-5xl opacity-50">👤</Text>
          </View>
          <View className="bg-purple-100 p-5 rounded-xl flex-row items-center justify-between shadow">
            <View>
              <Text className="text-sm text-gray-700">This Month</Text>
              <Text className="text-4xl font-bold text-purple-800 my-1">
                {thisMonthClients}
              </Text>
            </View>
            <Text className="text-5xl opacity-50">🗓️</Text>
          </View>
          <View className="bg-orange-100 p-5 rounded-xl flex-row items-center justify-between shadow">
            <View>
              <Text className="text-sm text-gray-700">Total Services</Text>
              <Text className="text-4xl font-bold text-orange-800 my-1">
                {totalServices}
              </Text>
            </View>
            <Text className="text-5xl opacity-50">📄</Text>
          </View>
        </View>

        <View className="bg-white p-4 rounded-lg shadow-md">
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-1 w-full mb-4">
            <Text className="text-gray-500 mr-2">🔍</Text>
            <TextInput
              placeholder=""
              className="flex-1 h-10 text-gray-700"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="min-w-[800px]">
              <View className="flex-row bg-gray-50 rounded-lg p-3 border-b-2 border-gray-200">
                <Text className="w-48 font-semibold text-gray-600">CLIENT</Text>
                <Text className="w-48 font-semibold text-gray-600">
                  CONTACT
                </Text>
                <Text className="w-40 font-semibold text-gray-600">
                  LOCATION
                </Text>
                <Text className="w-48 font-semibold text-gray-600">
                  SERVICES
                </Text>
                <Text className="w-32 font-semibold text-gray-600">
                  PAYMENT
                </Text>
                <Text className="w-24 font-semibold text-gray-600 text-right">
                  ACTIONS
                </Text>
              </View>

              {filteredClients.map((client) => (
                <View
                  key={client.id}
                  className="flex-row items-center border-b border-gray-200 py-3"
                >
                  <View className="flex-row items-center w-48 pr-2">
                    <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center mr-3">
                      <Text className="text-white font-bold">
                        {client.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-semibold" numberOfLines={1}>
                        {client.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {client.phone}
                      </Text>
                    </View>
                  </View>
                  <Text className="w-48 text-gray-700 pr-2" numberOfLines={1}>
                    {client.contact}
                  </Text>
                  <Text className="w-40 text-gray-700 pr-2" numberOfLines={1}>
                    {client.location}
                  </Text>
                  <View className="flex-row flex-wrap w-48 items-center">
                    {client.services.length > 0 ? (
                      client.services.map((service, index) => (
                        <View
                          key={index}
                          className="bg-gray-200 rounded-full px-3 py-1 mr-2 mb-1"
                        >
                          <Text className="text-gray-700 text-xs">
                            {service.name} ({service.count})
                          </Text>
                        </View>
                      ))
                    ) : (
                      <Text className="text-gray-400 text-xs">No services</Text>
                    )}
                  </View>
                  <View className="w-32">
                    <Text className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full text-center capitalize">
                      {client.paymentStatus}
                    </Text>
                    <Text className="text-sm font-semibold text-gray-700 mt-1">
                      {client.amount}
                    </Text>
                  </View>
                  <View className="flex-row justify-end items-center w-24">
                    <TouchableOpacity
                      onPress={() => handleViewClient(client.id)}
                      className="p-2"
                    >
                      <Text>👁️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleEditClient(client.id)}
                      className="p-2"
                    >
                      <Text>✍️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteClient(client.id)}
                      className="p-2"
                    >
                      <Text>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Pass state and functions down to the memoized form component */}
      <AddClientForm
        visible={showAddClientForm}
        onClose={handleCloseClientForm}
        clientData={newClient}
        onInputChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />
      <ManagePricesForm
        visible={showManagePricesForm}
        onClose={() => setShowManagePricesForm(false)}
      />
    </SafeAreaView>
  );
};

export default App;
