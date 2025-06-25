import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  addProductMessage: string|undefined;
  constructor(private product : ProductService){}
  submitProduct(data:product, form: NgForm){
    this.product.addProduct(data).subscribe((result)=>
    {
      if(result){
        this.addProductMessage = "Product successfully got added";
        setTimeout(() => {
        this.addProductMessage = undefined;
      }, 1000);
      form.reset();
      }
      console.log(result);
      
    })
  }

}
