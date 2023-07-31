import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import { app } from './firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';

export default function VerificationScreen({ route, navigation }) {
  const { verificationId } = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const confirmVerification = async () => {
    try {
      const auth = getAuth(app);
      await verificationId.confirm(verificationCode);
      console.log('Phone authentication successful 👍');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Verification code"
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
      />
      <Button title="Confirm Verification" onPress={confirmVerification} />
    </View>
  );
}