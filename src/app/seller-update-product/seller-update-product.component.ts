import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  constructor(private route: ActivatedRoute, private product : ProductService, private router: Router){}
  productData :  product = {
    name: '',
    price: 0,
    category: '',
    color: '',
    description: '',
    image: '',
    id: 0
  };
  productMessage : undefined|string;

  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id');
    if(productId){
    this.product.getProduct(productId).subscribe((data=>
    {
      console.log(data);
      this.productData= data;
    }
    ));
    }
  }
  updateProduct(data:product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = `${this.productData?.name} got updated`;
        setTimeout(() => {
        this.productMessage = undefined;
              this.router.navigateByUrl("/seller-home");
      }, 3000);
      // this.router.navigateByUrl("/seller-home");
      }
    })
  }

}
