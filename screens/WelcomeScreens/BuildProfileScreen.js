import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import TagBox from '../TagBox';
import QuizScreen from '../QuizScreen';


export default function BuildPofile({ navigation }) {
  const [avatarSource, setAvatarSource] = useState(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Avatar.Image
        size={150}
        source={avatarSource ? { uri: avatarSource.uri } : require('../../assets/travelbestie.jpg')}
      />
      <Button mode="outlined" >
        Select Profile Picture
      </Button>
      <TagBox></TagBox>
      <QuizScreen></QuizScreen>
    </View>
  );
};