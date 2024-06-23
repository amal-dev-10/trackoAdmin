import { actionInterface } from "../../interfaces/common"
import { iFilters, iMembership, iMembershipDetails } from "../../interfaces/iClient"

type props = {
    membership: iMembership | null,
}

let initialState = {
    membership: null
}

export const ClientHomeReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_MY_MEMBERSHIP":
            return {
                ...state,
                membership: {...action.payload}
            }
        default:
            return state
    }
}