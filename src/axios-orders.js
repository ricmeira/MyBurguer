import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburguerreactapp.firebaseio.com/'
});

export default instance;