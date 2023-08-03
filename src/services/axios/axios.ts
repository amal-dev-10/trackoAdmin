import axios, { AxiosInstance } from 'axios';
import store from '../../redux/store';

const createApiInstance = ()=>{
    let s = store.getState();
    const token = s.auth.data.token;
    const api: AxiosInstance = axios.create({
        baseURL: 'http://192.168.1.5:3000/api',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token || ""}`
        },
    });
    return api
}

export default createApiInstance;