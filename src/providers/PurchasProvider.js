import React, { useContext, useReducer, useState } from 'react';

import PurchaseContext from '../contexts/PurchaseContext';
import { getProductList, getAirlineList } from '../services/data';
import { purchaseService } from '../services/service';

const productReducer = (state, action) => {
    switch (action.type) {
        case actionType.PRODUCT_FETCHING:
            return { ...state, fetching: true }
        case actionType.PRODUCT_FETCHED:
            return { ...state, products: action.payload, fetching: false }
        case actionType.PRODUCT_FETCH_ERROR:
            return { ...state, error: true }
        default:
            return state;
    }
}

const airlineReducer = (state, action) => {
    switch (action.type) {
        case actionType.AIRLINE_FETCHING:
            return { ...state, fetching: true }
        case actionType.AIRLINE_FETCHED:
            return { ...state, airlines: action.payload, fetching: false }
        case actionType.AIRLINE_FETCH_ERROR:
            return { ...state, error: true }
        default:
            return state;
    }
}

const passengerReducer = (state, action) => {
    switch (action.type) {
        case actionType.PASSENGER_ADDED:
            return [...state, action.payload];
        default: return state;
    }
}


export const PurchaseProvider = ({ children }) => {

    const [productCode, setProductCode] = useState();
    const [airlineId, setAirlineId] = useState();
    const [pnr, setPnr] = useState("");

    const [purchasing, setPurchasing] = useState(true);
    const [price, setPrice] = useState(0);
    const [serviceNumber, setServiceNumber] = useState("");


    const [productState, productDispatch] = useReducer(productReducer, {
        fetching: false,
        error: false,
        products: []
    });

    console.log(productCode, airlineId, pnr, passengerState);


    const [airlineState, airlineDispatch] = useReducer(airlineReducer, {
        fetching: false,
        error: false,
        airlines: []
    });

    const [passengerState, passengerDispatch] = useReducer(passengerReducer, []);

    const fetchProducts = async () => {
        productDispatch({ type: actionType.PRODUCT_FETCHING });
        try {
            const { Data: products } = await getProductList();
            productDispatch({ type: actionType.PRODUCT_FETCHED, payload: products });
        } catch (error) {
            productDispatch({ type: actionType.PRODUCT_FETCH_ERROR });
        }
    }

    const fetchAirlines = async () => {
        airlineDispatch({ type: actionType.AIRLINE_FETCHING });
        try {
            const { Data: airlines } = await getAirlineList();
            //airlines = airlines.slice(0,30);
            airlineDispatch({ type: actionType.AIRLINE_FETCHED, payload: airlines });
        } catch (error) {
            airlineDispatch({ type: actionType.AIRLINE_FETCH_ERROR });
        }
    }

    const addPassenger = (passenger) => {
        passengerDispatch({ type: actionType.PASSENGER_ADDED, payload: passenger });
    }

    const purchase = async () => {
        const dataPayload = {
            "ProductCode": productCode,
            "IsInternational": true,
            "PromoCode": "",
            "CurrencyCode": "USD",
            "PassengerList": []
        }

        passengerState && passengerState.length && passengerState.forEach((passenger, index) => {
            dataPayload.PassengerList.push({
                "OrderSequence": index + 1,
                "LastName": passenger.lastName,
                "FirstName": passenger.firstName,
                "Email": passenger.email,
                "AirlineId": airlineId,
                "AirlineConfirmationNumber": pnr
            });
        });
        console.log(dataPayload);
        try {

            const { Data } = await purchaseService(dataPayload);
            setPurchasing(false);
            setServiceNumber(Data.ServiceNumber);
            setPrice(Data.TotalPrice);
            console.log(Data);
        }catch(error){
            console.log(error);
        }

    }

    return (
        <PurchaseContext.Provider value={{ purchasing, serviceNumber, price, purchase, passengerState, addPassenger, productState, airlineState, pnr, productCode, airlineId, fetchProducts, fetchAirlines, setProductCode, setAirlineId, setPnr }}>
            {children}
        </PurchaseContext.Provider>
    );
}

const actionType = {
    PRODUCT_FETCHING: 'PRODUCT_FETCHING',
    PRODUCT_FETCHED: 'PRODUCT_FETCHED',
    PRODUCT_FETCH_ERROR: 'PRODUCT_FETCH_ERROR',

    AIRLINE_FETCHING: 'AIRLINE_FETCHING',
    AIRLINE_FETCHED: 'AIRLINE_FETCHED',
    AIRLINE_FETCH_ERROR: 'AIRLINE_FETCH_ERROR',

    PASSENGER_ADDED: 'PASSENGER_ADDED'
}


