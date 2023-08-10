import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../firebase';
import { updateUser } from '../backend'; // Import the updateUser function
import SansFont from '../SansFont';
import { getIdToken } from '../firebase';
import { useUserData } from '../UserContext';


export default function SettingsScreen() {
  
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const { userData, setUserData } = useUserData();


  useEffect(() => {
    getIdToken().then(token => {
      console.log('Settingsnosir');
      setIdToken(token);
    }).catch(error => {
      console.error('Error getting ID token:', error);
    });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Logout Error', 'There was an error logging out. Please try again.');
    }
  };

  const handleSave = async () => {
    console.log(username);
    if (username) {
      // Step 1: Fetch and modify existing user data
      let updatedUserInfo = { ...userData, name: username };
  
      // Step 2: Update UserDataContext
      setUserData(updatedUserInfo);
      
      try {
        // Step 3: Update the user info using the backend function
        await updateUser(updatedUserInfo, idToken);
        Alert.alert('Success', 'Username updated successfully.');
        setModalVisible(false);
      } catch (error) {
        Alert.alert('Error', 'There was an error updating the username. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter a username.');
    }
  };
  

  return (
    <View style={styles.container}>
      <SansFont style={styles.header}>Settings</SansFont>
      <Button title="Change Username" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Enter new username"
              style={styles.input}
              placeholderTextColor="rgba(121, 181, 227, 0.8)"
              fontFamily="DM Sans Bold"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'transparent',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#DBD8E3',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#EC32A3', // Text color
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#DBD8E3',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
