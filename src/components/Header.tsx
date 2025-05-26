import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#e8f0e8',
        zIndex: 100,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
    },
});

export const Header = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { height: 80 + insets.top }]}>
            <Image
                source={require('../../assets/Nav.png')}
                style={[styles.image, { marginTop: insets.top }]}
            />
        </View>
    );
};