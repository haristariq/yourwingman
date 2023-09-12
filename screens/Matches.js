import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SansFont from '../SansFont';
import { getFavoriteRestaurants, getRestaurantMatches } from '../backend'; // Adjust the import path accordingly
import { getIdToken } from '../firebase'; // Import getIdToken for fetching the token

const Matches = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const [matchRestaurants, setMatchRestaurants] = useState([]);

  const filteredMatches = matches.filter(
    match => !matchRestaurants.some(m => m.place_id === match.place_id)
  );

  useEffect(() => {
    // Fetch the favorite restaurants
    const fetchFavorites = async () => {
      const token = await getIdToken();  // Fetch the Firebase token
      const favoriteRestaurants = await getFavoriteRestaurants(token);
      setMatches(favoriteRestaurants);
    };

    fetchFavorites();
  
  const fetchMatches = async () => {
    const token = await getIdToken();
    const matchingRestaurants = await getRestaurantMatches(token);
    setMatchRestaurants(matchingRestaurants);
  };

  fetchMatches();

  }, []);

  return (
    <View style={styles.container}>



      <View style={styles.header}>
        <Icon.Button name="close" backgroundColor="white" color="black" size={30} onPress={() => navigation.goBack()} />
        <SansFont style={styles.headerText}>Your Matches</SansFont>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {matchRestaurants.map(match => (
    <TouchableOpacity key={match.place_id} onPress={() => navigation.navigate('RestaurantDetail', { restaurant: match })} style={styles.matchContainer}>
      <Image source={{ uri: match.photoUrl }} style={styles.matchImage} />
      <SansFont style={styles.nameInsideMatch}>{match.name}</SansFont>
    </TouchableOpacity>
  ))}
</ScrollView>


<SansFont style={styles.middleText}>  Your Likes</SansFont>

      <ScrollView>
        {filteredMatches.map(like => (
          <TouchableOpacity key={like.place_id} onPress={() => navigation.navigate('RestaurantDetail', { restaurant: like })}>
            <View style={styles.card}>
              <Image 
                  source={{uri: like.photoUrl}}
                  style={styles.image}
              />
              <SansFont style={styles.nameInsideImage}>{like.name}</SansFont>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;


const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  matchContainer: {
    width: height * 0.15,
    height: height * 0.15,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  matchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
  headerText: {
    fontSize: 30,
    marginTop: 5,
  },
  middleText: {
    fontSize: 30,
    marginTop: 5,
  },
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: width * 0.95,
    height: 150,
    borderRadius: 20,
  },
  nameInsideImage: {
    position: 'absolute',
    bottom: 10, // moves the text to the bottom
    left: 10, // keeps the text at the left
    color: 'white',
    fontSize: 24,
  },

  nameInsideMatch: {
    position: 'absolute',
    bottom: 10, // moves the text to the bottom
    left: 10, // keeps the text at the left
    color: 'white',
    fontSize: 18,
  }
});

export default Matches;