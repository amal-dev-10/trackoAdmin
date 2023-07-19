import { iMembershipInsight } from "../../interfaces/business"
import { actionInterface } from "../../interfaces/common"

type props = {
    membershipInsight: iMembershipInsight
}

let initialState = {
    membershipInsight: {
        totalAmount: "0",
        goldCount: "0",
        silverCount: "0",
        bronzeCount: "0",
        goldAmount: "0",
        silverAmount: "0",
        bronzeAmount: "0"
    }
}

export const insightReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_MEMBERSHIP_INSIGHT":
            return {
                ...state,
                membershipInsight:{
                    ...action.payload
                }
            }
        default:
            return state
    }
}