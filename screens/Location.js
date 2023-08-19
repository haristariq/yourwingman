import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';

export default function LocationScreen({ route, navigation }) {
    const { phoneNumber, name} = route.params;
    const [location, setLocation] = useState('');
    const [partnerPhoneNumber, setPartnerPhoneNumber] = useState('');

    

    const navigateToNextScreen = () => {
        if (location) {
            navigation.navigate('Preferences', {
                phoneNumber: phoneNumber,
                name: name,
                location: location,
                partnerPhoneNumber: `+${partnerPhoneNumber}` // Preceding '+' symbol
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                <SansFont style={styles.title}>YourWingMan</SansFont>
                <SansFont style={styles.subtitle}>Please enter your location</SansFont>

                <TextInput
                    style={styles.input}
                    placeholder="Your location"
                    value={location}
                    onChangeText={setLocation}
                />

                <SansFont style={styles.subtitle}>Please enter your Partner's phone number</SansFont>
                <TextInput
                    style={styles.input}
                    placeholder="+1(650)-234-8080"
                    value={partnerPhoneNumber}
                    onChangeText={setPartnerPhoneNumber}
                />

                <TouchableOpacity style={styles.button} onPress={navigateToNextScreen}>
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
    subtitle: {
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