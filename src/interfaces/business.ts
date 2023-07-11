
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