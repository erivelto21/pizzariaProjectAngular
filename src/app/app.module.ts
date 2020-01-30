import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlavorService } from './services/flavor.service';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FlavorsListsComponent } from './flavors-lists/flavors-lists.component';
import { CarouselHomePageComponent } from './carousel-home-page/carousel-home-page.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ShoppingCartComponent } from './navbar/shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavPizzaTypesComponent } from './nav-pizza-types/nav-pizza-types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SingleProductComponent,
    NavbarComponent,
    HomePageComponent,
    FlavorsListsComponent,
    CarouselHomePageComponent,
    SideNavbarComponent,
    ShoppingCartComponent,
    LoginComponent,
    NavPizzaTypesComponent,
    AlertComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [FlavorService, CartService, AlertService, UserService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
