import { actionInterface } from "../../interfaces/common"
import { iClient, iFilters, iMembership, iMembershipDetails, subFilters, updatableClient } from "../../interfaces/iClient"

type props = {
    clients: iMembership[],
    selectedClient: iMembership | null,
    mode: string
    // filters: {allFilters: iFilters[], filterActive?: boolean} | null,
}

let initialState = {
    clients:[],
    selectedClient: null,
    filters: null,
    mode: "add"
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
        case "UPDATE_MEMBERSHIP":
            let temp: iMembership[] = new Array();
            temp = state.clients.map((x)=>{
                if(x.clientId === state.selectedClient?.clientId){
                    x.memberShipDetails = {...action.payload}
                }
                return x
            });
            return{
                ...state,
                clients: JSON.parse(JSON.stringify(temp)),
                selectedClient: {
                    ...state.selectedClient, 
                    memberShipDetails: {...action.payload as iMembershipDetails}
                }
            }
        case "UPDATE_CLIENT_DETAILS":
            let updateClient = action.payload as updatableClient & {uid?: String}
            let t = state.clients.map((x)=>{
                if(x.clientId === state.selectedClient?.clientId){
                    delete updateClient?.uid
                    x = {
                        ...x,
                        ...updateClient
                    }
                }
                return x
            });
            return {
                ...state,
                clients: JSON.parse(JSON.stringify(t)),
                selectedClient: {
                    ...state.selectedClient,
                    ...updateClient
                }
            }
        case "SET_MODIFY_CLIENT_MODE":
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state
    }
}