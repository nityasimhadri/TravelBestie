import React, {useState} from 'react';
import { View, StyleSheet,TextInput } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add your login logic here, such as API calls or authentication

    // For this example, we'll just log the email and password
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      
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

      <View style={styles.buttonContainer}>
       
          <Button onPress={() => navigation.navigate('Main', { screen: 'Quiz' })} mode="contained" buttonColor="#8ecae6"  style={{   borderWidth: 1, paddingHorizontal: 20, width: 300, borderRadius: 30 }} >
            Log In
          </Button>
   
        
   
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 20, rowGap: 10 }}>
      <Text>Don't have an account?</Text>
            <Button onPress={()=> navigation.navigate('Signup')} mode="contained" buttonColor="#023047"  style={{   borderWidth: 1, paddingHorizontal: 20, width: 300, borderRadius: 30 }} >
              Sign Up
            </Button>
      </View>

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
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: 200,
    justifyContent: 'space-between',
    padding: 20,
  },
  topButtons: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'lightblue',
    // padding: 20,
  },
  bottomButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'lightcoral',
    // padding: 20,
  },
  button: {
    borderRadius: 30,
    buttonColor: 'black'
  },
});