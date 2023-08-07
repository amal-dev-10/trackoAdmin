import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { Timestamp } from "firebase/firestore"

export type inputProps = {
    value: string,
    msg: string,
    placeHolder: string,
    keyBoardType: string,
    icon: string,
    valid: boolean,
    name: string,
    focus: boolean,
    editable: boolean,
    id: number,
    showVerifyBtn?: boolean
}

export type orgProps = {
    icon: string,
    orgName: string,
    id: string,
    onPress: any
}

export type bottomTabProps = {
    id: number,
    name: string,
    icon: string,
    active: boolean
}

export type tabDataInterface = {
    activeComponentId: number,
    allTabs: bottomTabProps[]
}

export type actionInterface = {
    type: string,
    payload: any
}

export type memberShipProps = {
    name: string,
    tier: string,
    validFrom: Date,
    validThru: Date,
    phoneNumber: string,
    id: string
}

export type requestsProps = {
    name: string,
    image: string,
    date: Date,
    age: string,
    phoneNumber: string,
    id: string
}

export type packagesProps = {
    tier: string,
    features: string[],
    cost: string,
    durationList: string[],
    duration: number,
    numOfYearOrMonths: string,
    active: boolean,
    currency: string,
    id: string,
    title: string
}

export type overlayComponent = {
    name: string,
    id: number,
    screenName?: string
}

export type profileButtonProps = {
    icon: string,
    name: string,
    id: number,
    opened: boolean,
    subButtons: subButtonProps[]
}

export type subButtonProps = {
    name: string, 
    id: number, 
    icon: string
}

export type dropDownProps = {
    label: string, 
    value: string
}

export type loaderProps = {
    show: boolean
}

export type authProps = {
    confirmation: FirebaseAuthTypes.ConfirmationResult | null,
    isAuthenticated: boolean,
    showSplash: boolean,
    user: any,
    error: string,
    loading: boolean,
    token: string
}

export type apiResponse = {
    data: any,
    status: any,
    message: string
}

export type openOverlayParameter = {
    id: number,
    mode: string
}

export type iTransactions = {
    transactionId: string,
    name?: string,
    dateString: string,
    packDetails: packagesProps
}

export type confirmationModal = {
    showConfirmModal: boolean,
    msg: string,
    title: string,
    confirm: boolean
}