import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import HeartScreen from './screens/HeartScreen';
import ChatScreen from './screens/ChatScreen';
import PlayScreen from './screens/PlayScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Like" component={HeartScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Play" component={PlayScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

