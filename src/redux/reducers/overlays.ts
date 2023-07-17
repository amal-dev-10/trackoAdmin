import { actionInterface, overlayComponent } from "../../interfaces/common"

type stateInterface = {
    opendedComponents: overlayComponent[],
    componentList: overlayComponent[],
}

let initialState: stateInterface = {
    opendedComponents: [],
    componentList:[
        {id: 1, name: "TRANSACTIONS"},
        {id: 2, name: "PROFILE"},
        {id: 3, name: "ALL TRANSACTIONS"},
        {id: 4, name: "TERMS & CONDITIONS"},
        {id: 5, name: "SETTINGS"},
        {id: 6, name: "ADD CLIENTS"},
        {id: 7, name: "DETAILED"},
    ],
}

export const overlayReducer = (state = initialState, action: actionInterface)=>{
    let componentId: number = action.payload;
    switch(action.type){
        case "SET_OVERLAY_COMPONENT":
            let componentIndex: number = state.componentList.findIndex((x)=>{return x.id === componentId});
            if(componentIndex > -1){
                state = {...state, opendedComponents: [...state.opendedComponents, state.componentList[componentIndex]]};
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