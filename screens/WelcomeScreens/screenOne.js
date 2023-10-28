import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function screenOne() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/travelbestie.jpg')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>Welcome to Travel Bestie</Text>
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
  image: {
    width: 600,
    height: 600,
  },
  textContainer: {
    position: 'absolute',
    top: 0, // Adjust the top value to position the text as needed
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});