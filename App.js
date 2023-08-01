import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  // Import the auth object

import HomeScreen from './screens/HomeScreen';
import HeartScreen from './screens/HeartScreen';
import ChatScreen from './screens/ChatScreen';
import PlayScreen from './screens/PlayScreen';
import LoginScreen from './LoginScreen';
import VerificationScreen from './VerificationScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Define the TabNavigator component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Heart') {
            iconName = 'heart-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          } else if (route.name === 'Play') {
            iconName = 'play-circle-outline';
          }

          return (
            <View 
              style={{
                padding: 2,
                borderRadius: 5,
                backgroundColor: focused ? '#A333E5' : 'transparent',
              }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Heart" component={HeartScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}