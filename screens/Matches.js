import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SansFont from '../SansFont';
import { getFavoriteRestaurants } from '../backend'; // Adjust the import path accordingly
import { getIdToken } from '../firebase'; // Import getIdToken for fetching the token

const Matches = () => {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch the favorite restaurants
    const fetchFavorites = async () => {
      const token = await getIdToken();  // Fetch the Firebase token
      const favoriteRestaurants = await getFavoriteRestaurants(token);
      setMatches(favoriteRestaurants);
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon.Button name="close" backgroundColor="white" color="black" size={30} onPress={() => navigation.goBack()} />
        <SansFont style={styles.headerText}>Your Matches</SansFont>
      </View>
      <ScrollView>
      {matches.map(match => (
    <View key={match.place_id} style={styles.card}>
        <Image 
            source={{uri: match.photoUrl}}
            style={styles.image}
        />
        <SansFont style={styles.nameInsideImage}>{match.name}</SansFont>
    </View>
))}

      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;
const imageHeight = 150;

const styles = StyleSheet.create({
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
  card: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: width * 0.9,
    height: 150,
    borderRadius: 20,
  },
  nameInsideImage: {
    position: 'absolute',
    bottom: 10, // moves the text to the bottom
    left: 10, // keeps the text at the left
    color: 'white',
    fontSize: 24,
  }
});

export default Matches;