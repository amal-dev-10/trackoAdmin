
import { ibusiness } from "../../interfaces/business";
import { iClient } from "../../interfaces/iClient";
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