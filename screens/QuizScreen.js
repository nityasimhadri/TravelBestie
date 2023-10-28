// screens/QuizScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function QuizScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const quizQuestions = require('./quizQuestions.json');

  const handleAnswerPress = (selectedOption) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: selectedOption }));

    // Check if there are more questions, and if so, move to the next question
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
    // } else {
    //   // Quiz completed, navigate to the result screen or take appropriate action.
      
    //   navigation.navigate('QuizResult', { answers });
    // }
  };

  // Logic to handle and save answers

  return (
    <View>
    <Text>Help us craft your perfect adventure!</Text>
    {currentQuestion < quizQuestions.length && (
      <View>
        <Text>{quizQuestions[currentQuestion].question}</Text>
        <RadioButton.Group
          onValueChange={(newValue) => handleAnswerPress(newValue)}
          value={answers[currentQuestion]}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <RadioButton.Item key={index} label={option} value={option} />
          ))}
        </RadioButton.Group>
        <Button mode="contained" onPress={handleAnswerPress}>
          Next
        </Button>
      </View>
    )}
  </View>
  );
}
