import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import HeartScreen from './screens/HeartScreen';
import ChatScreen from './screens/ChatScreen';
import PlayScreen from './screens/PlayScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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

            // Wrap the icon in a View with a background color
            return (
              <View 
                style={{
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor: focused ? '#A333E5' : 'transparent', // lilac color in hexadecimal
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
    </NavigationContainer>
  );
}