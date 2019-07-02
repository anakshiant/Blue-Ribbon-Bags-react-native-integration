import { purchaseService } from '../src/services/service';
import { getAirlineList, getProductList } from '../src/services/data';


describe("this will test data end points", () => {

    // test airline end point
    test("get airline list from brb service", async () => {
        const airlines = await getAirlineList();
        expect(airlines.data).not.toBeNull();
    })

    // test products end point
    test("get Products list from brb service", async () => {
        const products = await getProductList();
        expect(products.data).not.toBeNull();
    })

});

describe("test service purchase end point", () => {
    const premNumber = Math.random()*1000;

    const randomNum = Math.round(premNumber);
    
    const dataPayload = {
        "ProductCode": "GOLD",
        "IsInternational": true,
        "PromoCode": "",
        "CurrencyCode": "USD",
        "PassengerList": []
    }

    dataPayload.PassengerList.push({
        "OrderSequence": 1,
        "LastName": "Smith",
        "FirstName": "John",
        "Email": "anand@mail.com",
        "AirlineId": "2",
        "AirlineConfirmationNumber": `APICNF123${randomNum}`
    });

    // test("test service purchase end point", async () => {
    //     const response = await purchaseService(dataPayload);
    //     expect(response.Status).toBeTruthy();
    // });
});
