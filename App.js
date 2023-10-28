// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import theme from './theme/theme';
import QuizScreen from './screens/QuizScreen';
import DashboardScreen from './screens/DashboardScreen';
import IteneraryScreen from './screens/IteneraryScreen';
import ResultsScreen from './screens/ResultsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
    // Check if the user has launched the app before
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        // Set flag to AsyncStorage for next time's check
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    }, []);
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tutorial">
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Welcome">
            <Tab.Screen name="Welcome" component={LoginScreen} />
            <Tab.Screen name="Quiz" component={QuizScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Generating" component={IteneraryScreen} />
            <Tab.Screen name="Results" component={ResultsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
