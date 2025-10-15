import { Stack } from 'expo-router';

export default function PreviewLayout() {
  return (
    <Stack>
      {/* This screen is defined by the file 'app/(tabs)/preview/index.tsx'.
        We hide the header because it is already defined in the index.tsx file itself.
      */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // The header is handled by the index.tsx file
          title: "Preview",
        }}
      />  
    </Stack>
  );
}