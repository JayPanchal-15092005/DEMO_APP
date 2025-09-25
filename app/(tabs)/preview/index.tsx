import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { View, Text, StyleSheet } from 'react-native';

export default function PreviewScreen() {
  const { html } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "દસ્તાવેજ પૂર્વદર્શન" }} />
      {html ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: html as string }}
          style={styles.webView}
        />
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>કોઈ દસ્તાવેજ પૂર્વદર્શન માટે નથી.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webView: { flex: 1 },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  }
});