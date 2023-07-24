
import { Timestamp } from "firebase/firestore"

export type ibusiness = {
    name: string,
    createdDate?: Timestamp,
    logoUrl?: string,
    uid?: string,
    ownerId?: string,
    verified: boolean,
    location: string
}

export type mainStat = {
    amountToday: string,
    businessId: string,
    expiredSubs: string
    lastUpdated: Timestamp,
    newMembers: string,
    totalAmount: string,
    totalMembers: string,
    totalSubscribers: string,
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