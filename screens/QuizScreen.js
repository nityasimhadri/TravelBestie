import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Button, Text } from 'react-native-paper';

export default function QuizScreen({ navigation }) {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const quizQuestions = require('./quizQuestions.json');

    const handleAnswerPress = (selectedOption) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [currentQuestion]: selectedOption }));
    };
  
  const [hasError, setHasError] = useState(false);

const handleNavigation = (offset) => {
    if (offset === 1 && !answers[currentQuestion]) {
        setHasError(true);
        Alert.alert('Error', 'Please answer the question before proceeding.');
        return;
    }
    setHasError(false); 

    const newQuestion = currentQuestion + offset;
    if (newQuestion >= 0 && newQuestion < quizQuestions.length) {
        setCurrentQuestion(newQuestion);
    } else if (newQuestion === quizQuestions.length) {
        console.log(answers);
        // quiz completion logic here
    }
};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Help us craft your perfect adventure!</Text>
            
            {currentQuestion < quizQuestions.length && (
                <View style={styles.quizContainer}>
                    <Text style={styles.question}>{quizQuestions[currentQuestion].text}</Text>
                    <RadioButton.Group 
                        onValueChange={handleAnswerPress}
                        value={answers[currentQuestion]}>
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                            <RadioButton.Item key={index} label={option} value={option} />
                        ))}
                    </RadioButton.Group>

                    <View style={styles.buttons}>
                        {currentQuestion > 0 && (
                            <Button mode="contained" onPress={() => handleNavigation(-1)} style={styles.prevButton}>
                                Previous
                            </Button>
                        )}
                        <Button mode="contained" onPress={() => handleNavigation(1)}>
                            {currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    question: {
        fontSize: 20,
        marginBottom: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%'
    },
    prevButton: {
        marginRight: 10
    },
    quizContainer: {
        width: '100%',
    }
});
