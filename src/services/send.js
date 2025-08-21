import axios from 'axios';

//axios.defaults.baseURL= 'https://dog.ceo/api' ; - baseURL
const sendData = async (url) => {
    try {
        const { data } = await axios.post(url, {},{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // or 'multipart/form-data', if uploading files
            }
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { sendData };