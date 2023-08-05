
import { ibusiness } from "../../interfaces/business";
import { iClient, iFilterQuery, iMembershipDetails } from "../../interfaces/iClient";
import store from "../../redux/store";
import { deleteData, getData, postData } from "../service/serviceHandler";

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

export const getAllClients = async (query: iFilterQuery, disableLoader: boolean)=>{
    let res = null;
    try{
        let st = store.getState();
        let q: iFilterQuery = {
            count: undefined,
            bronze: undefined,
            expired: undefined,
            gold: undefined,
            noMembership: undefined,
            search: undefined,
            silver: undefined,
            ...query
        }
        res = await getData(`client/getAllClients/${st.dashboard.selectedBusiness?.uid}?q=${JSON.stringify(q)}`, disableLoader)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const updatePackageService = async (businessId: string, data: any, byPassLoading: boolean = false)=>{
    let res = null;
    try{
        res = await postData(`business/packages/${businessId}`, data, byPassLoading)
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

export const deletePackage = async (packId: string)=>{
    let res = null;
    try{
        let st = store.getState();
        let businessId: string = st.dashboard.selectedBusiness?.uid || ""; 
        res = await deleteData(`business/packages/${businessId}/${packId}`);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const activatePackage = async (packId: string, packOption: string, option: {validFrom: Date})=>{
    let res = null;
    try{
        let st = store.getState();
        res = await postData(`client/activateMembership/${st.dashboard.selectedBusiness?.uid}/${(<any>st.client).selectedClient.clientId}/${packId}`, {
            type: packOption,
            ...option
        })
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getClientTransactions = async (type: string, count: number | null = null)=>{
    let res = null;
    try{
        let query: string = "";
        if(count){
            query = `?count=${count}`
        }
        let st = store.getState();
        res = await getData(`client/transactions/${st.dashboard.selectedBusiness?.uid}/${type === "client" ? st.transactions.id : ""}${query}`)
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

export const getInsights = async (type: string, start: string, end: string)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`business/insights/${st.dashboard.selectedBusiness?.uid}?type=${type}&start=${start}&end=${end}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getFilterCounts = async ()=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`client/filterCount/${st.dashboard.selectedBusiness?.uid}`)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const calculateExpiry = async ()=>{
    let res = null;
    try{
        res = await getData('jobs/expiryTask')
    }
    catch(err){
        console.log(err)
    }
    return res
}