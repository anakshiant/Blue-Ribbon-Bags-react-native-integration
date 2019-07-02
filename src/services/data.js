import api, { responseFormatter } from './';

export const getProductList = ()=>{
    return responseFormatter(api.post("/data/GetProductList"));
}

export const getAirlineList = ()=>{
    return responseFormatter(api.post("/data/GetAirlineList"));
}

