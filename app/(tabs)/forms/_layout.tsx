import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function FormsLayout() {
  const router = useRouter();

  const handlePreviewPress = () => {
    // Navigate to the rent-agreement screen to trigger its preview function.
    // The actual form data and HTML generation will be handled there.
    // This is a placeholder to ensure the button can navigate.
    // You will need to link this with your form's state.
    // A better way is to move the preview logic here.
    // For now, this navigation will suffice.
    router.push('/(tabs)/preview');
  };

  return (
    <Stack>
      <Stack.Screen
        name="rent-agreement"
        options={{
          headerTitle: "ભાડા કરાર ફોર્મ",
          headerShown: true, // This ensures the header is visible
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => {
                // This will be called from the child component.
                // We'll pass a function to the child component in the next step.
              }}
              className="bg-blue-600 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-bold">દસ્તાવેજ જુઓ</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}