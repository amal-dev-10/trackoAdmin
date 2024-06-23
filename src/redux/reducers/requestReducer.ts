import { actionInterface, requestsProps } from "../../interfaces/common"
import { iClient } from "../../interfaces/iClient"

type props = {
    allRequests: iClient[]
}

let initialState: props = {
    allRequests: []
}

export const requestReducer = (state=initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_REQUESTS":
            return state;
        case "SET_REQUESTS":
            return {
                ...state,
                allRequests: action.payload
            }
        default:
            return state
    }
}