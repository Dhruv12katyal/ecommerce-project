import { Component, OnInit } from '@angular/core';
import { cart, order, priceSummary } from '../services/data-type';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private product : ProductService, private router: Router){}
  cartItems: cart[]|undefined;
  priceSummary: priceSummary = {
    subTotal: 0,
    tax: 0,
    discount: 0,
    total: 0
  };
  orderSuccess = false;
  orderMessage:  string|undefined;
  ngOnInit() {
   this.product.currentCart().subscribe((result) => {
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
    })
  }

  placeOrder(formValue: order, form: NgForm) {
    // Implement order placement logic here
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.priceSummary){
      let orderData:  order = {
        ...formValue,
        userId,
        subtotal:this.priceSummary.subTotal,
        tax: this.priceSummary.tax,
        discount: this.priceSummary.discount,
        total : this.priceSummary.total
      }
      this.cartItems?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 800);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          form.reset();
          this.orderMessage = "Your order has been placed";
          setTimeout(() => {
            this.router.navigateByUrl('my-orders');
          }, 3000);
        }
      })
    }
  }
}