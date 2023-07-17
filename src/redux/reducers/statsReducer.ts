import { Timestamp } from "firebase/firestore"
import { mainStat } from "../../interfaces/business"
import { actionInterface } from "../../interfaces/common"

let initialState = {
    amountToday: "0",
    businessId: "0",
    expiredSubs: "0",
    lastUpdated: Timestamp.fromDate(new Date()),
    newMembers: "0",
    totalAmount: "0",
    totalMembers: "0",
    totalSubscribers: "0"
}

export const statsReducer = (state: mainStat = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_HOME_STAT":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state 
    }
} 