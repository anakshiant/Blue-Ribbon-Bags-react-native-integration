import React, { useEffect, useContext } from 'react';
import { View, Image, StatusBar } from 'react-native';


export const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        StatusBar.setBackgroundColor('white');
        StatusBar.setBarStyle('dark-content');
        setTimeout(() => {
            navigation.navigate('Home');
        }, 1000);
    });

    return (
        <View style={boxContainer}>
            <Image source={require('../assets/splashicon.png')} />
        </View>
    );
}


const boxContainer = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}

