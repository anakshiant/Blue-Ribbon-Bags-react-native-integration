import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { ListItem, PricingCard } from 'react-native-elements';

import { Layout } from '../components/Layout';
import { Product } from '../components/Product';
import { Spinner } from '../components/Spinner';
import PurchaseContext from '../contexts/PurchaseContext';
import ThemeContext from '../contexts/ThemeContext';


export const SuccessScreen = ({ navigation }) => {

    const { purchase, purchasing, serviceNumber, price } = useContext(PurchaseContext);
    const { primary } = useContext(ThemeContext);


    useEffect(() => {
        purchase();
    });

    return (
        <Layout navigation={navigation}>
            <View>
                {purchasing && <Spinner color={primary} />}
                {!purchasing && <View>
                    <PricingCard
                        title="Purchase Successfull"
                        price={price}
                        info={["Service number", serviceNumber]}
                        button={{ title: "Back", icon: "home" }}
                        color={primary}
                        onButtonPress={() => navigation.navigate('HomeScreen')}
                    />
                </View>}
            </View>
        </Layout>
    );
}