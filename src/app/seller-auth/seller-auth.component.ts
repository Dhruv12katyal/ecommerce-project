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
  signUp(data:SignUp): void{
    this.seller.userSignUp(data).subscribe((result) =>{
      alert("sign up successful")
      if(result){
        this.router.navigateByUrl("/seller-home")
      }
      console.log(result);
      
    })
    
  }
}
