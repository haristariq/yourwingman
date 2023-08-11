import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import SansFont from '../SansFont';
import placeholderImage from '../assets/images/restaurant.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getIdToken } from '../firebase';
import { useUserData } from '../UserContext';
import Matches from './Matches';
import { addFavoriteRestaurant } from '../backend'; 

const HeartScreen = () => {
  const navigation = useNavigation();
  const { restaurants, userData } = useUserData();
  const swiperRef = useRef(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    getIdToken()
      .then(token => {
        console.log('ID token fetched:', token);
        setIdToken(token);
      })
      .catch(error => {
        console.error('Error getting ID token:', error);
      });
  }, []);


  const onSwipeLeft = (index) => {
    console.log("Swiped left on restaurant: ", restaurants[index].name);
  };

  const onSwipeRight = async (index) => {
    console.log("Swiped right on restaurant: ", restaurants[index].name);
    
    if (idToken) {
      try {
        const response = await addFavoriteRestaurant(restaurants[index], idToken);
        console.log('Successfully added to favorites:', response.message);
      } catch (error) {
        console.error('Failed to add to favorites:', error.message);
      }
    }
  };

  const onBook = (index) => {
    console.log("Booked restaurant: ", restaurants[index].name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon.Button name="close" backgroundColor="white" color="black" size={30} onPress={() => navigation.goBack()} />
        <SansFont style={styles.headerText}>Explore</SansFont>
      </View>
      <View style={styles.swiperContainer}>
        {restaurants.length > 0 ? (
          <Swiper
            ref={swiperRef}
            cards={restaurants}
            backgroundColor={'white'}
            renderCard={(card) => (
              <View style={styles.card}>
                <Image source={{ uri: card.photoUrl || placeholderImage }} style={styles.image} />
                <SansFont style={styles.cardText}>{card.name}</SansFont>
                <View style={styles.buttons}>
                  <Icon.Button name="times" backgroundColor="white" color="#A833E1" size={30} onPress={() => swiperRef.current.swipeLeft()} />
                  <Icon.Button 
  name="heart" 
  backgroundColor="white" 
  color="#A833E1" 
  size={30} 
  onPress={() => onSwipeRight(swiperRef.current.state.index)}
/>
                  <Icon.Button name="phone" backgroundColor="white" color="#A833E1" size={30} onPress={() => onBook(swiperRef.current.state.index)} />
                </View>
              </View>
            )}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}
          />
        ) : (
          <SansFont>Loading...</SansFont>
        )}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  swiperContainer: {
    flex: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1000,
    backgroundColor: 'white',
    marginBottom: -60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 10,
  },
  card: {
    marginTop: 50,
    width: width * 0.9,
    height: height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
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
    bottom: 80,
    left: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
});

const Tab = createBottomTabNavigator();

const HeartStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'insideHeartScreen') {
            iconName = 'home-outline';
          } else if (route.name === 'Matches') {
            iconName = 'play-circle-outline';
          }

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
        tabBarLabel: '',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="insideHeartScreen" component={HeartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Matches" component={Matches} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default HeartStack;
