import { actionInterface, bottomTabProps, tabDataInterface } from "../../interfaces/common"

let initialState: tabDataInterface = {
    activeComponentId: 0,
    adminTabs: [    
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
    ],
    clientTabs: [ 
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
        }
    ],
    allTabs: []
}

export const bottomTabReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_TABS":
            let temp = [] as bottomTabProps[]
            if(action.payload === "admin"){
                temp = state.adminTabs;
            }else if(action.payload === "client"){
                temp = state.clientTabs
            }
            return {
                ...state,
                allTabs: temp
            }
        case "TAB_ICON_CLICKED":
            let tabId = parseInt(action.payload);
            let selectedComponentId: number = 0;
            let t = state.allTabs.map((tab)=>{
                if(tab.id === tabId){
                    tab.active = true;
                    selectedComponentId = tabId;
                }else{
                    tab.active = false;
                }
                return tab
            });
            return {
                ...state,
                activeComponentId: selectedComponentId,
                allTabs: [...t]
            } as tabDataInterface
        case "RESET_REDUCER":
            if(action.payload === "tabReducer"){
                let temp = state.allTabs.map((x, i: number)=>{
                    i === 0 ? x.active = true : x.active = false;
                    return x
                });
                return {...initialState, allTabs: [...temp], activeComponentId: 0}
            }
            return state
        default:
            return state;
    }
}