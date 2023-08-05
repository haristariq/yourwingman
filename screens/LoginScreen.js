import React, { useState, useRef } from 'react';
import {KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { app } from '../firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    console.log('sendVerification called');
    if (!phoneNumber.startsWith('+')) {
      console.log('Phone number must start with "+" and include the country code.');
      return;
    }
    try {
      const auth = getAuth(app);
      const verificationId = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current
      );
      console.log('Verification ID:', verificationId);
      navigation.navigate('Verify', { verificationId });
    } catch (err) {
      console.log('Error in sendVerification:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
        />
        <Image style={styles.logo} source={require('../assets/images/batman.png')} />
        <Text style={styles.title}>YourWingMan</Text>
        <Image style={styles.image} source={require('../assets/images/kissing-cups.png')} />
        <Text style={styles.relationship}>Your new relationship wingman!</Text>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.phone}>Please enter your phone number to start</Text>

        <TextInput
  style={styles.input}
  placeholder="+1(650) 5555-3434"
  value={phoneNumber} // Bind phoneNumber state here
  onChangeText={text => setPhoneNumber(`+${text.replace(/\D/g, '')}`)} // Remove all non-numeric characters and prepend '+'
  keyboardType="numeric"
  returnKeyType="done" // Add this line
  autoCompleteType="tel"
/>
        <TouchableOpacity style={styles.button} onPress={sendVerification}>
          <Text style={styles.buttonText}>Next</Text>
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
  logo: {
    top: '-5%',
    width: '50%',
    height: '15%',
    resizeMode: 'contain',
    marginBottom: '-10%',
    alignSelf: 'center',
  },
  title: {
    top: '-5%',
    fontSize: 40,
    fontWeight: 'semibold',
    color: '#fff',
    marginBottom: 30,
  },
  image: {
    top: '-7%',
    width: '75%',
    height: '30%',
    resizeMode: 'contain',
    marginBottom: '-15%',
  },
  relationship: {
    fontSize: 28,
    color: '#fff',
    width: '80%',
    marginBottom: '15%',
    textAlign: 'center',
  },
  welcome: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
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
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20, // Optional, for rounded button
    marginBottom: 20, // Optional, for space after the button
  },
  buttonText: {
    color: 'gray',
    fontSize: 18,
  },
});