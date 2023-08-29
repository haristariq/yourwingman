import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native'; // Import Image
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { getIdToken } from '../firebase';

// Import your logo image
import LogoImage from '../assets/images/White-Heart.png';

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

    const navigateToBirthdateScreen = () => {
        if (name && idToken) {
            navigation.navigate('Location', {
                phoneNumber: phoneNumber,
                name: name,
                idToken: idToken
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                {/* Logo */}
                <Image source={LogoImage} style={styles.logo} />

                {/* Adjusted title positioning */}
                <SansFont style={styles.title}>YourWingman</SansFont>

                <SansFont style={styles.phone}>What's your name?</SansFont>

                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.button} onPress={navigateToBirthdateScreen}>
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
        width: '50%',
        height: 100,
        marginTop: '-70%'

    },
    title: {
        fontSize: 40,
        fontWeight: 'semibold',
        color: '#fff',
        marginBottom: '30%', // Adjusted margin
        
    },
    phone: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 30,
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