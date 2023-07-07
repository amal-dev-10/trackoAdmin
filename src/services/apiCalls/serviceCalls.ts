
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