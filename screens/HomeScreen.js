import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={{ width: 30, height: 30, marginRight: 10 }}
            source={{uri: 'https://url-to-your-account-image.com'}}
          />
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