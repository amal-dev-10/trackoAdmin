
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { navigate, resetNavigation } from '../../navigations/NavigationService';
import { apiResponse } from '../../interfaces/common';
import { getOwnerById } from '../../services/apiCalls/serviceCalls';
import { showToast } from '../../utils/helper';
import { closeOverlayComponent, resetReducerAction } from '.';

export const isAuthenticatedAction = (is: boolean)=>({
    type: "SETISAUTHENTICATED",
    payload: is
});

const phoneAuthStart = () => ({
    type: "PHONE_AUTH_START",
});

const phoneCodeSuccess = (confirmation: FirebaseAuthTypes.ConfirmationResult)=>({
    type: "PHONE_CODE_SUCCESS",
    payload: confirmation
})

const phoneAuthSuccess = (user: any) => ({
    type: "PHONE_AUTH_SUCCESS",
    payload: user,
});

const phoneAuthFailure = (error: string) => ({
    type: "PHONE_AUTH_FAILURE",
    payload: error,
});

const logoutAction = ()=>({
    type: "LOGOUT"
})

export const resetStateAction = ()=>({
    type: "RESET_STATE"
});

export const setTokenAction = (token: string)=>({
    type: "SET_TOKEN",
    payload: token
})

export const signInWithPhoneNumber = (phoneNumber: string)=>{
    return async(dispatch: any)=>{
        dispatch(phoneAuthStart());
        try{
            const confirmation = await auth().signInWithPhoneNumber("+91"+phoneNumber);
            if(confirmation.verificationId){
                navigate("Otp");
                dispatch(phoneCodeSuccess(confirmation));
            }else{
                showToast("Something went wrong.")
            }
        }
        catch (err: any){
            console.log(err)
            showToast("Something went wrong.")
            dispatch(phoneAuthFailure(err?.message || "failed"));
        }
    }
}

export const verfyOtpCode = (code: string, confirm: FirebaseAuthTypes.ConfirmationResult)=>{
    return async (dispatch: any)=>{
        dispatch(phoneAuthStart());
        try{
            let user = await confirm.confirm(code);
            if(user){
                dispatch(phoneAuthSuccess(user));
                let token: string = await user.user.getIdToken();
                dispatch(setTokenAction(token))
                let res = await getOwnerById(user.user?.uid || "");
                if(res && res.data){
                    navigate("MainStack");
                }else{
                    navigate("Signup")
                }
            }else{
                showToast("Verification failed.");
                dispatch(phoneAuthFailure("Invalid OTP"));
            }
        }
        catch(err: any){
            dispatch(phoneAuthFailure(err?.message || "Invalid OTP"))
        }
    }
}

export const logout = ()=>{
    return async (dispatch: any)=>{
        await auth().signOut();
        resetNavigation(0);
        dispatch(logoutAction());
        dispatch(resetReducerAction("authReducer"))
        dispatch(closeOverlayComponent(2));
        // navigate("AuthStack");
    }
}

