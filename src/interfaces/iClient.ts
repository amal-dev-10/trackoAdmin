import { Timestamp } from "firebase/firestore"

export type iClient = {
    phoneNumber: string,
    countryCode: string,
    name: string,
    dateOfBirth?: Timestamp,
    phoneVerified: boolean,
    createdDate?: Timestamp,
    dobDate?: Date,
    uid?: string,
    profileImageUrl?: string,
    age?: string
}

export type iMembership = {
    name: string,
    phoneNumber: string,
    since: string,
    clientId: string,
    phoneVerified: boolean,
    profileImageUrl?: string,
    memberShipDetails: iMembershipDetails
}

export type iMembershipDetails = {
    validFrom: Timestamp, 
    validThru: Timestamp, 
    tier: string,
    expired: boolean,
    validFromString?: string,
    validThruString?: string,
    expireIn?: number,
    notifiedOn?: any,
    notified?: boolean
}

export type iExpiredData = {
    ended: Timestamp,
    endedString: string,
    name: string,
    tier: string,
    clientId: string,
    phoneNumber: string,
    countryCode: string,
    notifiedOn?: Timestamp,
    notified?: boolean,
    phoneVerified: boolean,
    profileImageUrl?: string
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

export type iFilters = {
    tabName: string,
    active: boolean,
    id: string,
    filters: subFilters[]
}

export type subFilters = {
    active: boolean, 
    name: string, 
    value: string, 
    count: number,
    id: string
}

export type iFilterCounts = {
    gold: number,
    silver: number,
    bronze: number,
    noMembership: number,
    expired: number
}

export type updatableClient = {
    name?: string,
    dateOfBirth?: Timestamp,
    phoneVerified?: boolean,
}

export type iBusinessClientSettings = {
    createdAt: Timestamp,
    uid: string,
    phoneVerified: boolean,
    settings: string
}
