// screens/IteneraryScreen.js
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

export default function IteneraryScreen() {
  return (
    <View>
      <ActivityIndicator animating={true} size="large" />
      <Text>Crafting your personalized adventure...</Text>
    </View>
  );
}
