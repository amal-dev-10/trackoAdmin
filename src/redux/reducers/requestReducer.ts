import { actionInterface, requestsProps } from "../../interfaces/common"

type props = {
    allRequests: requestsProps[]
}

let initialState: props = {
    allRequests: [
        {
            age: "23",
            date: new Date(),
            id: "1",
            image: "",
            name: "Amal Dev",
            phoneNumber: "7902992447"
        },
        {
            age: "23",
            date: new Date(),
            id: "2",
            image: "",
            name: "Rahul Sivan",
            phoneNumber: "7902992447"
        },
        {
            age: "23",
            date: new Date(),
            id: "2",
            image: "",
            name: "Midhun Jayapradeep",
            phoneNumber: "7902992447"
        }
    ]
}

export const requestReducer = (state=initialState, action: actionInterface)=>{
    switch(action.type){
        case "GET_REQUESTS":
            return state;
        default:
            return state
    }
}