import { actionInterface, authProps, iOwner } from "../../interfaces/common"

type props = {
    data: authProps,
    user: iOwner
}

let initialState: props = {
    data: {
        confirmation: null,
        isAuthenticated: false,
        showSplash: true,
        error: "",
        loading: false,
        token: "",
        phoneNumber: ""
    },
    user: {

    }
} as props

export const authReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SETISAUTHENTICATED":
            return {
                ...state,
                data:{
                    ...state.data,
                    isAuthenticated: action?.payload
                },
            }
        case "PHONE_AUTH_START":
            return {
                ...state,
                data:{
                    ...state.data,
                    loading: true,
                    phoneNumber: action.payload
                }
            }
        case "PHONE_CODE_SUCCESS":
            return {
                ...state,
                data:{
                    ...state.data,
                    confirmation: action.payload,
                    loading: false
                }
            }
        case "PHONE_AUTH_SUCCESS":
            let temp = {
                ...state,
                data:{
                    ...state.data,
                    loading: false,
                },
                user: JSON.parse(JSON.stringify(action.payload))
            }
            return {...JSON.parse(JSON.stringify(temp))}
        case "PHONE_AUTH_FAILURE":
            return {
                ...state,
                data:{
                    ...state.data,
                    loading: false,
                    error: {...action.payload},
                },
                user: null
            }
        case "LOGOUT":
            return {
                ...state,
                data:{
                    ...state.data,
                    isAuthenticated: false,
                    loading: false,
                },
                user: null
            }
        case "SET_TOKEN":
            return {
                ...state,
                data: {
                    ...state.data,
                    token: action.payload
                }
            }
        case "LOADING":
            return {
                ...state,
                data:{
                    ...state.data,
                    loading: action.payload
                }
            }
        case "RESET_STATE":
            return {
                ...state,
                data:{
                    ...initialState.data,
                    token: state.data.token
                }
            }
        case "RESET_REDUCER":
            if(action.payload === "authReducer"){
                return {...initialState}
            }
            return state
        default:
            return state
    }
}