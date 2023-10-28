

import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import {Button, Text} from 'react-native-paper';
import ScreenOne from './screenOne';
import ScreenTwo from './screenTwo';
import ScreenThree from './screenThree';

export default function WelcomeScreen({navigation}) {
  const [activeScreen, setActiveScreen] = useState(0);
  let screenWidth = Dimensions.get('window').width;

  const screens = [
    <ScreenOne key="screen1" screenWidth={screenWidth} />,
    <ScreenTwo key="screen2" screenWidth={screenWidth} />,
    <ScreenThree key="screen3" screenWidth={screenWidth} />,
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
     <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 20, columnGap: 20 }}>
     <Button onPress={() => navigation.navigate('Login')} mode="contained" buttonColor="white" textColor="black" style={{  borderColor: 'black', borderWidth: 1, paddingHorizontal: 20 }} >
        Log In
      </Button>
      <Button onPress={() => navigation.navigate('Signup')} mode="contained" buttonColor="black" style={{ paddingHorizontal: 20 }}   >
        Sign Up
      </Button>
      </View>
    </View>
  );
}

