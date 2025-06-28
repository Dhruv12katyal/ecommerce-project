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
  productQuantity : number = 1;

  ngOnInit() {
  this.activteRoute.paramMap.subscribe(params => {
    const productId = params.get('productId');
    if (productId) {
      this.product.getProduct(productId).subscribe((product) => {
        this.productData = product;
      });
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
}
