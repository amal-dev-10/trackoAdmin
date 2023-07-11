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
            id: 3,
            subButtons: []
        },
        {
            icon: "home-1",
            name: "ABOUT",
            id: 1,
            opened: false,
            subButtons: [
                {
                    icon: "hammer",
                    name: "TERMS & CONDITIONS",
                    id: 4,
                },
                {
                    icon: "hammer",
                    name: "DATA PRIVACY",
                    id: 7,
                }
            ]
        },
        {
            icon: "cog-outline",
            name: "SETTINGS",
            id: 5,
            subButtons: []
        },
        {
            icon: "logout",
            name: "LOGOUT",
            id: 7,
            subButtons: []
        }
    ] as profileButtonProps[]
}

export const profileReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SUB_BUTTON_TOGGLE":
            let id: number = action.payload;
            let updated: profileButtonProps[] = state.buttons.map((x)=>{
                if(x.id === id){
                    x.opened = !x.opened
                }
                else if(x.opened){
                    x.opened = false
                }
                return x
            });
            state = {...state, buttons: [...updated]}
            return state
        default:
            return state; 
    }
}