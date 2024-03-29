import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { getIdToken} from '../firebase';
import Swiper from 'react-native-swiper';
import thumbnail1 from '../assets/images/thumbnail.png';
import action2 from '../assets/images/compatibility-quiz.png';
import thumbnail3 from '../assets/images/new-feature.png';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PlacesToGo from './PlacesToGo';
import SpicyTime from './SpicyTime';
import HeartScreen from './HeartScreen';
import { getUser } from '../backend';
import { useUserData } from '../UserContext';  // Import the context hook
import { getRestaurantRecommendations } from '../backend'; // Assuming this function fetches the restaurants


import places from '../assets/images/places.jpg';
import food from '../assets/images/food.png';
import heart from '../assets/images/heart.jpg';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const header = "Explore";
  const [userData, setUserData] = useState('');
  const [idToken, setIdToken] = useState(null);
  const { setRestaurants } = useUserData(); // Access setRestaurants from the context



  useEffect(() => {
    getIdToken()
      .then(token => {
        console.log('HomeScreen');
        setIdToken(token);
      })
      .catch(error => {
        console.error('Error getting ID token:', error);
      });
  }, []);
  
  const fetchUserData = async () => {
    try {
      if (idToken) {
        const response = await getUser(idToken);
        setUserData(response);
        
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };



  useEffect(() => {
    fetchUserData(); // Call the fetchUserData function to update the userData state
  }, [idToken]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const recommendedRestaurants = await getRestaurantRecommendations(userData, idToken);
        setRestaurants(recommendedRestaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    
    if(idToken) {
      fetchRestaurants();
    }
  }, [idToken]);


  const thumbnails = [
    { key: '1', text: 'Food Spots', navigateTo: 'HeartScreen', image: food},
    { key: '2', text: 'Places to Go', navigateTo: 'PlacesToGo', image: places},
    { key: '3', text: 'Spicy Time', navigateTo: 'SpicyTime', image: heart},
  ];

  const buttonSets = [
    { key: '1', thumbnail: thumbnail1 , thumbnailWidth: '40%', buttons: ['I love you', 'Im sad', 'Im horny'], showButtons: true },
    { key: '2', thumbnail: action2 , thumbnailWidth: '100%', showButtons: false },
    { key: '3', thumbnail: thumbnail3, thumbnailWidth: '100%', showButtons: false },
  ];

  const userName = userData ? userData.name : '';
  const locationed = userData ? userData.location : '';



  const users = [
    { key: '1', name: userName , image: 'https://via.placeholder.com/100' },
    { key: '2', name: 'User2', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <LinearGradient 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 0 }} 
      colors={['#C56AF0', '#F578C9']}  
      style={styles.container}
    >
      <View style={styles.topPart}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {}}>
            <SansFont style={styles.buttonText}>{locationed}</SansFont>
          </TouchableOpacity>
        </View>
        <SansFont style={styles.headerName}>{header}</SansFont>

        <View style={styles.usersContainer}>
          {users.map(user => (
            <View key={user.key} style={styles.userContainer}>
                <SansFont style={styles.userName}>{user.name}</SansFont>
              <Image source={{ uri: user.image }} style={styles.userImage} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.whiteContainer}>
        <SansFont style={styles.title}>Easy Date</SansFont>

        <FlatList
          style={styles.middlePart}
          data={thumbnails}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.navigateTo)}>
              <View style={styles.thumbnailContainer}>
                <Image source={item.image} style={styles.middleThumbnail} />
                <SansFont style={styles.thumbnailText}>{item.text}</SansFont>
              </View>
            </TouchableOpacity>
          )}
        />

        <SansFont style={styles.secondTitle}>Actions</SansFont>

        <Swiper showsPagination loop={false} paginationStyle={{ bottom: -5 }} style={{ marginTop: 30 }}>
          {buttonSets.map(set => (
            <View key={set.key} style={styles.actions}>
              <Image source={set.thumbnail} style={[styles.bottomThumbnail, { width: set.thumbnailWidth }]} />
              {set.showButtons && (
                <View style={styles.buttons}>
                  {set.buttons.map(button => (
                    <TouchableOpacity key={button} style={styles.button}><SansFont>{button}</SansFont></TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </Swiper>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // adjust this value based on your needs

  },

  topPart: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -70,
    marginBottom: 90,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonText: {
    marginLeft: 10,
    marginRight: 10,
  }, 
    
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  marginTop: 20,
  marginBottom: -100,
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: -3, // adjust this value based on your needs
  },
  userImage: {
    width: 80, // adjust this value based on your needs
    height: 80, // adjust this value based on your needs
    borderRadius: 50, // adjust this value based on your needs
  },
  userName: {
    marginBottom: 15, // adjust this value based on your needs

  },

  lilac: {
    height: 20,
    backgroundColor: '#DBD8E3', // Adjust the color to your need
    
  },
  whiteContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50, // Adjust this value
    borderTopRightRadius: 50, // Adjust this value
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 0, // Remove padding from the right side
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10, // Move the title a bit down

  },
  secondTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -40, // Move the second title a bit up
  },
  middlePart: {
    flex: 1,
    marginTop: 5, // Move thumbnails a bit down
  },
  thumbnailContainer: {
    width: 120,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end', // Change this
    overflow: 'hidden',
  },
  middleThumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  thumbnailText: {
    color: '#fff', // text color on the image
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  bottomThumbnail: {
    height: 190,
    borderRadius: 10,
  },

  
  bottomPart: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -25,
    
  },
  buttons: {
    flexDirection: 'column',
  justifyContent: 'space-between', // Add this
},

  button: {
    backgroundColor: '#FFFF',
    padding: 10,
    marginVertical: '7%',
    borderRadius: 10,
    width: 150,
    shadowColor: "#000",
  shadowOffset: {
    width: -1.9,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2,
  elevation: 4,
  marginRight: 20,
  alignItems: 'center',
  },
});
