import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the placeholder image
import placeholderImage from '../assets/images/restaurant.png';

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
          backgroundColor={'white'} // Add this line to change the background color
          renderCard={(card) => (
            <View style={styles.card}>
              <Image source={placeholderImage} style={styles.image} />
              <Text style={styles.cardText}>{card.name}</Text>
              <View style={styles.buttons}>
                <Icon.Button name="times" backgroundColor="#EFE2EB" color="black" size={30} onPress={() => swiperRef.current.swipeLeft()} />
                <Icon.Button name="heart" backgroundColor="#EFE2EB" color="black" size={30} onPress={() => swiperRef.current.swipeRight()} />
                <Icon.Button name="phone" backgroundColor="#EFE2EB" color="black" size={30} onPress={() => onBook(swiperRef.current.state.index)} />
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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white', // Change this line to adjust the background color of the entire app
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE2EB', // Change this line to adjust the color of the cards
    borderRadius: 20,
    
  },
  image: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    top: 0,
    borderRadius: 15,

  },
  cardText: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  }
});

export default HeartScreen;