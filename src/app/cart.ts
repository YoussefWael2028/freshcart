import { Product } from "./products";

export interface Cart {
    numOfCartItems: number;
    cartId: string;
    data: Data;
  }
  
  export interface Data {
    _id: string;
    products: cartProducts[];
    totalCartPrice: number;
  }
  
  export interface cartProducts {
    count: number;
    product: Product;
    price:number;
  }
  
