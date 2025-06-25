import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable} from '@angular/core';
import { logIn, SignUp } from './data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  isSellerSignedUp = new BehaviorSubject<boolean>(false);
  islogInError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data:SignUp){
    debugger;
      this.http.post("http://localhost:3000/seller",
      data,
    {observe:'response'}).subscribe((result)=>
    {
      this.isSellerSignedUp.next(true);
      localStorage.setItem("seller" ,JSON.stringify(result.body));
      debugger;
      this.router.navigate(['seller-home'])
    });
  }

  reloadSeller(){
    if(localStorage.getItem("seller")){
      this.isSellerSignedUp.next(true);
      this.router.navigateByUrl("/seller-home");
    }
  }

  userSignIn(data: logIn) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length === 1) {
          this.islogInError.emit(false);
          localStorage.setItem("seller", JSON.stringify(result.body));
          // alert("login successful")
          debugger;
          this.router.navigateByUrl('/seller-home').then(() => {
            console.log('Navigation to seller-home completed');
            // this.cdr.detectChanges();
          });
        }else{
          this.islogInError.emit(true);
        }
      })
  }
}
