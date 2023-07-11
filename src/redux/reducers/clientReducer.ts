import { actionInterface } from "../../interfaces/common"
import { iClient, iMembership } from "../../interfaces/iClient"

type props = {
    clients: iMembership[],
    selectedClient: iMembership | null
}

let initialState = {
    clients:[],
    selectedClient: null
}

export const clientReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_ALL_CLIENTS":
            return {
                ...state,
                clients: [...action.payload as iMembership[]]
            }
        case "SET_SELECTED_CLIENT":
            return {
                ...state,
                selectedClient: action.payload as iMembership
            }
        case "RESET_REDUCER":
            if(action.payload === "clientReducer"){
                return {...initialState}
            }
            return initialState
        default:
            return state
    }
}