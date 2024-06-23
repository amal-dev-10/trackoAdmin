import { actionInterface } from "../../interfaces/common"

type props = {
    loginMode: null | string,
}

let initialState = {
    loginMode: null,
}

export const appStateReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_LOGIN_MODE":
            return {
                ...state,
                loginMode: action.payload
            }
        default:
            return state
    }
}