import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { Layout } from '../components/Layout';
import { Product } from '../components/Product';
import { Spinner } from '../components/Spinner';
import PurchaseContext from '../contexts/PurchaseContext';
import ThemeContext from '../contexts/ThemeContext';


export const AirlineScreen = ({ navigation }) => {

    const { fetchAirlines, airlineState, setAirlineId, airlineId } = useContext(PurchaseContext);
    const { primary } = useContext(ThemeContext);

    useEffect(() => {
        fetchAirlines();
    }, []);

    const airlineSelectHandler = (id) => {
        setAirlineId(id);
        navigation.navigate('PassengerScreen');
    }

    return (
        <Layout navigation={navigation}>
            {airlineState.fetching && <Spinner color={primary} />}

            {!airlineState.fetching && !airlineState.error && <ScrollView style={{ marginBottom: 60 }}>
                <FlatList
                    data={airlineState.airlines}
                    extraData={airlineId}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                key={item.AirlineId}
                                title={item.AirlineName}
                                onPress={() => airlineSelectHandler(item.AirlineId)}
                                leftIcon={{ name: 'flight-takeoff' }}
                            />
                        );
                    }}
                />
            </ScrollView>}

        </Layout>
    );
}