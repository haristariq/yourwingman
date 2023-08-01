import React from 'react';
import { View, Button, Text } from 'react-native';
import { logout } from './firebase';  // Import the logout function

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 32, fontWeight: 'bold'}}>Profile</Text>
      <Button title="Logout" onPress={logout} />  {/* Logout button */}
    </View>
  );
}