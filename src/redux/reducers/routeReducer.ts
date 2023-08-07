import { actionInterface } from "../../interfaces/common"

let initialState = {
    currentRoute: ""
}

export const routeReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_ROUTE_NAME":
            return {
                ...state,
                currentRoute: action.payload
            }
        default:
            return state 
    }
}