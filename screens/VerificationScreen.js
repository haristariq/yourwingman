import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { app } from '../firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

export default function VerificationScreen({ route, navigation }) {
  const { verificationId } = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const confirmVerification = async () => {
    try {
      const auth = getAuth(app);
      await verificationId.confirm(verificationCode);
      console.log('Phone authentication successful 👍');
  
      // Reset the navigation stack after successful authentication
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Please enter the code sent to your phone"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={confirmVerification}>
        <Text style={styles.buttonText}>Confirm Verification</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'gray',
  },
});