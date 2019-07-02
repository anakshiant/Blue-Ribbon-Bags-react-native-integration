import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { ListItem, Input, Badge, Button, Divider } from 'react-native-elements';

import { Layout } from '../components/Layout';
import { Product } from '../components/Product';
import { Spinner } from '../components/Spinner';
import PurchaseContext from '../contexts/PurchaseContext';
import ThemeContext from '../contexts/ThemeContext';


const PassengerForm = ({ onFinal }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();

    const { primary } = useContext(ThemeContext);
    const addPassenger = () => {
        onFinal({ firstName, lastName, email });
        setFirstName("");
        setLastName("");
        setEmail("");
    }
    const disabled = !firstName || !lastName || !email;

    return (
        <View style={{ paddingBottom: 70 }} >
            <Input
                placeholder="First Name"
                onChangeText={(text) => { setFirstName(text) }}
                value={firstName}
                style={{ marginTop: 30, padding: 60 }}
            />
            <Input
                placeholder="Last Name"
                onChangeText={(text) => setLastName(text)}
                value={lastName}
                style={{ marginTop: 30, padding: 60 }}
            />
            <Input
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={{ marginTop: 30, padding: 60 }}
            />
            <Button disabled={disabled} title="Add" style={{ marginTop: 50 }} buttonStyle={{ backgroundColor: primary }} onPress={addPassenger} />
        </View>
    );
}

export const PassengerScreen = ({ navigation }) => {
    const { pnr, setPnr, passengerState, addPassenger, purchase } = useContext(PurchaseContext);
    const { primary } = useContext(ThemeContext);
    
    const purchaseHandler = ()=>{
        navigation.navigate('SuccessScreen');
    }
    
    return (
        <Layout navigation={navigation}>
            <View style={{ padding: 30 }} >
                <Text>PNR</Text>
                <Input placeholder={"PNR"} onChangeText={(text) => setPnr(text)} />
                <Divider style={{ backgroundColor: primary }} />
                <View style={{ marginTop: 70 }}>
                    <PassengerForm onFinal={(passenger) => { addPassenger(passenger) }} />
                    <Button onPress={purchaseHandler} title={"Purchase"} disabled={passengerState.length == 0} style={{ backgroundColor: primary }} />
                </View>
                {passengerState && passengerState.length > 0 && <ScrollView>
                    <FlatList
                        data={passengerState}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <ListItem
                            key={index}
                            title={item.firstName}
                            subtitle={item.email}
                            leftIcon={{ name: 'flight-takeoff' }}
                        />}
                    />
                </ScrollView>}
            </View>
        </Layout>
    );
}