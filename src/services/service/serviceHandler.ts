import createApiInstance from "../axios/axios";
import { setLoader } from "../../redux/actions";
import store from "../../redux/store";
    

export const getData = async (url: string) => {
    let response = null;
    store.dispatch(setLoader(true));
    try {
        response = await createApiInstance().get(url);
    } catch (error) {
        console.log(error);
    }
    store.dispatch(setLoader(false));
    return response?.data
};

export const postData = async (url: string, body: any) => {
    let response = null;
    store.dispatch(setLoader(true));
    try {
        response = await createApiInstance().post(url, JSON.stringify(body));
    } catch (error) {
        console.log(error);
    }
    store.dispatch(setLoader(false));
    return response?.data
};

export const patchData = async (url: string, body: any) => {
    let response = null;
    store.dispatch(setLoader(true));
    try {
        response = await createApiInstance().patch(url, body);
    } catch (error) {
        console.log(error);
    }
    store.dispatch(setLoader(false));
    return response?.data
};

export const deleteData = async (url: string) => {
    let response = null;
    store.dispatch(setLoader(true));
    try {
        response = await createApiInstance().delete(url);
    } catch (error) {
        console.log(error)
    }
    store.dispatch(setLoader(false));
    return response?.data
};