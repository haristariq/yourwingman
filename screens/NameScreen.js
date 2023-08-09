import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { initializeUser, updateUser } from '../backend';
import { getIdToken, app } from '../firebase';


export default function NameScreen({ route, navigation }) {
    const { phoneNumber } = route.params;
    const [name, setName] = useState('');
    const [idToken, setIdToken] = useState(null);
  
    useEffect(() => {
        getIdToken().then(token => {
          console.log(token + ' nosir');
          setIdToken(token);
        }).catch(error => {
          console.error('Error getting ID token:', error);
        });
      }, []);
      
  
      const submitName = async () => {
        if (idToken) {
          const userData = { name, birthday: '', preferences: [], phone_number: phoneNumber, partner_number: '' };
          const newUser = await initializeUser(userData, idToken);
          if (newUser) {
            navigation.navigate('Main');
          } else {
            console.log('nosir');
          }
        }
      };
      
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
        <SansFont style={styles.title}>YourWingMan</SansFont>
        <SansFont style={styles.phone}>Please enter your name</SansFont>

        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={submitName}>
          <SansFont style={styles.buttonText}>Next</SansFont>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    top: '-2%',
    fontSize: 40,
    fontWeight: 'semibold',
    color: '#fff',
    marginBottom: 30,
  },
  phone: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'gray',
    fontSize: 18,
  },
});