import React, { useContext, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';

import { Layout } from '../components/Layout';
import { Product } from '../components/Product';
import { Spinner } from '../components/Spinner';
import PurchaseContext from '../contexts/PurchaseContext';
import ThemeContext from '../contexts/ThemeContext';



export const HomeScreen = ({ navigation }) => {
    const { fetchProducts, productState,setProductCode } = useContext(PurchaseContext);
    const { primary } = useContext(ThemeContext);
    useEffect(() => {
        fetchProducts();
    }, []);

    const productSelectionHandler = (productCode) => {
        setProductCode(productCode);
        navigation.navigate('AirlineScreen');
    }

    return (
        <Layout navigation={navigation}>
            {productState.fetching && <Spinner color={primary} />}

            {!productState.fetching && !productState.error && <ScrollView style={{ marginBottom: 60 }}>
                {productState.products.map(product => {
                    return (<Product product={product} onSelection={productSelectionHandler} color={primary} key={product.ProductCode} />);
                })}
            </ScrollView>}

        </Layout>
    );
}

