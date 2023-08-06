import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SansFont = (props) => {
    return <Text style={{...styles.defaultText, ...props.style}}>{props.children}</Text>
};

const styles = StyleSheet.create({
    defaultText: {
        fontFamily: 'DM Sans Bold',
    },
});

export default SansFont;