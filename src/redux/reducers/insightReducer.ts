import { iFinanceInsight, iMembershipInsight } from "../../interfaces/business"
import { actionInterface } from "../../interfaces/common"

type props = {
    membershipInsight: iMembershipInsight,
    financeInsight: iFinanceInsight
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
    } as iMembershipInsight,
    financeInsight: {
        zooomDomain: {x:[0, 0], y:[0, 0]},
        data: [{x: 0, y: 0}],
        month: "",
        year: ""
    } as iFinanceInsight
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
        case "SET_FINANCE_INSIGHT":
            return {
                ...state,
                financeInsight: {
                    ...action.payload
                }
            }
        default:
            return state
    }
}