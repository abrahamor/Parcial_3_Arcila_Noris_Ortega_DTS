import {ChangeEventHandler, createContext} from 'react'

export interface ServiceForm {
    id:string,
    name: string,
    sale_price:number,
    cost_of_service:number
}
export const initialState: ServiceForm =
{
    id:"",
    name : "" ,
    sale_price : 0,
    cost_of_service:0
}

export interface ServiceContextData {
    handleChange: Function | null,
    data: ServiceForm,

}

const contextData:ServiceContextData={
    data: initialState,
    handleChange: null,
}

export const ServiceContext = createContext<ServiceContextData>(contextData)