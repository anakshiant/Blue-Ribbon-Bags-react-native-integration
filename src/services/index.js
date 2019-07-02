import axios from 'axios';

const api = axios.create({
    baseURL: "http://validation-api.blueribbonbags.com/api/",
    timeout: 10000,
    headers: {
        "Authorization": "Basic XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
})


export const responseFormatter = async (responsePromise) => {
    try {
        let response = await responsePromise;
        if (response.status === 200) {
            return response.data;
        }
        console.log(response);

        throw new Error("Some error occured");
    } catch (error) {
        throw error;
    }
}



export default api;