import { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { CancelTokenSource } from "axios"
import { Timestamp } from "firebase/firestore"
import { ibusiness } from "./business"

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
    // icon: string,
    // orgName: string,
    // location: string,
    onPress: any,
    // logo: string,
    data: ibusiness
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
    error: string,
    loading: boolean,
    token: string,
    phoneNumber: string
}

export type iOwner = {
    createdDate: Timestamp,
    name: string,
    phoneNumber: string,
    phoneVerified: boolean,
    uid: string,
    rating: string,
    stripeCustomerId?: string,
    emailId?: string,
    subscription?: iSubscriptionData,
    subscribedData?: iSubscribedData,
    eligibleForTrial?: boolean
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

export type iApiCall = {
    url: string, 
    axios: CancelTokenSource
}

export type iSubscription = {
    id: string,
    object: string,
    active: boolean,
    attributes: string[],
    created: number,
    default_price: string,
    description: null,
    features: any[],
    images: string[],
    livemode: boolean,
    metadata: {},
    name: string,
    package_dimensions: null,
    shippable: null | boolean,
    statement_descriptor: null | string,
    tax_code: null | string,
    type: string,
    unit_label: null | string,
    updated: number,
    url: null | string,
    priceData: any
}

export type iStripeCustomer = {
    name: string,
    emailId: string,
}

export type iRoleMetaData = {
    msgQuota: string,
    businessQuota: string,
    packageQuota: string,
    insightEligible: string
}

export type iSubscriptionData = {
    status: string,
    id: string,
    canceledAt?: number,
    expiresOn?: number, 
    nextInvoice?: number,
    startDate?: number,
    trialEnd?: number,
    priceId?: string,
    roles?: iRoleMetaData
}

export type iSubscribedData = {
    name: string,
    id: string
}

export type iStripeTransaction = {
    amount: number;
    amountRefunded: number;
    description: string | null;
    receiptUrl: string | null;
    refunded: boolean;
    status:  "failed" | "pending" | "succeeded";
    invoice: string | null;
    id: string;
    created: number
} 