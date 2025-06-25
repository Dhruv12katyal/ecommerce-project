import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';
@Component({
  selector: 'app-home',
  imports: [NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  	popularProducts : undefined|product[];
    trendyProducts :  undefined|product[];
    constructor(private product : ProductService){}

    ngOnInit(): void{
      this.product.popularProducts().subscribe((result)=>{
        this.popularProducts = result;
        
      });
      this.product.trendyProducts().subscribe((result)=>{
        this.trendyProducts = result;
      });
    }

}
