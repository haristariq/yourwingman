import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../firebase';  // Import the logout function

export default function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <Text style={{ marginRight: 10 }}>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {/* Code to select location */}}>
          <Text style={{ marginLeft: 10 }}>Select Location</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e1c4ff' }}>
      <Text style={{fontSize: 32, fontWeight: 'bold'}}>Explore</Text>
    </View>
  );
}