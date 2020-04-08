import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pvappvue.firebaseio.com/',
    headers: { 'Content-Type': 'application/json' }
});

// Add token to every request
instance.interceptors.request.use(config => {
    console.log(config.url);
    config.url = `${config.url}?auth=${localStorage.getItem('token')}`;
    console.log(config.url);
    return config; 
});

export default instance;