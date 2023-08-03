import { actionInterface, packagesProps } from "../../interfaces/common"

type props = {
    allPackages: packagesProps[],
    showActiveDropDown: boolean,
    default: packagesProps
}

let initialState: props = {
    default: {
        active: false,
        cost: "0",
        durationList: ["month", "year"],
        duration: 0,
        features: [],
        numOfYearOrMonths: "1",
        tier: "",
        currency: "INR",
        id: "",
        title: ""
    },
    allPackages: [],
    showActiveDropDown: false
}

export const packageReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_ALL_PACKAGES":
            return state;
        case "ADD_NEW_TEMPLATE":
            return {
                ...state,
                allPackages: [...state.allPackages, {...state.default, id: String(Math.floor(Math.random() * 1000))}]
            }
        case "UPDATE_PACKAGE":
            let data: packagesProps & {newTempId?: string} = action.payload;
            let index: number = state.allPackages.findIndex((x)=>{return x.id === data.newTempId});
            if(index > -1){
                state.allPackages.splice(index, 1);
                delete data.newTempId
                state.allPackages.splice(index, 0, data);
            };
            return {...state, allPackages: [...state.allPackages]}
        case "MAP_SAVED_PACKAGE":
            let dbData: packagesProps[] = action.payload;
            // let mappedData = state.allPackages.map((d)=>{
            //     let index:number = dbData.findIndex((x)=>{return x.tier.toLowerCase() === d.tier.toLowerCase()});
            //     if(index > -1){
            //         return dbData[index]
            //     }else{
            //         return d
            //     }
            // });
            return {
                ...state,
                allPackages: [...dbData]
            }
        case "REMOVE_PACKAGE":
            let id: string = action.payload;
            let i: number = state.allPackages.findIndex((x)=>{return x.id === id});
            if(i > -1){
                state.allPackages.splice(i, 1)
            }
            return {...state, allPackages: [...state.allPackages]}
        case "RESET_REDUCER":
            if(action.payload === "packageReducer"){
                return {
                    ...initialState,
                    allPackages: [...initialState.allPackages]
                }
            }
            return state
        case "SHOW_ACTIVATE_PACKAGE":
            return {
                ...state,
                showActiveDropDown: action.payload
            }
        default:
            return state
    }
}