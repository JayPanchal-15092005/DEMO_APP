import { Stack } from 'expo-router';
import React from 'react';

export default function FormsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="rent-agreement"
        options={{
          // Remove all header configurations from here
          // Let the component handle everything
        }}
      />
    </Stack>
  );
}