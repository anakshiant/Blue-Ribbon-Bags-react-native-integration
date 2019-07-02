import api, { responseFormatter } from './';

export const purchaseService = (data) => {
    return responseFormatter(api.post("/service/purchase", data));
}

