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
