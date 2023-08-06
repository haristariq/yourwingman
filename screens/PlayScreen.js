import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import SansFont from '../SansFont';

const PlayScreen = () => {

    const handlePress = (gameName) => {
        console.log(`${gameName} clicked`);
        // Perform your action here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SansFont style={styles.heading}>Let's Play</SansFont>
                <Image style={styles.mainIcon} source={require('../assets/games.png')} />
            </View>
            <View style={styles.imageContainer}>
                <View style={styles.gamePair}>
                    <View style={styles.gameWrapper}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handlePress('Play Time')}>
                            <View style={styles.circle}/>
                            <Image style={styles.gameIcon} source={require('../assets/devil-heart.png')} />
                        </TouchableOpacity>
                        <SansFont style={styles.gameName}>Play Time</SansFont>
                    </View>
                    <View style={styles.gameWrapper}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handlePress('Partner Quiz')}>
                            <View style={styles.circle}/>
                            <Image style={styles.gameIcon} source={require('../assets/young-couple-discuss-together.png')} />
                        </TouchableOpacity>
                        <SansFont style={styles.gameName}>Partner Quiz</SansFont>
                    </View>
                </View>
                <View style={styles.gamePair}>
                    <View style={styles.gameWrapper}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handlePress('Wordle')}>
                            <View style={styles.circle}/>
                            <Image style={styles.gameIcon} source={require('../assets/alphabet-board-game.png')} />
                        </TouchableOpacity>
                        <SansFont style={styles.gameName}>Wordle</SansFont>
                    </View>
                    <View style={styles.gameWrapper}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => handlePress('Coming Soon')}>
                            <View style={styles.circle}/>
                            <Image style={styles.gameIcon} source={require('../assets/ping-pong.png')} />
                        </TouchableOpacity>
                        <SansFont style={styles.gameName}>Coming Soon</SansFont>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 150,
    },
    heading: {
        fontSize: 34,
        marginRight: 10,
    },
    mainIcon: {
        width: 50,
        height: 50,
    },
    gameIcon: {
        width: 85,
        height: 85,
        zIndex: 1,
    },
    gameName: {
        textAlign: 'center',
        marginTop: '25%',
        fontSize: 17,
    },
    imageContainer: {
        justifyContent: 'space-between',
        width: '80%',
        height: '40%',
    },
    gamePair: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: -50,
    },
    gameWrapper: {
        alignItems: 'center',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        zIndex: 0,
    },
});

export default PlayScreen;