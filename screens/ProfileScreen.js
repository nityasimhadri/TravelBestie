import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Button, Avatar, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { findUserByIdThunk } from '../services/thunks';
import firebase from "../firebase";
import { findUserById } from '../services/service';

export default function ProfileScreen({ navigation }) {
  const likedActivities = require('./LikedActivities.json');
  const likedPlaces = require('./LikedPlaces.json');
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = firebase.auth()

    auth.onAuthStateChanged(async (u) => {
      if (u) {
        const uid = u.uid;
        const result = await findUserById(uid)
        setProfile(result)
 
        // await dispatch(findUserByIdThunk(uid)
      } else {
        // User is signed out
        // ... handle signed out state
      }
    });
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={100}
          source={require('../assets/travelbestie.jpg')}
          style={styles.profilePicture}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.userName}>{profile?.username || 'Unknown User'}</Text>
          <Text style={styles.tag}>{profile?.email || 'loading'}</Text>
        </View>
        <Button mode='contained' style={styles.button}> Edit Profile </Button>
        <Button mode='contained' style={styles.button} onPress={()=> navigation.navigate('Signup')}> Log Out </Button>
      </View>
      <ScrollView style={styles.section}>
      </ScrollView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
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
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white'
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 20,  
    borderTopLeftRadius: 20,  
    padding: 16,
    top: -20,
  },
  sectionHeader: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  // activities: {
  //   fontFamily: 'AppleSDGothicNeo-Regular',
  //   // paddingTop: 30
  // },
  card: {
    width: 140,
    margin: 10,
    // height: 230,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center'
  },
  cardCover: {
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    height: 120
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'left',
  },
  cardText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: 'bold'
  }


});