import React from 'react';
import { PricingCard } from 'react-native-elements';
import { View } from 'react-native';



export const Product = ({ product, onSelection, color }) => {
    const { ProductName, ProductCode, ProductPrice, BagCoverage } = product;
    return (
        <React.Fragment>
            <PricingCard
                title={ProductName}
                price={ProductPrice}
                info={['1 Passenger', 'Bag coverage', `${BagCoverage}`]}
                button={{ title: 'BUY', icon: 'flight-takeoff' }}
                onButtonPress={() => onSelection(ProductCode)}
                color={color}
            />
        </React.Fragment>
    )
}