import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { logIn, SignUp } from './data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserSignedUp = new BehaviorSubject<boolean>(false);
  islogInError = new EventEmitter<boolean>(false);
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
    if(localStorage.getItem("user")?.length==1){
      this.isUserSignedUp.next(true);
      this.router.navigateByUrl("");
    }
  }

  userLogIn(data: logIn){
    this.http.get(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
      {observe: 'response'}
    ).subscribe((result:any)=>{
      if(result && result.body && result.body .length === 1){
        this.islogInError.emit(false);
       localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate([''])
        
      }else{
          this.islogInError.emit(true);
        }
    })
  }

}
