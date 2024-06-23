import axios, { AxiosInstance } from 'axios';
import { store } from '../../redux/store';
import Config from 'react-native-config';

const createApiInstance = ()=>{
  let s = store.getState();
  const token = (<any>s.auth).data.token;
  let source = axios.CancelToken.source();
  const api: AxiosInstance = axios.create({
      baseURL: 'http://192.168.1.6:3000/api',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token || ""}`
      },
  });
  return {api: api, source: source}
}

export default createApiInstance;