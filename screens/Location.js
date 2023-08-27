import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SansFont from '../SansFont';
import { Picker } from '@react-native-picker/picker';

import LogoImage from '../assets/images/White-Heart.png'; // Replace with your actual logo image path

export default function LocationScreen({ route, navigation }) {
    const { phoneNumber, name } = route.params;
    const [location, setLocation] = useState('');
    const [partnerPhoneNumber, setPartnerPhoneNumber] = useState('+1');
    const birthYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(birthYear);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    const navigateToNextScreen = () => {
        if (location) {
            navigation.navigate('Preferences', {
                phoneNumber: phoneNumber,
                name: name,
                location: location,
                partnerPhoneNumber: partnerPhoneNumber,
                birthday: new Date(selectedYear, selectedMonth - 1, selectedDay).toISOString().split('T')[0]
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#A833E1', '#EC32A3']} style={styles.container}>
                <Image source={LogoImage} style={styles.logo} />

                <SansFont style={styles.title}>Your Wingman</SansFont>
                <SansFont style={styles.subtitle}>Enter your location</SansFont>

                <TextInput
                    style={styles.input}
                    placeholder="City, State e.g Berkeley, CA"
                    value={location}
                    onChangeText={setLocation}
                />

                <SansFont style={styles.subtitle}>Select your birthdate</SansFont>

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

                <SansFont style={styles.subtitle}>Enter your Partner's phone number</SansFont>
                <TextInput
                    style={styles.input}
                    placeholder="+1 (650) 234-8080"
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
    logo: {
        width: '50%',
        height: 100,
        marginTop: '-10%'

    },
    title: {
        fontSize: 40,
        fontWeight: 'semibold',
        color: '#fff',
        marginBottom: '20%', // Adjusted margin
        
    },
    subtitle: {
        fontSize: 15,
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '85%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'white',
        width: '85%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
    },
    datePickerContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        width: '85%',
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        flex: 1,
        height: '100%',
    },
    buttonText: {
        color: 'gray',
        fontSize: 18,
    },
});
