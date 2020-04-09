import axios from 'axios';
import {API_KEY} from './secrets/ApiSecret'

// const API_KEY = secret;
const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use((config) => {
    config.url = `${config.url}?key=${API_KEY}`

    return config;
});

export default instance;