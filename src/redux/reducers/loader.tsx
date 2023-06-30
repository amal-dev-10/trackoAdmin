import { actionInterface, loaderProps } from "../../interfaces/common"

let initialState: loaderProps = {
    show: false
}

export const loaderReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SHOW_LOADER":
            state = {...state, show: action.payload}
            return state;
        default: 
            return state
    }
}