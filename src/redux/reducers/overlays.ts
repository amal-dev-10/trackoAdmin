import { actionInterface, overlayComponent } from "../../interfaces/common"
import { fomatFirstLetterCapital, setRoute } from "../../utils/helper";

type stateInterface = {
    opendedComponents: overlayComponent[],
    componentList: overlayComponent[],
}

let initialState: stateInterface = {
    opendedComponents: [],
    componentList:[
        {id: 1, name: "TRANSACTIONS", screenName: "transactions"},
        {id: 2, name: "PROFILE", screenName: "profile"},
        {id: 3, name: "ALL TRANSACTIONS", screenName: "transactions"},
        {id: 4, name: "TERMS & CONDITIONS", screenName: "termsAndConditions"},
        {id: 5, name: "SETTINGS", screenName: "settings"},
        {id: 6, name: "ADD CLIENTS", screenName: "addClients"},
        {id: 7, name: "DETAILED", screenName: "clientDetails"},
        {id: 8, name: "", screenName: "businessProfile"},
        {id: 9, name: "EDIT", screenName: "editClient"},
        {id: 10, name: "DATA PRIVACY", screenName: "dataPrivacy"},
        {id: 11, name: "EXPIRED MEMBERSHIP", screenName: "expiredMembership"},
        {id: 12, name: "EDIT BUSINESS", screenName: "editBusiness"},
        {id: 13, name: "SETTINGS", screenName: "businessSettings"},
        {id: 14, name: "", screenName: "subscriptions"},
        {id: 15, name: "", screenName: "paymentMethod"},
        {id: 16, name: "", screenName: "addCard"},
        {id: 17, name: "HISTORY", screenName: "stripeTransactions"},
    ],
}

export const overlayReducer = (state = initialState, action: actionInterface)=>{
    let componentId: number = action.payload;
    switch(action.type){
        case "SET_OVERLAY_COMPONENT":
            let componentIndex: number = state.componentList.findIndex((x)=>{return x.id === componentId});
            if(componentIndex > -1){
                let index:number = state.opendedComponents.findIndex((x)=>{x.id === state.componentList[componentIndex].id});
                if(index < 0){
                    state = {...state, opendedComponents: [...state.opendedComponents, state.componentList[componentIndex]]};
                }
            }
            return state;
        case "CLOSE_OVERLAY_COMPONENT":
            let tempIndex: number = state.opendedComponents.findIndex((x)=>{return x.id === componentId});
            if(tempIndex > -1){
                state.opendedComponents.splice(tempIndex, 1);
                state = {...state, opendedComponents: [...state.opendedComponents]};
            }
            return state
        default:
            return state;
    }
}