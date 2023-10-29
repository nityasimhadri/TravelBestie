

import React, { useState, useEffect } from 'react';
import { View, Text,FlatList, StyleSheet } from 'react-native';
import {  Button, Avatar, Card } from 'react-native-paper';


export default function ProfileScreen({ user,  friends, fetchUserProfile }) {
  const likedActivities = require('./LikedActivities.json');
  const likedPlaces = require('./LikedPlaces.json');
  // const [profile, setProfile] = useState(user);

  // useEffect(() => {
  //   fetchUserProfile(user.id); // Fetch user profile data when the component mounts
  // }, [user.id, fetchUserProfile]);

  return (
    <View style={styles.container}>
       <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={require('../assets/travelbestie.jpg')}
          style={styles.profilePicture}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.userName}>Nitya Simhadri</Text>
        <Text style={styles.tag}>@nityathetraveler</Text>
        </View>
       <Button mode='contained' buttonColor='rgba(255, 255, 255, 0.2)' textColor="white" style={{  borderRadius: 10}}> Edit Profile </Button>
      </View>
      {/* <Text style={styles.userName}>{profile.name}'s Profile</Text> */}
      

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Liked Places</Text>
        <FlatList
          horizontal={true}
          data={likedPlaces}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={{ width: 150, margin: 10 }}>
              <Card.Cover source={require("../assets/skydiving.avif")}/>
              <Card.Content>
                <Text>{item.name}</Text>
              </Card.Content>
            </Card>
          )}
        />
      {/* </View>

      <View style={styles.section}> */}
        <Text style={styles.sectionHeader}>Liked Activities</Text>
        <FlatList
          horizontal={true}
          data={likedActivities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={{ width: 150, margin: 10 }}>
              <Card.Cover source={require("../assets/friends.jpeg")}/>
              <Card.Content>
                <Text>{item.name}</Text>
              </Card.Content>
            </Card>
          )}
        />
      {/* </View>

      <View style={styles.section}> */}
        <Text style={styles.sectionHeader}>Friends</Text>
        {/* <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.name}</Text>
          )}
        /> */}
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    fontFamily: 'AppleSDGothicNeo-Regular',
    
  },
  profileHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023047',
    paddingTop: 20,
    paddingBottom: 40,
    rowGap: 20
    // paddingHorizontal: 20
  },
  profilePicture: {
    marginRight: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white'
  },
  tag: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white'
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,  
    borderTopLeftRadius: 20,  
    padding: 16,
    top: -20
  },
  sectionHeader: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
});