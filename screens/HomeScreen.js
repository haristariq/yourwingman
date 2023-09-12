import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { getIdToken, logout } from '../firebase';
import Swiper from 'react-native-swiper';
import notificationPurple from '../assets/images/notificationPurple.png';
import wingmanChat from '../assets/images/wingmanChat.png';
import FeatureSoon from '../assets/images/FeatureSoon.png';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PlacesToGo from './PlacesToGo';
import SpicyTime from './SpicyTime';
import HeartScreen from './HeartScreen';
import { getUser, getUserPhoto } from '../backend';
import { useUserData } from '../UserContext';
import { getRestaurantRecommendations } from '../backend';
import LottieView from 'lottie-react-native';
import { uploadUserPhoto, checkUserExists } from '../backend';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


import places from '../assets/images/places.jpg';
import food from '../assets/images/food.png';
import heart from '../assets/images/heart.jpg';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

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
  const [loading, setLoading] = useState(true);
  const [photoData, setPhotoData] = useState({ imageUrl: null }); // Initialize photoData
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [partnerExists, setPartnerExists] = useState(false);


  const header = "Explore";

  const [userData, setUserData] = useState('');
  const [idToken, setIdToken] = useState(null);
  const { setRestaurants } = useUserData();

  const [image, setImage] = useState(null);

  const handleUploadPhoto = async () => {
    if (!idToken) {
      console.error('ID token is not available.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {

      setImage(result.uri);
      setPhotoUploaded(true);
      try {
        await AsyncStorage.setItem('photoUploaded', 'true'); // Store the state as a string
      } catch (error) {
        console.error('Error storing photoUploaded state in AsyncStorage:', error);
      }

      try {
        const uploadResponse = await uploadUserPhoto(result.uri, idToken);
        if (uploadResponse && uploadResponse.imageUrl) {
          setUserData(prevData => ({ ...prevData, profilePhotoUrl: uploadResponse.imageUrl }));
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  };

  useEffect(() => {
    // When the component mounts, check AsyncStorage for the previous state
    const checkPhotoUploadedState = async () => {
      try {
        const storedPhotoUploaded = await AsyncStorage.getItem('photoUploaded');
        if (storedPhotoUploaded) {
          setPhotoUploaded(storedPhotoUploaded === 'true'); // Convert the stored value to a boolean
        }
      } catch (error) {
        console.error('Error reading photoUploaded state from AsyncStorage:', error);
      }
    };
  
    checkPhotoUploadedState();
  }, []);

  useEffect(() => {
    async function checkAndFetchData() {
      const token = await getIdToken();
      const userExists = await checkUserExists(token);

      if (!userExists) {
          logout();
          navigation.navigate('Login');
          return;
      }

      setIdToken(token);

      const user = await getUser(token);

      const fetchedPhotoData = await getUserPhoto(token); // Fetch photo data here
      setPhotoData(fetchedPhotoData);
      console.log('photo data displayed', fetchedPhotoData);

      setUserData(user);
      const restaurants = await getRestaurantRecommendations(user, token);
      setRestaurants(restaurants);

      setLoading(false);
    }
    checkAndFetchData();
  }, []);

  const thumbnails = [
    { key: '1', text: 'Food Spots', navigateTo: 'HeartScreen', image: food },
    { key: '3', text: 'Spicy Time', navigateTo: 'SpicyTime', image: heart },
    { key: '2', text: 'Places to Go', navigateTo: 'PlacesToGo', image: places },
  ];

  const buttonSets = [
    { key: '1', thumbnail: notificationPurple, thumbnailWidth: '40%', buttons: ['I love you', "I'm sad", "I'm horny"], showButtons: true },
    { key: '2', thumbnail: wingmanChat, thumbnailWidth: '100%', showButtons: false, navigateTo: 'Chat' },
    { key: '3', thumbnail: FeatureSoon, thumbnailWidth: '100%', showButtons: false },
  ];

  const userName = userData ? userData.name : '';
  const locationed = userData ? userData.location : '';
  console.log('photo beinh displayed');

  if (photoUploaded) {
    console.log('photo true');

  } else {
    console.log('photo falsr');

  }

  const users = [
    {
      key: '1',
      name: userName,
      image: photoUploaded
        ? photoData.imageUrl
        : 'https://firebasestorage.googleapis.com/v0/b/yourwingman.appspot.com/o/Add-Button-PNG-Isolated-File.png?alt=media&token=b8b65f41-f0f0-44d7-80f0-4f6442fdb7b4',
    },
    { key: '2', name: 'Partner', image: 'https://firebasestorage.googleapis.com/v0/b/yourwingman.appspot.com/o/AmercianHeartMonth-1-300x300.jpg?alt=media&token=8d8b2e04-c203-48d5-bac0-4cd18e84e270' },
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
    <TouchableOpacity onPress={() => { }}>
      <SansFont style={styles.buttonText}>{locationed}</SansFont>
    </TouchableOpacity>
  </View>
  <SansFont style={styles.headerName}>{header}</SansFont>

  <View style={styles.usersContainer}>
    {users.map(user => (
      <View key={user.key} style={styles.userContainer}>
                <SansFont style={styles.userName}>{user.name}</SansFont>

        <TouchableOpacity
          onPress={() => {
            if (user.key === '1' && !photoUploaded) {
              handleUploadPhoto();
            }
          }}
          style={styles.userImageContainer}
          disabled={user.key !== '1' || !!photoUploaded}
        >
          <Image source={{ uri: user.image }} style={styles.userImage} />
        </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => (item.key !== '2' ? navigation.navigate(item.navigateTo) : null)}
          >
            <View style={styles.thumbnailContainer}>
              <Image source={item.image} style={styles.middleThumbnail} />
              {item.key === '1' && loading && (
                <View style={styles.lottieContainer}>
                  <LottieView
                    source={require('../assets/loading3.json')}
                    autoPlay
                    loop
                    style={styles.lottieStyle}
                  />
                </View>
              )}
              {item.key === '2' && (
                <View style={styles.comingSoonOverlay}>
                  <View style={styles.comingSoonBackground}>
                    <SansFont style={styles.comingSoonText}>Coming Soon</SansFont>
                  </View>
                </View>
              )}
              <SansFont style={styles.thumbnailText}>{item.text}</SansFont>
            </View>
          </TouchableOpacity>
        )}
      />

      <SansFont style={styles.secondTitle}>Actions</SansFont>

      <Swiper showsPagination loop={false} paginationStyle={{ bottom: -5 }} style={{ marginTop: 30 }}>
        {buttonSets.map(set => (
          <TouchableOpacity
            key={set.key}
            onPress={() => set.navigateTo && navigation.navigate(set.navigateTo)}
            activeOpacity={set.navigateTo ? 0.7 : 1}
          >
            <View style={styles.actions}>
              <Image source={set.thumbnail} style={[styles.bottomThumbnail, { width: set.thumbnailWidth }]} />
              {set.showButtons && (
                <View style={styles.buttons}>
                  {set.buttons.map(button => (
                    <TouchableOpacity key={button} style={styles.button}><SansFont>{button}</SansFont></TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  </LinearGradient>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
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
    marginHorizontal: -3,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  userName: {
    marginBottom: 15,
  },
  lilac: {
    height: 20,
    backgroundColor: '#DBD8E3',
  },
  whiteContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 10,
  },
  secondTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -40,
  },
  middlePart: {
    flex: 1,
    marginTop: 5,
  },
  thumbnailContainer: {
    width: 120,
    height: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  middleThumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  thumbnailText: {
    color: '#fff',
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
    justifyContent: 'space-between',
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
  lottieContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  lottieStyle: {
    width: '97%',
    height: '97%',
  },
  comingSoonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
