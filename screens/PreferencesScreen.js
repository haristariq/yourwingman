import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont'; // Import your SansFont component
import { getIdToken } from '../firebase.js'; // Import your firebase functions
import { initializeUser } from '../backend'; // Import your backend functions

import LogoImage from '../assets/images/White-Heart.png'; // Replace with your actual logo image path

export default function PreferencesScreen({ route, navigation }) {
    const { phoneNumber, name, idToken: routeIdToken, location, partnerPhoneNumber, birthday } = route.params;
    const [cuisine, setCuisine] = useState('');
    const [activity, setActivity] = useState('');
    const [preferences, setPreferences] = useState({ cuisines: [], activities: [] });
    const [idToken, setIdToken] = useState(routeIdToken);

    useEffect(() => {
        if (!idToken) {
            getIdToken().then(token => {
                setIdToken(token);
            }).catch(error => {
                console.error('Error getting ID token:', error);
            });
        }
    }, []);

    const handleCuisineSubmission = () => {
        setPreferences(prev => ({
            ...prev,
            cuisines: [...prev.cuisines, cuisine]
        }));
        setCuisine('');
    };

    const handleActivitySubmission = () => {
        setPreferences(prev => ({
            ...prev,
            activities: [...prev.activities, activity]
        }));
        setActivity('');
    };

    const initializeUserWithDetails = async () => {
        const userData = {
            name: name,
            birthday: birthday,
            preferences: preferences,
            phone_number: phoneNumber,
            partner_number: partnerPhoneNumber,
            location: location,
        };

        try {
            const response = await initializeUser(userData, idToken);
            navigation.navigate('Main');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                        <Image source={LogoImage} style={styles.logo} />

            <SansFont style={styles.title}>Preference Center</SansFont>

            <SansFont style={styles.subtitle}>Enter your favorite cuisines</SansFont>
            <TextInput
                style={styles.input}
                placeholder="e.g. Italian, Chinese"
                value={cuisine}
                onChangeText={setCuisine}
            />
            <TouchableOpacity style={styles.button} onPress={handleCuisineSubmission}>
                <SansFont style={styles.buttonText}>Add Cuisine</SansFont>
            </TouchableOpacity>

            <SansFont style={styles.subtitle}>Enter activities you like</SansFont>
            <TextInput
                style={styles.input}
                placeholder="e.g. Hiking, Reading"
                value={activity}
                onChangeText={setActivity}
            />
            <TouchableOpacity style={styles.button} onPress={handleActivitySubmission}>
                <SansFont style={styles.buttonText}>Add Activity</SansFont>
            </TouchableOpacity>

            <View style={styles.preferenceList}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {preferences.cuisines.map((item, index) => (
                        <Text key={index} style={styles.listItem}>{item}</Text>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {preferences.activities.map((item, index) => (
                        <Text key={index} style={styles.listItem}>{item}</Text>
                    ))}
                </View>
            </View>


            <TouchableOpacity style={styles.button} onPress={initializeUserWithDetails}>
                <SansFont style={styles.buttonText}>Done</SansFont>
            </TouchableOpacity>
        </LinearGradient>
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
        marginTop: '-35%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'semibold',
        color: '#fff',
        marginBottom: 20,
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
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'gray',
        fontSize: 18,
    },
    preferenceList: {
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10
    },
    listItem: {
        fontSize: 15,
        color: '#fff',
        marginBottom: 5,
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
});