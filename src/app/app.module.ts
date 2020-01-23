import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlavorService } from './flavor.service';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FlavorsListsComponent } from './flavors-lists/flavors-lists.component';
import { CarouselHomePageComponent } from './carousel-home-page/carousel-home-page.component';
import { SideNavbarComponent } from './navbar/side-navbar/side-navbar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [FlavorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
