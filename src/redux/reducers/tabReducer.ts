import { actionInterface, bottomTabProps, tabDataInterface } from "../../interfaces/common"

let initialState: tabDataInterface = {
    activeComponentId: 0,
    allTabs: [
        {
            active: true,
            icon: "home-1",
            id: 0,
            name: "Home"
        },
        {
            active: false,
            icon: "users",
            id: 1,
            name: "Clients"
        },
        {
            active: false,
            icon: "user-add",
            id: 2,
            name: "Requests"
        },
        {
            active: false,
            icon: "chart-line",
            id: 3,
            name: "Insights"
        },
        {
            active: false,
            icon: "dropbox",
            id: 4,
            name: "Packages"
        }
    ]
}

export const bottomTabReducer = (state= initialState, action: actionInterface)=>{
    switch(action.type){
        case "TAB_ICON_CLICKED":
            let tabId = parseInt(action.payload);
            let selectedComponentId: number = 0;
            let updatedTab: bottomTabProps[] = state.allTabs.map((tab)=>{
                if(tab.id === tabId){
                    tab.active = true;
                    selectedComponentId = tabId;
                }else{
                    tab.active = false;
                }
                return tab
            });
            return {
                activeComponentId: selectedComponentId,
                allTabs: updatedTab
            } as tabDataInterface
        default:
            return state;
    }
}