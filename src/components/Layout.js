import React, { useContext, useEffect } from 'react';
import { StatusBar, View, Image } from 'react-native';
import { Header } from 'react-native-elements';


import ThemeContext from '../contexts/ThemeContext';

export const Layout = ({ navigation, children }) => {
    const { primary } = useContext(ThemeContext);

    useEffect(() => {
        StatusBar.setBackgroundColor(primary);
        StatusBar.setBarStyle('light-content');
    }, []);

    return (
        <View>
            <Header  centerComponent={<Image source={require('../assets/splashicon.png')} style={{ height: 45, width: 85, marginBottom: 10 }} />} />
            {children}
        </View>
    );
}


