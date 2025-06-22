import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { SignUp } from '../services/data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  constructor(private seller: SellerService,
    private router: Router 
  ){}
  authError:string = "";
  showLogin:boolean = false;
  ngOnInit(){
    this.seller.reloadSeller();
  }
  signUp(data:SignUp): void{
    this.seller.userSignUp(data);
  }

  openLogIn(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
  signIn(data:any){
    this.authError =""
    this.seller.userSignIn(data);
    this.seller.islogInError.subscribe((error)=>
    {
      if(error){
        this.authError = "Email or Password is not correct"
      }
    })
  }
}
