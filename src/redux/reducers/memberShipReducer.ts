import { actionInterface, memberShipProps } from "../../interfaces/common"

type props = {
    memberShips: memberShipProps[]
}

let initialState: props = {
    memberShips: [
        {
            name: "AMAL DEV",
            tier: "gold",
            validFrom: new Date(),
            validThru: new Date(),
            phoneNumber: "7902992447",
            id: "0"
        },
        {
            name: "AMAL DEV",
            tier: "silver",
            validFrom: new Date(),
            validThru: new Date(),
            phoneNumber: "7902992447",
            id: "1"
        },
        {
            name: "AMAL DEV",
            tier: "bronze",
            validFrom: new Date(),
            validThru: new Date(),
            phoneNumber: "7902992447",
            id: "1"
        }
    ]
}

export const memberShipReducer = (state=initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_MEMBERSHIP_DATA":
            return state;
        default:
            return state
    }
}