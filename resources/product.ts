import {ChangeEventHandler, createContext} from 'react'

export interface ProductForm {
    id:string,
    name: string,
    sale_price:number,
    purchase_price:number,
    units_in_inventory:number,

}
export const initialState: ProductForm =
{
    id:"",
    name : "" ,
    sale_price:0,
    purchase_price:0,
    units_in_inventory:0,

}

  
export interface ProductContextData {
    handleChange: Function | null,
    data: ProductForm,
}

const contextData:ProductContextData={
    data: initialState,
    handleChange: null,
}

export const ProductContext = createContext<ProductContextData>(contextData)