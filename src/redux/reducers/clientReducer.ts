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
        // case "CHECKBOX_CLICKED":
        //     if(state.filters){
        //         // let all = state.filters.allFilters;
        //         // let tabIndex: number = all.findIndex((x)=>{return x.active});
        //         // if(tabIndex > -1){
        //         //     let filterIndex: number = all[tabIndex].filters.findIndex((x)=>{return x.id === action.payload});
        //         //     if(filterIndex > -1){
        //         //         let a: boolean = all[tabIndex].filters[filterIndex].active;
        //         //         all[tabIndex].filters[filterIndex].active = !a;
        //         //     }
        //         // }
        //         return {
        //             ...state,
        //             filters: {
        //                 ...state.filters,
        //                 allFilters: [...action.payload]
        //             }
        //         }

        //     }
        //     return state
        // case "APPLY_FILTER":
        //     let n = {
        //         ...state,
        //         filters: {
        //             ...state.filters,
        //             allFilters: [...action.payload as iFilters[]]
        //         }
        //     } as props
        //     console.log("apply", action.payload[0].filters)
        //     return n

        // case "FILTER_TAB_CLICKED":
        //     if(state.filters){
        //         // let allFilters = state.filters.allFilters;
        //         // allFilters =  allFilters.map((d)=>{d.active = false; return d});
        //         // let i: number = allFilters.findIndex((d)=>{return d.id === action.payload});
        //         // if(i > -1){
        //         //     allFilters[i].active = true;
        //         // };
        //         return {
        //             ...state,
        //             filters: {
        //                 ...state.filters,
        //                 allFilters: [...action.payload]
        //             }
        //         }
        //     }
        //     return state
        // case "SET_DROPDOWN_DATA":
        //     let f: any = {
        //         allFilters: [...action.payload]
        //     };
        //     let copy = {...state, filters: {...f}, previousState: {...state, filters: {...f}}}
        //     return {
        //         ...copy
        //     }
        default:
            return state
    }
}