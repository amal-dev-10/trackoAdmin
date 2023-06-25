import { actionInterface, packagesProps } from "../../interfaces/common"

type props = {
    allPackages: packagesProps[]
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
            currency: "INR"
        },
        {
            active: false,
            cost: "0",
            durationList: ["month", "year"],
            duration: 0,
            features: [],
            numOfYearOrMonths: "1",
            tier: "silver",
            currency: "INR"
        },
        {
            active: false,
            cost: "0",
            durationList: ["month", "year"],
            duration: 0,
            features: [],
            numOfYearOrMonths: "1",
            tier: "bronze",
            currency: "INR"
        }
    ]
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
        default:
            return state
    }
}