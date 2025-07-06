import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../services/data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(private activteRoute: ActivatedRoute, private product:ProductService){}
  productData : undefined|product;
  productQuantity : number = 1;
  removeCart : boolean = false;
  cartData : product|undefined;

  ngOnInit() {
  this.activteRoute.paramMap.subscribe(params => {
    const productId = params.get('productId');
    if (productId) {
      this.product.getProduct(productId).subscribe((product) => {
        this.productData = product;

        let cartData = localStorage.getItem('localCart');
        if(productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item:product)=>(product.id == item.id));
          if(items.length){
            this.removeCart = true;
          }else{
            this.removeCart = false;
          }
        }
      });
    }
    let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        debugger;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
       if(item.length){
        this.removeCart=true;
        this.cartData = item[0];
       }
        })
      }
  });
}

  handleQuantity(val:string){
    if(this.productQuantity<20 && val === 'plus') {
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val === 'min'){
      this.productQuantity-=1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId : this.productData.id
        }
        delete cartData.id; 
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId:number){
     if(!localStorage.getItem('user')){
    this.product.removeItemFromCart(productId);
     this.removeCart = false;
     }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData?.id)
      .subscribe((result)=>{
        if(result){
          this.product.getCartList(userId);
        }
      });
      this.removeCart = false;
     }
  }
}
