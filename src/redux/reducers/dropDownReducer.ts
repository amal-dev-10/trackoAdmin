import { actionInterface, dropDownProps } from "../../interfaces/common"

type props  =  {
    years: dropDownProps[],
    months: dropDownProps[]
}

let initialState: props = {
    years: [
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' }, 
    ],
    months: [
        { label: 'JANUARY', value: 'january' },
        { label: 'FEBRUARY', value: 'february' },
        { label: 'MARCH', value: 'march' },
        { label: 'APRIL', value: 'april' },
        { label: 'MAY', value: 'may' },
        { label: 'JUNE', value: 'june' },
        { label: 'JULY', value: 'july' },
        { label: 'AUGUST', value: 'august' },
        { label: 'SEPTEMBER', value: 'september' },
        { label: 'OCTOBER', value: 'october' },
        { label: 'NOVEMBER', value: 'november' },
        { label: 'DECEMBER', value: 'december' },
    ]
}

export const dropDownReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        default:
            return state
    }
}