// screens/WelcomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Travel Bestie!</Text>
      <Button mode="contained" onPress={navigation.navigate('Quiz')}>
        Login
      </Button>
      <Button mode="outlined" onPress={navigation.navigate('Quiz')}>
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
  }
});
