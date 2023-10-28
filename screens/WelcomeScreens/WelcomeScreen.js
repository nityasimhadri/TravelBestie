

import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import {Button, Text} from 'react-native-paper';
import ScreenOne from './screenOne';

export default function WelcomeScreen({navigation}) {
  const [activeScreen, setActiveScreen] = useState(0);
  let screenWidth = Dimensions.get('window').width;

  const screens = [
    <ScreenOne key="screen1" screenWidth={screenWidth} />,
    <Screen2 key="screen2" screenWidth={screenWidth} />,
    <Screen3 key="screen3" screenWidth={screenWidth} />,
  ];

  const handleScreenChange = (screenIndex) => {
    setActiveScreen(screenIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        onMomentumScrollEnd={(e) => {
          const offset = e.nativeEvent.contentOffset.x;
          const index = Math.round(offset / 320);
          setActiveScreen(index);
        }}
      >
        {screens}
       

      </ScrollView>
  


      
     {/* login footer */}
     <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', padding: 10, columnGap: 20 }}>
     <Button onPress={() => navigation.navigate('Login')} mode="contained" buttonColor="white" textColor="black" style={{  borderColor: 'black', borderWidth: 1, paddingHorizontal: 20 }} >
        Log In
      </Button>
      <Button onPress={() => navigation.navigate('Main', { screen: 'Quiz' })} mode="contained" buttonColor="black" style={{ paddingHorizontal: 20 }}   >
        Sign Up
      </Button>
      </View>
    </View>
  );
}

function Screen1({ screenWidth })  {
  return (
    <View style={{ flex: 1, width: screenWidth, backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to Travel Bestie</Text>
      <Image source={require('../../assets/travelbestie.jpg')}
      style={{ width: 600, height: 600}} // Adjust the width and height as needed
      />
    </View>
  );
}

function Screen2({ screenWidth })  {
  return (
    <View style={{ flex: 1, width: screenWidth, backgroundColor: 'lightcoral', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 2</Text>
    </View>
  );
}

function Screen3({ screenWidth })  {
  return (
    <View style={{ flex: 1, width: screenWidth, backgroundColor: 'lightgreen', alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 3</Text>
    </View>
  );
}