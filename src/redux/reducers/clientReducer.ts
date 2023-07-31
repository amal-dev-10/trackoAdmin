import { actionInterface } from "../../interfaces/common"
import { iClient, iFilters, iMembership, iMembershipDetails } from "../../interfaces/iClient"

type props = {
    clients: iMembership[],
    selectedClient: iMembership | null,
    filters: {allFilters: iFilters[]} | null,
}

let initialState = {
    clients:[],
    selectedClient: null,
    filters: null,
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
            let index: number = state.clients.findIndex((d)=>{return d.clientId === state.selectedClient?.clientId});
            let temp: iMembership[] = [...state.clients];
            if(index > -1){
                temp[index].memberShipDetails = {...action.payload}
            }
            return{
                ...state,
                clients: new Array().concat(temp),
                selectedClient: {
                    ...state.selectedClient, 
                    memberShipDetails: {...action.payload as iMembershipDetails}
                }
            }
        case "CHECKBOX_CLICKED":
            if(state.filters){
                let all = state.filters.allFilters;
                let tabIndex: number = all.findIndex((x)=>{return x.active});
                if(tabIndex > -1){
                    let filterIndex: number = all[tabIndex].filters.findIndex((x)=>{return x.id === action.payload});
                    if(filterIndex > -1){
                        let a: boolean = all[tabIndex].filters[filterIndex].active;
                        all[tabIndex].filters[filterIndex].active = !a;
                    }
                }
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        allFilters: [...all]
                    }
                }
            }
            return state
        case "FILTER_TAB_CLICKED":
            if(state.filters){
                let allFilters = state.filters.allFilters;
                allFilters =  allFilters.map((d)=>{d.active = false; return d});
                let i: number = allFilters.findIndex((d)=>{return d.id === action.payload});
                if(i > -1){
                    allFilters[i].active = true;
                };
                return {
                    ...state,
                    filters: {
                        ...state.filters,
                        allFilters: [...allFilters]
                    }
                }
            }
            return state
        case "SET_DROPDOWN_DATA":
            let f: any = {
                allFilters: [...action.payload]
            };
            let copy = {...state, filters: {...f}, previousState: {...state, filters: {...f}}}
            console.log(copy.previousState.filters.allFilters[0].filters[0])
            return {
                ...copy
            }
        default:
            return state
    }
}