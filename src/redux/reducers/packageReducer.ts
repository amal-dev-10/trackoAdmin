import { actionInterface, packagesProps } from "../../interfaces/common"

type props = {
    allPackages: packagesProps[],
    showActiveDropDown: boolean
}

let initialState: props = {
    allPackages: [
        {
            active: false,
            cost: "0",
            durationList: ["month", "year"],
            duration: 0,
            features: [],
            numOfYearOrMonths: "1",
            tier: "gold",
            currency: "INR",
            id: "123d1231231"
        },
        {
            active: false,
            cost: "0",
            durationList: ["month", "year"],
            duration: 0,
            features: [],
            numOfYearOrMonths: "1",
            tier: "silver",
            currency: "INR",
            id: "123d1231232"
        },
        {
            active: false,
            cost: "0",
            durationList: ["month", "year"],
            duration: 0,
            features: [],
            numOfYearOrMonths: "1",
            tier: "bronze",
            currency: "INR",
            id: "123d1231233"
        }
    ],
    showActiveDropDown: false
}

export const packageReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_ALL_PACKAGES":
            return state;
        case "UPDATE_PACKAGE":
            let data: packagesProps = action.payload;
            let index: number = state.allPackages.findIndex((x)=>{return x.tier === data.tier});
            if(index > -1){
                state.allPackages.splice(index, 1);
                state.allPackages.splice(index, 0, data);
            };
            return state
        case "MAP_SAVED_PACKAGE":
            let dbData: packagesProps[] = action.payload;
            let mappedData = state.allPackages.map((d)=>{
                let index:number = dbData.findIndex((x)=>{return x.tier.toLowerCase() === d.tier.toLowerCase()});
                if(index > -1){
                    return dbData[index]
                }else{
                    return d
                }
            });
            return {
                ...state,
                allPackages: [...mappedData]
            }
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