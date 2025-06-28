import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from './data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserSignedUp = new BehaviorSubject<boolean>(false);
  constructor(private http : HttpClient, private router : Router) { }

  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/user",user,{observe: 'response'})
    .subscribe((result)=>{
      this.isUserSignedUp.next(true);
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate([''])
      }
      
    })
  }

  reloadUser(){
    if(localStorage.getItem("user")){
      this.isUserSignedUp.next(true);
      this.router.navigateByUrl("");
    }
  }

}
