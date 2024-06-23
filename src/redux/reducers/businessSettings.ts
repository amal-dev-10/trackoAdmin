import { iBusinessSettings } from "../../interfaces/business";
import { actionInterface } from "../../interfaces/common";

type props = {
    settings: iBusinessSettings[],
    clientSettings: iBusinessSettings[],
    adminSettings: iBusinessSettings[]
}

let initialState: props = {
    clientSettings: [
        {
            name: "Get Whatsapp alert from",
            knowMore: `Turn on or off the whatsapp notification send by the organization.`,
            enabled: false,
            id: "whatsappNotification",
        },
    ],
    adminSettings: [
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
    ],
    settings: [] as iBusinessSettings[]
}

export const businessSettingsReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_ORGANIZATION_SETTINGS":
            let t = [] as iBusinessSettings[];
            if(action.payload === "admin"){
                t = state.adminSettings
            }else if (action.payload === "client"){
                t = state.clientSettings
            }
            return {
                ...state,
                settings: [...t]
            } 
        case "UPDATE_BUSINESS_SETTINGS":
            return {
                ...state,
                settings: JSON.parse(JSON.stringify(action.payload))
            }
        default:
            return state
    }
}