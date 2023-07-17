import { actionInterface, authProps } from "../../interfaces/common"
import auth from '@react-native-firebase/auth'
import { navigate } from "../../navigations/NavigationService"

type props = {
    data: authProps
}

let initialState: props = {
    data: {
        confirmation: null,
        isAuthenticated: false,
        showSplash: true,
        user: {},
        error: "",
        loading: false,
        token: ""
    }
} as props

export const authReducer = (state: props = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SETISAUTHENTICATED":
            return {
                data:{
                    ...state.data,
                    isAuthenticated: action?.payload
                },
            }
        case "PHONE_AUTH_START":
            return {
                data:{
                    ...state.data,
                    loading: true
                }
            }
        case "PHONE_CODE_SUCCESS":
            return {
                data:{
                    ...state.data,
                    confirmation: action.payload,
                    loading: false
                }
            }
        case "PHONE_AUTH_SUCCESS":
            return {
                data:{
                    ...state.data,
                    loading: false,
                    user: action.payload
                }
            }
        case "PHONE_AUTH_FAILURE":
            return {
                data:{
                    ...state.data,
                    loading: false,
                    error: action.payload,
                    user: null
                }
            }
        case "LOGOUT":
            return {
                data:{
                    ...state.data,
                    isAuthenticated: false,
                    loading: false,
                    user: null
                }
            }
        case "SET_TOKEN":
            return {
                data: {
                    ...state.data,
                    token: action.payload
                }
            }
        case "LOADING":
            return {
                data:{
                    ...state.data,
                    loading: action.payload
                }
            }
        case "RESET_STATE":
            return {
                data:{
                    ...initialState.data,
                    token: state.data.token
                }
            } 
        default:
            return state
    }
}