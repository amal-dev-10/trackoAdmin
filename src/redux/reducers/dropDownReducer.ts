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
        { label: 'JAN', value: 'jan' },
        { label: 'FEB', value: 'feb' },
        { label: 'MAR', value: 'mar' },
        { label: 'APR', value: 'apr' },
        { label: 'MAY', value: 'may' },
        { label: 'JUN', value: 'jun' },
        { label: 'JUL', value: 'jul' },
        { label: 'AUG', value: 'aug' },
        { label: 'SEP', value: 'sep' },
        { label: 'OCT', value: 'oct' },
        { label: 'NOV', value: 'nov' },
        { label: 'DEC', value: 'dec' },
    ]
}

export const dropDownReducer = (state = initialState, action: actionInterface)=>{
    switch(action.type){
        default:
            return state
    }
}