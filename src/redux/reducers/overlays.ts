import { actionInterface, overlayComponent } from "../../interfaces/common"

type stateInterface = {
    component: overlayComponent,
    componentList: overlayComponent[],
    defaultComponent: overlayComponent
}

let initialState: stateInterface = {
    component: {name: "", id: 0},
    componentList:[
        {id: 1, name: "TRANSACTIONS"},
        {id: 2, name: "PROFILE"},
        {id: 3, name: "ALL TRANSACTIONS"},
        {id: 4, name: "TERMS & CONDITIONS"},
        {id: 5, name: "SETTINGS"},
    ],
    defaultComponent: {name: "", id: 0}
}

export const overlayReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_OVERLAY_COMPONENT":
            let componentId: number = action.payload;
            if(componentId != 0){
                let component: overlayComponent = state.componentList.find((x)=>{return x.id === componentId}) || state.defaultComponent;
                state = {...state, component: component};
            }else{
                state = {...state, component: state.defaultComponent};
            }
            return state;
        default:
            return state;
    }
}