import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Searchbar, Text, Icon } from 'react-native-paper';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Your Adventure Dashboard!</Text>
        <Searchbar
          placeholder="Enter a location"
          style={styles.searchBar} // Apply custom style to the Searchbar
        />
        {/* <View style={styles.subtextContainer}>
          <Text style={styles.subheader}> Swipe to learn more </Text>
          <Icon name="angle-right" size={21} color="black" />
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'top',
    alignItems: 'left',
    paddingLeft: 30
  },
  header: {
    fontSize: 40,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: '100',
    color: 'black',
  },
  subheader: {
    fontSize: 19,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'black',
  },
  subtextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
  },
  searchBar: {
    backgroundColor: 'white', // Background color for the Searchbar
    borderRadius: 10, // Adjust the border radius as needed
    width: '90%',
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: 'black', // Border color
  },
});