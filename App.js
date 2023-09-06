import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import SansFont from './SansFont'
import { UserDataProvider } from './UserContext';

import LocationScreen from './screens/Location';
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
import RestaurantDetailScreen from './screens/RestaurantDetailsScreen.js';
import SpicyAnswers from './screens/SpicyAnswers'
import PreferencesScreen from './screens/PreferencesScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    'DM Sans Bold': require('./assets/fonts/DM_Sans/static/DMSans-Bold.ttf')
  });
};





// Define the TabNavigator component
function TabNavigator() {
  console.log('Logged in [App.js] Rendering App component...');
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

          console.log('Changed Tab [App.js] Rendering App component...');
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

  // Prevent native splash screen from autohiding before App component is ready
  SplashScreen.preventAutoHideAsync()
    .catch(() => { /* reloading the app might trigger some race conditions, so just ignore them */ });

  useEffect(() => {
    async function prepare() {
      try {
        await fetchFonts();
        setFontLoaded(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Only hide the splash screen when fonts are loaded and user is initialized
        if (fontLoaded && !initializing) {
          SplashScreen.hideAsync();
        }
      }
    }
    prepare();
  }, [fontLoaded, initializing]);

  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
      if (fontLoaded) {
        SplashScreen.hideAsync();
      }
    }
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (!fontLoaded || initializing) {
    return null;
  }

  
  console.log('After useEffect [App.js] Rendering App component...');
return (
      <UserDataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Verify" component={VerificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Name" component={NameScreen} options={{ headerShown: false }} /> 
          <Stack.Screen name="Location" component={LocationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>

  
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen name="PlacesToGo" component={PlacesToGo} options={{ headerShown: false }} />
        <Stack.Screen name="SpicyTime" component={SpicyTime} options={{ headerShown: false }} />
        <Stack.Screen name="SpicyAnswers" component={SpicyAnswers} options={{ headerShown: false }} />

        <Stack.Screen name="HeartScreen" component={HeartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
    </UserDataProvider>

  );
}