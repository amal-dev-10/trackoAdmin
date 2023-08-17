import { actionInterface, iApiCall } from "../../interfaces/common"

let initialState = {
    apiCalls: [] as iApiCall[]
}

export const apiCallsReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_NEW_API_CALL":
            return {
                ...state,
                apiCalls: [...state.apiCalls, action.payload]
            };
        case "COMPLETE_API_CALL":
            let temp = state.apiCalls
            let index: number = state.apiCalls.findIndex((x)=>{return x.url === action.payload});
            if(index > -1){
                temp.splice(index, 1);
            }
            return {
                ...state,
                apiCalls: [...temp]
            }
        case "CANCEL_API_CALL":
            let t = state.apiCalls
            let i: number = state.apiCalls.findIndex((x)=>{return x.url.includes(action.payload)});
            if(i > -1){
                state.apiCalls[i].axios.cancel();
                t.splice(i, 1);
            }
            return {
                ...state,
                apiCalls: [...t]
            }
        default:
            return state
    }
}