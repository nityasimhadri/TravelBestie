// screens/DashboardScreen.js
import React from 'react';
import { View } from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';

export default function DashboardScreen({ navigation }) {
  return (
    <View>
      <Text>Your Adventure Dashboard</Text>
      <Searchbar placeholder="Enter a location" />
      <Button mode="contained" >
        Generate Adventures
      </Button>
    </View>
  );
}
