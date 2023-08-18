import React, { useState , useEffect} from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { getIdToken } from '../firebase.js';

export default function PreferencesScreen({ route, navigation }) {
    const { phoneNumber, name, idToken: routeIdToken, location, partnerPhoneNumber } = route.params;
    const [cuisine, setCuisine] = useState('');
    const [activity, setActivity] = useState('');
    const [preferences, setPreferences] = useState({
        cuisines: [],
        activities: []
    });
    const [idToken, setIdToken] = useState(routeIdToken);


    useEffect(() => {
        if (!idToken) {
            getIdToken()
                .then(token => {
                    setIdToken(token);
                    console.log('preferences' + token)
                })
                .catch(error => {
                    console.error('Error getting ID token:', error);
                });
        }
    }, []);

    const handleCuisineSubmission = () => {
        setPreferences(prev => ({
            ...prev,
            cuisines: [...prev.cuisines, cuisine]
        }));
        setCuisine(''); // Reset input field
    };

    const handleActivitySubmission = () => {
        setPreferences(prev => ({
            ...prev,
            activities: [...prev.activities, activity]
        }));
        setActivity(''); // Reset input field
    };

    const navigateToBirthdayScreen = () => {
        console.log(preferences);
        navigation.navigate('Birthday', {
            cuisines: preferences.cuisines,
            activities: preferences.activities,
            phoneNumber: phoneNumber,
                name: name,
                idToken: idToken,
                location: location,
                partnerPhoneNumber: `+${partnerPhoneNumber}` // Preceding '+' symbol
        });
    
    };

    return (
        <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
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
                <Text style={styles.subtitle}>Favorite Cuisines:</Text>
                {preferences.cuisines.map((item, index) => (
                    <Text key={index} style={styles.listItem}>{item}</Text>
                ))}

                <Text style={styles.subtitle}>Favorite Activities:</Text>
                {preferences.activities.map((item, index) => (
                    <Text key={index} style={styles.listItem}>{item}</Text>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={navigateToBirthdayScreen}>
                <SansFont style={styles.buttonText}>Proceed to Birthday</SansFont>
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
        marginTop: 10,
    },
    listItem: {
        fontSize: 15,
        color: '#fff',
        marginBottom: 5,
    },
});
