import { actionInterface, iStripeTransaction, iSubscription } from "../../interfaces/common"

type props = {
    subscriptionPlans: iSubscription[],
    savedCards: any[],
    stripeTransactions: iStripeTransaction[]
}

let initialState = {
    subscriptionPlans: [],
    savedCards: [],
    stripeTransactions: []
} as props

export const monetizationReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        case "SET_SUBSCRIPTION_DETAILS":
            return {
                ...state,
                subscriptionPlans: [...action.payload]
            }
        case "SET_SAVED_CARDS":
            return {
                ...state,
                savedCards: [...action.payload]
            }
        case "SET_STRIPE_TRANSACTIONS":
            return {
                ...state,
                stripeTransactions: [
                    ...action.payload
                ]
            }
        default:
            return state
    }
}