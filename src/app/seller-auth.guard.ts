import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

export const sellerAuthGuard: CanActivateFn = (route, state) => {
  
  const seller = inject(SellerService);
  if(localStorage.getItem('seller')){
       return true;
      }
  return seller?.isSellerSignedUp;
};
