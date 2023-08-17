import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SansFont from '../SansFont';

const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();

  const handleCall = () => {
    const phoneNumber = restaurant.phoneNumber;
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  }

  const handleMap = () => { 
    const address = encodeURIComponent(restaurant.address); // Ensure address is URL-safe
  
    // Construct URL based on platform
    const url = Platform.select({
      ios: `maps:?q=${address}`,
      android: `geo:0,0?q=${address}`
    });
  
    Linking.openURL(url);
  }
  

  return (
    <View style={styles.container}>
      <Image 
        source={{uri: restaurant.photoUrl}}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <SansFont style={styles.restaurantName}>{restaurant.name}</SansFont>
        <SansFont style={styles.description}>{restaurant.description}</SansFont>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCall} style={styles.lilacButton}>
          <Ionicons name="call" size={30} color="white" />
          <Text style={styles.buttonText}>Call {restaurant.phoneNumber}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMap} style={styles.lilacButton}>
          <Ionicons name="map" size={30} color="white" />
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Ionicons 
        name="close" 
        size={30}
        color="white"
        style={styles.closeIcon}
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Dimensions.get('window').height * 0.5,
    backgroundColor: '#fff'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    position: 'absolute',
    top: 0
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  restaurantName: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  description: {
    marginTop: 10,
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  lilacButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default RestaurantDetailsScreen;
