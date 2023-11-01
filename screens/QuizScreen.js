import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Button, Text } from 'react-native-paper';
import { setQuizAnswers } from '../services/service';
import firebase from '../firebase';

export default function QuizScreen({ navigation }) {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const quizQuestions = require('./quizQuestions.json');
    const [uid, setUid] = useState(null);
    const handleAnswerPress = (selectedOption) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [currentQuestion]: selectedOption }));
    };
    
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {
        const auth = firebase.auth()
        
        auth.onAuthStateChanged(async (u) => {
            if (u) {
                setUid(u.uid)
            }
        });
    }, []);
    
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
            console.log(answers)
            setQuizAnswers(uid, answers);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Tell us what your're looking for!</Text>
            
            {currentQuestion < quizQuestions.length && (
                <View style={styles.quizContainer}>
                    <Text style={styles.question}>{quizQuestions[currentQuestion].text}</Text>
                    <View style={styles.radioGroupContainer}>
                        <RadioButton.Group
                            onValueChange={handleAnswerPress}
                            value={answers[currentQuestion]}
                            style={styles.radioGroup}
                        >
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <RadioButton.Item key={index} label={option} value={option} />
                            ))}
                        </RadioButton.Group>
                    </View>

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
        flexDirection: 'column',
        rowGap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginBottom: 20,
    // },
    // question: {
    //     fontSize: 20,
    //     marginBottom: 20,
    // },
  title: {
      fontSize: 22,
      fontFamily: 'AppleSDGothicNeo-Regular',
      fontWeight: 'bold',
      color: 'black',
  
    },
  
    question: {
      fontSize: 17,
      fontFamily: 'AppleSDGothicNeo-Regular',
      // fontWeight: '100',
      color: 'black',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    prevButton: {
        marginRight: 10,
    },
    quizContainer: {
        width: '100%',
    },
    radioGroupContainer: {
        borderWidth: 1, 
        borderColor: 'black', 
        borderRadius: 10, 
        padding: 10, 
        marginBottom: 20, 
        backgroundColor: 'white'
    },
    line: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginVertical: 20,
  },
});