import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { initializeUser } from '../backend';
import { Picker } from '@react-native-picker/picker'; // Import Picker component

export default function BirthdateScreen({ route, navigation }) {
    const { phoneNumber, name, idToken, location, partnerPhoneNumber, preferences } = route.params;

    const birthYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(birthYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    const initializeUserWithDetails = async () => {
        const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);

        const userData = {
            name: name,
            birthday: selectedDate.toISOString().split('T')[0], // Convert to ISO date string
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                <SansFont style={styles.title}>YourWingMan</SansFont>
                <SansFont style={styles.phone}>Please select your birthdate</SansFont>

                <View style={styles.datePickerContainer}>
                    <Picker
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                        style={styles.picker}
                    >
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Picker.Item key={index} label={(index + 1).toString()} value={index + 1} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={selectedDay}
                        onValueChange={(itemValue) => setSelectedDay(itemValue)}
                        style={styles.picker}
                    >
                        {Array.from({ length: 31 }).map((_, index) => (
                            <Picker.Item key={index} label={(index + 1).toString()} value={index + 1} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={selectedYear}
                        onValueChange={(itemValue) => setSelectedYear(itemValue)}
                        style={styles.picker}
                    >
                        {Array.from({ length: 100 }).map((_, index) => (
                            <Picker.Item
                                key={index}
                                label={(birthYear - index).toString()}
                                value={birthYear - index}
                            />
                        ))}
                    </Picker>
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
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    picker: {
        flex: 1,
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
