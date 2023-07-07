import { actionInterface } from "../../interfaces/common"

type props = {
    show: boolean
}

let initialState: props = {
    show: false
}

export const mainLoaderReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SHOW_MAIN_LOADER":
            return {
                ...state,
                show: action.payload
            }
        default:
            return state
    }
}