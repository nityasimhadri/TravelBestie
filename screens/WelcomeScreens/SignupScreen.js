import React, { useState } from 'react';
import { View, StyleSheet,TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';
import firebase from '../../firebase'
import { createUserThunk } from '../../services/thunks';
import { useDispatch } from 'react-redux';

export default function SignupScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
      const dispatch = useDispatch();
  const handleSignup = async () => {

    try {
      const authResult = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = authResult.user;
      if (user) {
        const userData = {
          _id: user.uid,
          email: email,
          username: name,

        };


        dispatch(createUserThunk(userData)).then((result) => {
          if (createUserThunk.fulfilled.match(result)) {
            navigation.navigate('Main', { screen: 'Quiz' });
          } else if (createUserThunk.rejected.match(result)) {
            console.error('Error saving to MongoDB:', result.error);
          }
        });
      }
      navigation.navigate('Main', { screen: 'Quiz' });
    } catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Sign Up</Text>
    <TextInput
    style={styles.input}
    placeholder="Name"
    onChangeText={text => setName(text)}
    />
    <TextInput
    style={styles.input}
    placeholder="Email"
    onChangeText={text => setEmail(text)}
    />
    <TextInput
    style={styles.input}
    placeholder="Password"
    secureTextEntry={true}
    onChangeText={text => setPassword(text)}
    />
    <Button onPress={handleSignup} mode="contained" buttonColor="#023047"  style={{   borderWidth: 1, paddingHorizontal: 20, width: 300, borderRadius: 30 }} >
    Sign Up
    </Button>
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      paddingLeft: 10,
    },
  });