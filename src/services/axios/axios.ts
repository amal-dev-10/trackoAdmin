import axios, { AxiosInstance } from 'axios';
import store from '../../redux/store';
import Config from 'react-native-config';


const createApiInstance = ()=>{
  let s = store.getState();
  const token = (<any>s.auth).data.token;
  let source = axios.CancelToken.source();
  const api: AxiosInstance = axios.create({
      baseURL: 'http://trackoapi-env.eba-esdsr73m.us-east-1.elasticbeanstalk.com/api',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token || ""}`
      },
  });
  return {api: api, source: source}
}

export default createApiInstance;