import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { logIn, SignUp } from '../services/data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  constructor(private user : UserService){}
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
}
