import axios from 'axios';
// import secret from './secrets/ApiSecret'

// const API_KEY = secret;
const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use((config) => {
    config.url = `${config.url}?key=${secret}`
    //AIzaSyBz7-T_O1ag_g84dsL5FtR7RddWMO1q_fQ`

    return config;
});

export default instance;