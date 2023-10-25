// screens/WelcomeScreen.js
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to Adventure App!</Text>
      <Button mode="contained">
        Login
      </Button>
      <Button mode="outlined">
        Sign Up
      </Button>
    </View>
  );
}
