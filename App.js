// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import NavigationBar from './screens/Navigation';
 
// Import your screens
import WelcomeScreen from './screens/WelcomeScreen';
import QuizScreen from './screens/QuizScreen';
import DashboardScreen from './screens/DashboardScreen';
import IteneraryScreen from './screens/IteneraryScreen';
import ResultsScreen from './screens/ResultsScreen';
 
const Stack = createStackNavigator();
 
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Quiz">
        <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Generating" component={IteneraryScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />

        
        </Stack.Navigator>
        {/* <NavigationBar /> */}
      </NavigationContainer>
      
    </PaperProvider>
  );
}
 