import { Timestamp } from "firebase/firestore"
import { mainStat } from "../../interfaces/business"
import { actionInterface } from "../../interfaces/common"

let initialState = {
    totalMembership: "0",
    membershipToday: "0",
    membershipThisMonth: "0",
    expiredSubs: "0",
    totalAmount: "0",
    amountToday: "0",
    amountThisMonth: "0",
    totalMembers: "0",
    newMembersThisMonth: "0",
    membersToday: "0",
    lastUpdated: Timestamp.fromDate(new Date()),
    businessId: ""
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