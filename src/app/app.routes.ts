import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { sellerAuthGuard } from './seller-auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    {
        path : "",
        component: HomeComponent
    },
    {
        path : "seller-auth",
        component: SellerAuthComponent
    },
    {
        path : "seller-home",
        component: SellerHomeComponent,
        canActivate: [sellerAuthGuard]
    },
    {
        path : "seller-add-product",
        component: SellerAddProductComponent,
        canActivate: [sellerAuthGuard]
    },
    {
        path : "seller-update-product/:id",
        component: SellerUpdateProductComponent,
        canActivate: [sellerAuthGuard]
    },
    {
        path : "search/:query",
        component: SearchComponent,
    },
    {
        path : "product-details/:productId",
        component: ProductDetailsComponent,
    },
    {
        path : "user-auth",
        component: UserAuthComponent,
    },
    {
        path : "cart-page",
        component: CartPageComponent,
    },
     {
        path : "checkout",
        component: CheckoutComponent,
    },
    {
        path : "my-orders",
        component: MyOrdersComponent,
    }

];
