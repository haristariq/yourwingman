import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { initializeUser } from '../backend';

export default function BirthdateScreen({ route, navigation }) {
    const { phoneNumber, name, idToken , location, partnerPhoneNumber} = route.params;

    const [birthdate, setBirthdate] = useState(new Date());

    const initializeUserWithDetails = async () => {
        const userData = {
            name: name,
            birthday: birthdate.toISOString().split('T')[0], // Convert to ISO date string
            phone_number: phoneNumber,
            preferences: [],
            partner_number: partnerPhoneNumber, 
            location: location
        };

        try {
            const response = await initializeUser(userData, idToken);
            navigation.navigate('Main');
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                <SansFont style={styles.title}>YourWingMan</SansFont>
                <SansFont style={styles.phone}>Please select your birthdate</SansFont>

                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                        value={birthdate}
                        mode={'date'}
                        display='default'
                        style={styles.datePicker} // Add this style
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setBirthdate(selectedDate);
                            }
                        }}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={initializeUserWithDetails}>
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
    datePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    datePicker: {
        width: '100%',
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
