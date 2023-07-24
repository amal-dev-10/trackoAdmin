import { Timestamp } from "firebase/firestore"

export type iClient = {
    phoneNumber: string,
    countryCode: string,
    name: string,
    dateOfBirth?: Timestamp,
    phoneVerified: boolean,
    createdDate?: Timestamp,
    uid?: string
}

export type iMembership = {
    name: string,
    phoneNumber: string,
    since: string,
    clientId: string,
    memberShipDetails: iMembershipDetails
}

export type iMembershipDetails = {
    validFrom: Timestamp, 
    validThru: Timestamp, 
    tier: string,
    expired: boolean,
    validFromString?: string,
    validThruString?: string,
    expireIn?: number
}

export type iExpiredData = {
    ended: Timestamp,
    endedString: string,
    name: string,
    tier: string,
    clientId: string,
    phoneNumber: string,
    countryCode: string,
}

export type iFilterQuery = {
    count?: number,
    search?: string,
    gold?: boolean | null,
    silver?: boolean | null,
    bronze?: boolean | null,
    expired?: boolean | null,
    noMembership?: boolean | null,
}