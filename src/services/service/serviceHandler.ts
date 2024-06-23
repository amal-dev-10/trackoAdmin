import createApiInstance from "../axios/axios";
import { completeApiCallAction, setApiCallAction, setLoader } from "../../redux/actions";
import {store} from "../../redux/store";
import { navigate } from "../../navigations/NavigationService";
    
export const getData = async (url: string, byPassLoading: boolean = false) => {
    let response = null;
    try {
        if(!byPassLoading){
            store.dispatch(setLoader(true));
        }
        let axios = createApiInstance();
        store.dispatch(setApiCallAction({url: url, axios: axios.source}));
        response = await axios.api.get(url, {timeout: 30000, cancelToken: axios.source.token});
    } catch (error: any) {
        if((<string>error.message).includes("401")){
            navigate("Splash")
        }
        console.log(error.message);
    }
    store.dispatch(completeApiCallAction(url));
    store.dispatch(setLoader(false));
    return response?.data
};

export const postData = async (url: string, body: any, byPassLoading: boolean = false) => {
    let response = null;
    try {
        if(!byPassLoading){
            store.dispatch(setLoader(true));
        }
        let axios = createApiInstance();
        store.dispatch(setApiCallAction({url: url, axios: axios.source}));
        response = await axios.api.post(url, JSON.stringify(body), {timeout: 30000, cancelToken: axios.source.token});
    } catch (error: any) {
        if((<string>error.message).includes("401")){
            navigate("Splash")
        }
        console.log(error.message);
    }
    store.dispatch(completeApiCallAction(url));
    store.dispatch(setLoader(false));
    return response?.data
};

export const patchData = async (url: string, body: any, byPassLoading: boolean = false) => {
    let response = null;
    try {
        if(!byPassLoading){
            store.dispatch(setLoader(true));
        }
        let axios = createApiInstance();
        store.dispatch(setApiCallAction({url: url, axios: axios.source}));
        response = await axios.api.patch(url, JSON.stringify(body), {timeout: 30000, cancelToken: axios.source.token});
    } catch (error: any) {
        if((<string>error.message).includes("401")){
            navigate("Splash")
        }
        console.log(error.message);
    }
    store.dispatch(completeApiCallAction(url));
    store.dispatch(setLoader(false));
    return response?.data
};

export const deleteData = async (url: string, byPassLoading: boolean = false) => {
    let response = null;
    try {
        if(!byPassLoading){
            store.dispatch(setLoader(true));
        }
        let axios = createApiInstance();
        store.dispatch(setApiCallAction({url: url, axios: axios.source}));
        response = await axios.api.delete(url, {timeout: 30000, cancelToken: axios.source.token});
    } catch (error: any) {
        if((<string>error.message).includes("401")){
            navigate("Splash")
        }
        console.log(error.message);
    }
    store.dispatch(completeApiCallAction(url));
    store.dispatch(setLoader(false));
    return response?.data
};