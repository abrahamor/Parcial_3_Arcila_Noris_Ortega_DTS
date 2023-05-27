export interface CartService {
    id:string,
    name: string,
    sale_price:number,
    cost_of_service:number,
  
  }
  export const initialStateService: CartService =
  {
    id:"",
    name : "" ,
    sale_price:0,
    cost_of_service:0,
  }
  export interface CartProduct {
    id:string,
      name: string,
      sale_price:number,
      purchase_price:number,
      units_in_inventory:number,
  
  }
  export const initialStateProduct: CartProduct =
  {
    id:"",
    name : "" ,
    sale_price:0,
    purchase_price:0,
    units_in_inventory:0,
  }