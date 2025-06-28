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
  ngOnInit(){
    this.user.reloadUser()
  }
  signUp(data:SignUp){
    this.user.userSignUp(data);
  }

  signIn(data:logIn){

  }
  openSignUp(){

  }

}
