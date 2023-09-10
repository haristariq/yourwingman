import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SansFont from '../SansFont';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const RestaurantDetailsScreen = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();

  const handleCall = () => {
    let phoneNumber = restaurant.formatted_phone_number;
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`).catch(err => {
        console.error("Failed to dial the number:", err);
      });
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
      <Ionicons 
        name="close" 
        size={50}
        color="white"
        style={styles.closeIcon}
        onPress={() => navigation.goBack()} 
      />
      <View style={styles.textContainer}>
        <SansFont style={styles.restaurantName}>{restaurant.name}</SansFont>
        <SansFont style={styles.description}>{restaurant.description}</SansFont>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCall} style={styles.lilacButton}>
          <LinearGradient // Add LinearGradient here
            colors={['#F63199', '#A333E5']} // Define your gradient colors
            style={styles.iconBackground}
          >
            <Ionicons name="call" size={30} color="white" />
          </LinearGradient>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMap} style={styles.lilacButton}>
          <LinearGradient // Add LinearGradient here
            colors={['#F63199', '#A333E5']} // Define your gradient colors
            style={styles.iconBackground}
          >
            <Ionicons name="map" size={30} color="white" />
          </LinearGradient>
          <Text style={styles.buttonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <SansFont style={styles.buttonText}>{restaurant.phoneNumber}</SansFont>
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
    alignItems: 'center', // Center the text vertically
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  lilacButton: {
    backgroundColor: 'transparent', // Remove background color
    borderRadius: 10,
    flexDirection: 'column', // Stack the icon and text vertically
    alignItems: 'center', // Center the items horizontally
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#A333E5', // Change text color
    marginTop: 5, // Add margin to separate text from icons
    fontWeight: 'bold',
    fontSize: 16, // Adjust font size as needed
  },
  closeIcon: {
    position: 'absolute',
    top: 40,
    left: 20,

    // For iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // For Android
    elevation: 5,
  },
  iconBackground: {
    width: 50, // Adjust the width and height as needed
    height: 50,
    borderRadius: 15, // Make it circular
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestaurantDetailsScreen;
