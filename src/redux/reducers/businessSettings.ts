import { iBusinessSettings } from "../../interfaces/business";
import { actionInterface } from "../../interfaces/common";

type props = {
    settings: iBusinessSettings[]
}

let initialState = {
    settings: [
        {
          name: "Membership SMS Alert",
          knowMore: `By enabling this option a SMS alert will be send to the client with the details regarding the membership.\nNote: SMS will be send only to the verified clients.`,
          enabled: false,
          id: "membershipSmsAlert",
        },
        {
          name: "Auto Expired Membership SMS Alert",
          knowMore: `By enabling this option a SMS alert will be send automatically to notify the client about the membership expiration.\nNote: SMS will be send only to the verified clients.`,
          enabled: false,
          id: "autoExpiredMembershipAlert",
        }
    ] as iBusinessSettings[]
}

export const businessSettingsReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "UPDATE_BUSINESS_SETTINGS":
            return {
                ...state,
                settings: JSON.parse(JSON.stringify(action.payload))
            }
        default:
            return state
    }
}