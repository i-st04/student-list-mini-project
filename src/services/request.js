import axios from 'axios';

//axios.defaults.baseURL= 'https://dog.ceo/api' ; - url sa koga najvise saljemo req

const getData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getData };