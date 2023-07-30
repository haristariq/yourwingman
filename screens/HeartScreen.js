import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the placeholder image
import placeholderImage from './restaurant.png';

const HeartScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const response = await axios.get("https://my-api.com/restaurants");
    setRestaurants(response.data);
  };

  const onSwipeLeft = (index) => {
    console.log("Swiped left on restaurant: ", restaurants[index].name);
  };

  const onSwipeRight = (index) => {
    console.log("Swiped right on restaurant: ", restaurants[index].name);
  };

  const onBook = (index) => {
    console.log("Booked restaurant: ", restaurants[index].name);
  };

  return (
    <View style={styles.container}>
      {restaurants.length > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={restaurants}
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={placeholderImage} style={styles.image} />
              <View style={styles.buttons}>
                <Icon.Button name="times" backgroundColor="white" color="black" size={30} onPress={() => swiperRef.current.swipeLeft()} />
                <Icon.Button name="heart" backgroundColor="white" color="black" size={30} onPress={() => swiperRef.current.swipeRight()} />
                <Icon.Button name="phone" backgroundColor="white" color="black" size={30} onPress={() => onBook(swiperRef.current.state.index)} />
              </View>
            </View>
          )}
          onSwipedLeft={onSwipeLeft}
          onSwipedRight={onSwipeRight}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

// Get the device window's width and height
const { width, height } = Dimensions.get('window');

// Then adjust your styles accordingly
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9, // 90% of screen width
    height: height * 0.6, // 60% of screen height
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Set card background color to white
    borderRadius: 20,
  },
  image: {
    width: '100%', // Use 100% of the card's width
    height: '85%', // Use 85% of the card's height
    position: 'absolute',
    top: 0, // Start from the top of the card
    borderRadius: 15, // this will make the image corners rounded
  },
  buttons: {
    flexDirection: "row", 
    justifyContent: "space-between", // This will increase the distance between the buttons
    position: 'absolute',
    bottom: 10, // Position buttons at the bottom of the card
    width: '100%', // Take the full width of the card
    paddingHorizontal: 20, // Add horizontal padding to prevent the buttons from touching the edges
  }
});

export default HeartScreen;