import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ScreenTwo({ screenWidth })  {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/snorkeling.avif')}
        style={[styles.image , { width: screenWidth}]}
      />
        <View style={styles.border} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome to Travel Bestie!</Text>
        <View style={styles.subtextContainer}>
          <Text style={styles.subheader}> Swipe to learn more </Text>
          <Icon name="angle-right" size={21} color="black" />
        </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    
  },
  image: {
    // paddingLeft: 550,
    // paddingBottom: 100,
    width: 600,
    height: 400,
  },
  border: {
    height: 2, // Adjust the height to set the border size
    width: '100%',
    backgroundColor: 'black', // Transparent color for the border
  },
  textContainer: {
    position: 'absolute',
    top: 430, // Adjust the top value to position the text as needed
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'top',
    alignItems: 'left',
    paddingLeft: 30
  },
  header: {
    fontSize: 50,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: '100',
    color: 'black',

  },

  subheader: {
    fontSize: 19,
    fontFamily: 'AppleSDGothicNeo-Regular',
    // fontWeight: '100',
    color: 'black',
  },
  subtextContainer: {
    
    flexDirection: 'row', // Display items in a row
    alignItems: 'center',
    paddingLeft: 30, // Adjust the padding as needed
  }
});