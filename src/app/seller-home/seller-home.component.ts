import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  deleteIcon = faTrash;
  editIcon = faEdit
  productList : undefined|product[];
  productMessage : undefined|string;
  constructor(private product : ProductService){}

  ngOnInit(){
    this.getProductList();
  }

  getProductList(){
    this.product.productList().subscribe((result)=>
    {
      if(result){
      this.productList = result;
      }
    })
  }

  deleteProduct(data:product,id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage = `${data.name} got deleted`;
        this.productList = this.productList?.filter(item => item.id !== id);
         setTimeout(() => {
        this.productMessage = undefined;
      }, 1000);
      }
    })
  }
}
