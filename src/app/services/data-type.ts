export interface SignUp{
    name: string,
    email: string,
    password: string
}

export interface logIn{
    email: string,
    password: string
}

export interface product {
    name: string,
    price:number,
    category : string,
    color: string,
    description: string,
    image: string,
    id: number,
    quantity: undefined|number,
    productId: undefined|number

}

export interface cart {
    name: string,
    price:number,
    category : string,
    color: string,
    description: string,
    image: string,
    id: number|undefined,
    quantity: undefined|number,
    userId: number,
    productId: number
}

export interface priceSummary{
  subTotal:number,
  discount:number,
  tax:number,
  total:number
}

export interface order{
    name: string,
    address : string,
    phone : number,
    total ?: number,
    subtotal?: number,
    tax?: number,
    discount?: number,
    userId: number,
    payment: string,
    id: number
    
}