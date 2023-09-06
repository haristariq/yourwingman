import React, { useState, useRef } from 'react';
import {KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from '../firebase-recaptcha/modal';
import { app } from '../firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { useUserData } from '../UserContext';


export default function LoginScreen({ navigation }) {
  const { setConfirmationResult } = useUserData();
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
  const confirmationResult = await signInWithPhoneNumber(
    auth, 
    phoneNumber,
    recaptchaVerifier.current
  );

  setConfirmationResult(confirmationResult); // Set confirmation result

  navigation.navigate('Verify', { 
    isConfirmationPending: true, 
    phoneNumber: phoneNumber 
  });
    
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
        <Image style={styles.logo} source={require('../assets/images/White-Heart.png')} />
        <SansFont style={styles.title}>YourWingman</SansFont>
        <Image style={styles.image} source={require('../assets/images/landingpager.png')} />
        <SansFont style={styles.relationship}>Your new relationship wingman</SansFont>
        <SansFont style={styles.welcome}>Welcome</SansFont>
        <SansFont style={styles.phone}>Let’s get your phone number first</SansFont>

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
  logo: {
    top: '-5%',
    width: '50%',
    height: '15%',
    resizeMode: 'contain',
    marginBottom: '-10%',
    alignSelf: 'center',
  },
  title: {
    top: '-2%',
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
    marginTop: '5%'
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