import React from 'react';
import { PricingCard } from 'react-native-elements';
import { View, ActivityIndicator } from 'react-native';

export const Spinner = ({ color }) => {
    return (
        <ActivityIndicator size="large" color={color} />
    );
}