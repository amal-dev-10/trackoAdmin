
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ibusiness } from "../../interfaces/business";
import { apiResponse, iJoinRequest } from "../../interfaces/common";
import { iClient, iFilterQuery, iMembershipDetails } from "../../interfaces/iClient";
import {store} from "../../redux/store";
import { deleteData, getData, patchData, postData } from "../service/serviceHandler";
import storage from '@react-native-firebase/storage';


export const getOwnerById = async (id: string)=>{
    let res = null;
    try{
        let mode = await AsyncStorage.getItem("loginMode");
        if(mode === "admin"){
            res = await getData(`owner/owner/${id}`);
        }else if(mode === "client"){
            res = await getData(`client/client/${id}`);
        }
    }
    catch(err){
        console.log(err);
    }
    return res
}

export const saveOwner = async (data: any = null)=>{
    let res = null;
    try{
        let mode = await AsyncStorage.getItem("loginMode");
        if(mode === "admin"){
            res = await postData("owner/owner", data);
        }else if(mode === "client"){
            res = await postData("client/client", data);
        }
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

export const getAddedOrg = async ()=>{
    let res = null;
    try{
        res = await getData("client/addedBusiness"); 
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

export const updateBusiness = async (data: any, byPassLoading: boolean = false)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await patchData(`business/business/${st.dashboard.selectedBusiness?.uid}`, {data}, byPassLoading);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const addNewBusiness = async (data: ibusiness, byPassLoading: boolean = false)=>{
    let res = null;
    try{
        res = await postData("business/business", data, byPassLoading)
    }
    catch(err){
        console.log(err);
    }
    return res
}

export const addNewClient = async (id: string , data: iClient, byPassLoading: boolean = false)=>{
    let res = null;
    try{
        res = await postData(`client/client/${id}`, data, byPassLoading)
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const updateClient = async (id: string , data: iClient, byPassLoading: boolean = false)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await patchData(`client/client/${id}/${st.dashboard.selectedBusiness?.uid}`, data, byPassLoading)
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

export const getFilterCounts = async (disableLoader: boolean = false)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`client/filterCount/${st.dashboard.selectedBusiness?.uid}`, disableLoader)
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

export const sendSMSToClients = async (clientList: string[])=>{
    let res = null;
    try{
        let st = store.getState();
        res = await postData(`business/sendSMS/${st.dashboard.selectedBusiness?.uid}`, {
            clientList: clientList
        })
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const sendVerificationCode = async(phoneNumber: string)=>{
    let res = null;
    try{
        res = await postData(`client/sendOTP`, {
            phoneNumber: phoneNumber
        });
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const verifyOTPCode = async(phoneNumber: string, code: string)=>{
    let res = null;
    try{
        res = await postData(`client/verifyOTP`, {
            phoneNumber: phoneNumber,
            code: code
        });
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const updateBusinessSettings = async(data: any, byPassLoading: boolean = true)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await postData(`business/settings/${st.dashboard.selectedBusiness?.uid}`, data, byPassLoading);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const uploadBusinessLogo = async (uri: string)=>{
    let res = null;
    try{
        let st = store.getState();
        const ref = storage().ref(`business/${st.dashboard.selectedBusiness?.uid}/profileImage.png`);
        await ref.putFile(uri);
        let url = await ref.getDownloadURL();
        res = {
            data: url,
            status: 200,
            message: ""
        } as apiResponse
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const uploadClientProfileImage = async (uri: string)=>{
    let res = null;
    try{
        let st = store.getState();
        const ref = storage().ref(`client/${new Date().getTime()}/profileImage.png`);
        await ref.putFile(uri);
        let url = await ref.getDownloadURL();
        res = {
            data: url,
            status: 200,
            message: ""
        } as apiResponse
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getOrgById = async(orgId: string)=>{
    let res = null;
    try{
        res = await getData(`business/business/shareId/${orgId}`);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const sendRequest = async(businessId: string)=>{
    let res = null;
    try{
        res = await postData(`client/sendRequest`, {businessId: businessId});
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const widthdrawRequest = async(businessId: string)=>{
    let res = null;
    try{
        res = await postData(`client/withdrawRequest`, {businessId: businessId});
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getAllPendingRequests = async()=>{
    let res = null;
    try{
        let st = store.getState();
        res = await getData(`client/requests/${st.dashboard.selectedBusiness?.uid}`);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const acceptRequest = async(requestMadeBy: string)=>{
    let res = null;
    try{
        let st = store.getState();
        res = await postData(`client/acceptRequest`, {
            businessId: st.dashboard.selectedBusiness?.uid,
            requestMadeBy: requestMadeBy
        });
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getMyMembership = async()=>{
    let res = null;
    try{
        res = await getData(`client/membership`, true);
    }
    catch(err){
        console.log(err)
    }
    return res
}

export const getClientBusinessSettings = async(businessId: string)=>{
    let res = null;
    try{
        res = await getData(`business/clientSettings/${businessId}`, true);
    }
    catch(err){
        console.log(err)
    }
    return res
}