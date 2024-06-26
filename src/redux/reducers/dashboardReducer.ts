import { ibusiness } from "../../interfaces/business"
import { actionInterface } from "../../interfaces/common"

type props = {
    businesses: ibusiness[],
    selectedBusiness: ibusiness | null
}

let initialState = {
    businesses:[],
    selectedBusiness: null
}

export const businessReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_ALL_BUSINESS_LIST":
            return {
                ...state,
                businesses: [...action.payload as ibusiness[]]
            }
        case "SET_SELECTED_BUSINESS":
            return {
                ...state,
                selectedBusiness: action.payload as ibusiness
            }
        default:
            return state
    }
}