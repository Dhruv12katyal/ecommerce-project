import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  cartData = new EventEmitter<product[]|[]>();
  addProduct(data:product){
    return this.http.post("http://localhost:3000/products",
      data,
    )
  }

  productList(){
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
 }

 popularProducts(){
   return this.http.get<product[]>("http://localhost:3000/products?_limit=3");
 }

 trendyProducts(){
   return this.http.get<product[]>("http://localhost:3000/products?_limit=12");
 }

 searchProduct(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data:product){
    let cartData =[];
    let localCart= localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
     cartData = JSON.parse(localCart);
     cartData.push(data);
     localStorage.setItem('localCart',JSON.stringify(cartData));
     this.cartData.emit(cartData);
    }
    
   }

   removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      const items = JSON.parse(cartData);
      // Implement logic to remove the item with productId from items array
      const updatedCart = items.filter((item: product) => item.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(updatedCart));
      this.cartData.emit(updatedCart);
    }
   }

   addToCart(cartData: cart){
   return this.http.post("http://localhost:3000/cart",
      cartData,
    )
   }

   getCartList(userId: number){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`,
      {observe : 'response'}
    ).subscribe((result)=>{
      if(result && result.body){
         this.cartData.emit(result.body);
      }
     
    })
   }

   removeToCart(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
   }

   currentCart(){
     let userStore = localStorage.getItem('user');
     let userData = userStore && JSON.parse(userStore);
     return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userData.id}`)
   }

   orderNow(data: order){
    return this.http.post("http://localhost:3000/orders",data);
   }

   getOrders(){
     let userStore = localStorage.getItem('user');
     let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(`http://localhost:3000/orders?userId=${userData.id}`)
   }

   deleteCartItems(cartId:number){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`,
      {observe : 'response'}
    ).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    });
   }
}
