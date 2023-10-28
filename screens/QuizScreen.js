// screens/QuizScreen.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioGroup, RadioButton, Button, Text } from 'react-native-paper';


export default function QuizScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const quizQuestions = require('./quizQuestions.json');

  const handleAnswerPress = (selectedOption) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion]: selectedOption }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log(answers)
    }
  };

  // Logic to handle and save answers

  return (
    <View>
    <Text>Help us craft your perfect adventure!</Text>
    {currentQuestion < quizQuestions.length && (
        <View>
          <Text>{quizQuestions[currentQuestion].text}</Text>
          <RadioButton.Group
            onValueChange={(newValue) => handleAnswerPress(newValue)}
            value={answers[currentQuestion]}>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <RadioButton.Item key={index} label={option} value={option} />
            ))}
          
          <View>
              <Button mode="contained" onPress={handlePrevious}>
                Previous
              </Button>
              <Button mode="contained" onPress={handleNext}>
                Next
              </Button>
          </View>
          </RadioButton.Group>
        </View>
      )}
  </View>
);
}

