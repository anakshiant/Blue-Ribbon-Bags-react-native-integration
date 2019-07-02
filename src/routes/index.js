import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import { HomeScreen } from '../screens/HomeScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { AirlineScreen } from '../screens/AirlineScreen';
import { PassengerScreen } from '../screens/PassengerScreen';
import { SuccessScreen } from '../screens/SuccessScreen';

const Home = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    AirlineScreen: { screen: AirlineScreen },
    PassengerScreen: { screen: PassengerScreen },
    SuccessScreen: { screen: SuccessScreen }
}, { initialRouteName: 'HomeScreen', defaultNavigationOptions: { header: null } });


const RootStackNavigator = createSwitchNavigator({
    Home: { screen: Home },
    Splash: { screen: SplashScreen }
}, { initialRouteName: 'Splash', defaultNavigationOptions: { header: null } })

export default createAppContainer(RootStackNavigator);