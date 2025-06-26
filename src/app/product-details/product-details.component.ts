import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(private activteRoute: ActivatedRoute, private product:ProductService){}
  productData : undefined|product;
  ngOnInit(){
    let productId = this.activteRoute.snapshot.paramMap.get('productId');
    if(productId){
      this.product.getProduct(productId).subscribe((product)=>{
        console.log(product);
        this.productData = product;
      });
    }
  }
}
