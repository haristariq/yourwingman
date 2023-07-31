import React, { useState, useRef } from 'react';
import { TextInput, Button, View } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { app } from './firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

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
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber} // Bind phoneNumber state here
        onChangeText={text => setPhoneNumber(`+${text.replace(/\D/g, '')}`)} // Remove all non-numeric characters and prepend '+'
        keyboardType="phone-pad"
        autoCompleteType="tel"
      />
      <Button title="Next" onPress={sendVerification} />
    </View>
  );
}