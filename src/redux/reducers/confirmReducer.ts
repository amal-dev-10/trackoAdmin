import { actionInterface, confirmationModal } from "../../interfaces/common"

let initialState: confirmationModal = {
    showConfirmModal: false,
    msg: "",
    title: "Confirmation",
    confirm: false
}

export const confirmationReducer = (state: confirmationModal = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SHOW_CONFIRMATION_MODAL":
            return {
                ...state,
                showConfirmModal: action.payload as boolean
            }
        case "SET_CONFIRM":
            return {
                ...state,
                confirm: action.payload as boolean
            }
        case "SET_MODAL_PROPERTIES":
            return {
                ...state,
                ...action.payload as any
            }
        default:
            return state
    }
}