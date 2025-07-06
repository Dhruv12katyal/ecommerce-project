import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../services/data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartItems: cart[]|undefined;
  priceSummary : priceSummary={
    subTotal: 0,
    discount: 0,
    tax: 0,
    total: 0
  }

  constructor(private productService: ProductService,private router : Router) {}

  ngOnInit(): void {
   this.loadDetails();
  }

 loadDetails(){
   this.productService.currentCart().subscribe((result) => {
      this.cartItems = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.priceSummary.subTotal = price;
      this.priceSummary.discount = price*0.05;
      this.priceSummary.tax = price*0.10;
      this.priceSummary.total = price+ this.priceSummary.tax - this.priceSummary.discount;
      if(!this.cartItems.length){
         this.router.navigateByUrl('/');
      }
    });
 }

  goToCheckout(){
    this.router.navigateByUrl('checkout')
  }
 

  removeFromCart(cartId: number | undefined) {
      cartId && this.productService.removeToCart(cartId)
      .subscribe((result)=>{
        if(result){
          this.loadDetails();
        }
      });
  }
}