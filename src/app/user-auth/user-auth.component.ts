import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, logIn, product, SignUp } from '../services/data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(private user : UserService, private product : ProductService){}
  showLogin:boolean=true;
  authError: undefined|string;
  ngOnInit(){
    this.user.reloadUser()
  }
  signUp(data:SignUp){
    this.user.userSignUp(data);
  }

  signIn(data:logIn){
    this.authError ="";
    this.user.userLogIn(data);
    this.user.islogInError.subscribe((error)=>
    {
      if(error){
        this.authError = "Email or Password is not correct"
      }else{
        this.localCartToRemoteCart();
      }
      setTimeout(() => {
        this.authError = undefined;
      }, 3000);
      
    })
  }
 openSignUp(){
    this.showLogin=false
  }
  openLogin(){
this.showLogin=true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

    if(data){
      let cartDataList : product[] = JSON.parse(data);
      
      cartDataList.forEach((product : product, index) => {
        let cartData : cart = {
          ...product,
          userId,
          productId: product.id
        };
        delete cartData.id;
        setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
      });
    }
    setTimeout(() => {
       this.product.getCartList(userId);
    }, 1000);
   
  }
}
