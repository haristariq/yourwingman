import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../firebase';  // Import the logout function
import Swiper from 'react-native-swiper';
import thumbnail1 from '../assets/images/thumbnail.png';
import action2 from '../assets/images/compatibility-quiz.png';
import thumbnail3 from '../assets/images/thumbnail.png';

export default function HomeScreen({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <Text style={{ marginRight: 10 }}>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {/* Code to select location */}}>
          <Text style={{ marginLeft: 10 }}>Select Location</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const user = "John Doe"; // Replace this with your actual user data
  const placeholderImage = "https://via.placeholder.com/100"; // Placeholder image URL

  const thumbnails = [
    { key: '1', text: 'Food Spots', navigateTo: 'FoodSpots' },
    { key: '2', text: 'Places to Go', navigateTo: 'PlacesToGo' },
    { key: '3', text: 'Spicy Time', navigateTo: 'SpicyTime' },
  ];

  const buttonSets = [
    { key: '1', thumbnail: thumbnail1 , thumbnailWidth: 100, buttons: ['Button 1', 'Button 2', 'Button 3'], showButtons: true },
    { key: '2', thumbnail: thumbnail1 , thumbnailWidth: 150, showButtons: false },
    { key: '3', thumbnail: action2, thumbnailWidth: 150, showButtons: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.userName}>{user}</Text>
        <View style={styles.lilac} />
      </View>

      <View style={styles.whiteContainer}>
        <Text style={styles.title}>Easy Date</Text>

        <FlatList
          style={styles.middlePart}
          data={thumbnails}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.navigateTo)}>
              <Image source={{ uri: placeholderImage }} style={styles.thumbnail} />
              <Text style={styles.thumbnailText}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.title}>Actions</Text>

        <Swiper showsPagination loop={false}>
  {buttonSets.map(set => (
    <View key={set.key} style={styles.actions}>
      <Image source={set.thumbnail} style={[styles.thumbnail, { width: set.thumbnailWidth }]} />
      {set.showButtons && (
        <View style={styles.buttons}>
          {set.buttons.map(button => (
            <TouchableOpacity key={button} style={styles.button}><Text>{button}</Text></TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  ))}
</Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e1c4ff',
  },
  topPart: {
    flex: 1,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  lilac: {
    height: 20,
    backgroundColor: '#DBD8E3', // Adjust the color to your need
  },
  whiteContainer: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  middlePart: {
    flex: 1,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginHorizontal: 10, // Adjust this value to increase or decrease the gap
  },
  thumbnailText: {
    textAlign: 'center',
  },
  bottomPart: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#DBD8E3',
    padding: 10,
    marginVertical: 5,
  },
});