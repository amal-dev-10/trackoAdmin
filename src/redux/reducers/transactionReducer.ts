import { actionInterface, iTransactions, packagesProps } from "../../interfaces/common"
import { iMembershipDetails } from "../../interfaces/iClient"

type props = {
    id: string,
    mode: string,
    transactions: iTransactions[]
}

let initialState = {
    id: "",
    transactions: [],
    mode: ""
}

export const transactionReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_ID":
            return {
                ...state,
                id: action.payload
            }
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: [...action.payload]
            }
        case "SET_MODE":
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state
    }
}