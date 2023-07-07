import { FirebaseAuthTypes } from "@react-native-firebase/auth"

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
    id: number
}

export type orgProps = {
    icon: string,
    orgName: string,
    id: string
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
    id: string
}

export type overlayComponent = {
    name: string,
    id: number
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
