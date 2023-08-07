import { actionInterface, requestsProps } from "../../interfaces/common"

type props = {
    allRequests: requestsProps[]
}

let initialState: props = {
    allRequests: []
}

export const requestReducer = (state=initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_REQUESTS":
            return state;
        default:
            return state
    }
}