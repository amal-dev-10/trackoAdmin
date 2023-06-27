import { actionInterface, profileButtonProps } from "../../interfaces/common"

type props = {
    profileDetails: {},
    buttons: profileButtonProps[]
}

let initialState = {
    profileDetails: {},
    buttons: [
        {
            icon: "exchange",
            name: "ALL TRANSACTIONS",
            id: 3
        },
        {
            icon: "hammer",
            name: "TERMS & CONDITIONS",
            id: 4
        },
        {
            icon: "cog-outline",
            name: "SETTINGS",
            id: 5
        },
        {
            icon: "logout",
            name: "LOGOUT",
            id: 6
        }
    ]
}

export const profileReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        default:
            return state; 
    }
}