
import { Timestamp } from "firebase/firestore"

export type ibusiness = {
    name: string,
    createdDate?: Timestamp,
    logoUrl?: string,
    uid?: string,
    ownerId?: string,
    verified: boolean,
    location: string,
    rating?: string
}

export type mainStat = {
    totalMembership: string,
    membershipToday: string,
    membershipThisMonth: string,
    expiredSubs: string,
    totalAmount: string,
    amountToday: string,
    amountThisMonth: string,
    totalMembers: string,
    newMembersThisMonth: string,
    membersToday: string
    businessId: string,
    lastUpdated: Timestamp,
    day?: string,
    month?: string
}

export type iMembershipInsight = {
    totalAmount: string,
    goldCount: string,
    silverCount: string,
    bronzeCount: string,
    goldAmount: string,
    silverAmount: string,
    bronzeAmount: string,
    year: string,
    month: string
}

export type iFinanceInsight = {
    zooomDomain: {x: [number, number], y: [number, number]},
    data: {x: number, y: number}[],
    year: string,
    month: string
}

export type iMessageResponse = {
    error: number | null,
    errorMessage: string,
    clientId: string
}