
import { ibusiness } from "../../interfaces/business";
import { iClient, iMembershipDetails } from "../../interfaces/iClient";
import store from "../../redux/store";
import { getData, postData } from "../service/serviceHandler";

export const getOwnerById = async (id: string)=>{
    let res = null;
    try{
        res = await getData(`/owner/owner/${id}`);
    }
    catch(err){
        console.log(err);
    }
    return res
}

export const saveOwner = async (data: any = null)=>{
    let res = null;
    try{
        res = await postData("/owner/owner", data);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getAllBusiness = async ()=>{
    let res = null;
    try{
        res = await getData("business/business"); 
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getBusinessById = async (id: string)=>{
    let res = null;
    try{
        res = await getData(`business/business/${id}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const addNewBusiness = async (data: ibusiness)=>{
    let res = null;
    try{
        res = await postData("business/business", data)
    }
    catch(err){
        console.log(err);
    }
    return res
}

export const addNewClient = async (id: string ,data: iClient)=>{
    let res = null;
    try{
        res = await postData(`client/client/${id}`, data)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getAllClients = async (businessId: string)=>{
    let res = null;
    try{
        res = await getData(`client/getAllClients/${businessId}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const updatePackageService = async (pack: string, businessId: string, data: any)=>{
    let res = null;
    try{
        res = await postData(`business/packages/${pack}/${businessId}`, data)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getPackages = async (businessId: string)=>{
    let res = null;
    try{
        res = await getData(`business/packages/${businessId}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const activatePackage = async (packId: string)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await postData(`client/activateMembership/${st.dashboard.selectedBusiness?.uid}/${(<any>st.client).selectedClient.clientId}/${packId}`, {})
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getClientTransactions = async ()=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`client/transactions/${st.dashboard.selectedBusiness?.uid}/${st.transactions.id}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getHomeStats = async ()=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`business/homeStats/${st.dashboard.selectedBusiness?.uid}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getEndedSubscriptions = async ()=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`client/expiredMembership/${st.dashboard.selectedBusiness?.uid}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getInsights = async (type: string, year: string, month: string)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`business/insights/${st.dashboard.selectedBusiness?.uid}?type=${type}&year=${year}&month=${month}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}