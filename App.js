import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';  // Import the auth object
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import SansFont from './SansFont';
import { UserDataProvider } from './UserContext';


import LocationScreen from './screens/Location';
import BirthdateScreen from './screens/BirthdateScreen'
import PlacesToGo from './screens/PlacesToGo';
import SpicyTime from './screens/SpicyTime';
import Matches from './screens/Matches';
import HomeScreen from './screens/HomeScreen';
import HeartScreen from './screens/HeartScreen';
import ChatScreen from './screens/ChatScreen';
import PlayScreen from './screens/PlayScreen';
import LoginScreen from './screens/LoginScreen';
import VerificationScreen from './screens/VerificationScreen';
import NameScreen from './screens/NameScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'DM Sans Bold': require('./assets/fonts/DM_Sans/static/DMSans-Bold.ttf'),

  });
};


// Define the TabNavigator component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'insideHome') {
            iconName = 'home-outline';
          } else if (route.name === 'Heart') {
            iconName = 'heart-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles-outline';
          } else if (route.name === 'Play') {
            iconName = 'play-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
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
        tabBarLabel: '', // This hides the label
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="insideHome" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Heart" component={Matches} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Play" component={PlayScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>

    </Tab.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Handle user state changes
  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChange);
    fetchFonts().then(() => setFontLoaded(true));
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing || !fontLoaded) {
    return <AppLoading />;
  }

  return (
    <UserDataProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Name" component={NameScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Birthday" component={BirthdateScreen} options={{ headerShown: false }} />


        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen name="PlacesToGo" component={PlacesToGo} options={{ headerShown: false }} />
        <Stack.Screen name="SpicyTime" component={SpicyTime} options={{ headerShown: false }} />
        <Stack.Screen name="HeartScreen" component={HeartScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
    </UserDataProvider>

  );
}