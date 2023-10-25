// screens/QuizScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

export default function QuizScreen({ navigation }) {
  const [answers, setAnswers] = useState({});

  // Logic to handle and save answers

  return (
    <View>
      <Text>Help us craft your perfect adventure!</Text>
      {/* Example question with radio buttons */}
      <Text>Do you prefer beaches or mountains?</Text>
      <RadioButton.Group 
        onValueChange={newValue => setAnswers(prev => ({...prev, preference: newValue}))}
        value={answers.preference}>
        <RadioButton.Item label="Beaches" value="beaches" />
        <RadioButton.Item label="Mountains" value="mountains" />
      </RadioButton.Group>
      <Button mode="contained">
        Next
      </Button>
    </View>
  );
}
