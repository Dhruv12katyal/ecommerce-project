import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouteReuseStrategy, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../services/data-type';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router : Router, private product : ProductService){}
  sellerName: string = "";
  menuType: string = "default";
  searchResult : undefined|product[];
  userName:string="";
  ngOnInit(){
    this.router.events.subscribe((val:any)=>
    {
      if(val.url){
       if( localStorage.getItem("seller") && val.url.includes("seller")) {
        this.menuType = "seller"
        let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
        
       } else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
       else{
        this.menuType= "default"
       }
      }
      
    })
  }

  logout(){
    localStorage.removeItem("seller");
    this.router.navigateByUrl("/seller-home");
  }

   userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((data)=>
      {
        this.searchResult= data;
      });      
    }
  }

   hideSearch(){
    this.searchResult=undefined
  }

  submitSearch(val:string){
    this.router.navigate([`search/${val}`]);
  }

  redirectToDetails(id:number){
    this.router.navigateByUrl(`product-details/${id}`);
  }

}
