import { actionInterface } from "../../interfaces/common"
import { iFilters } from "../../interfaces/iClient"

type props = {
    filterObject: {allFilters: iFilters[], filterActive?: boolean} | null,
}

let initialState = {
    filterObject: null,
}

export const clientFilters = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "APPLY_FILTER":
            let all = action.payload as iFilters[]
            let active = all.map((d)=>{
                let check = d.filters.map((x)=>{
                    return x.active
                });
                if(check.includes(true)){
                    return true
                }else{
                    return false
                }
            });
            return {
                ...state,
                filterObject: {
                    ...state.filterObject,
                    filterActive: active.includes(true),
                    allFilters: JSON.parse(JSON.stringify(all))
                }
            } as props
        case "SET_DROPDOWN_DATA":
            return {
                ...state,
                filterObject: {
                    ...state.filterObject,
                    allFilters: [...action.payload]
                }
            } as props
        case "RESET_REDUCER":
            if(action.payload === "filterReducer"){
                return {
                    ...initialState,
                    filterObject: null,
                }
            }
            return state
        default:
            return state
    }
}