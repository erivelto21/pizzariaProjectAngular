import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Pizza } from '../interfaces/pizza';
import { AuthenticationService } from '../services/authentication.service';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Output() event = new EventEmitter();
  priceTotal = 0;
  showTotalPrice = false;
  userName: string;

  constructor(private cartService: CartService,
              private cdRef: ChangeDetectorRef,
              private authenticationService: AuthenticationService,
              private pizzaService: PizzaService) { }

  ngOnInit() {
    this.cartService.get().subscribe((_) => this.amoutTotal(_));
  }

  ngAfterViewChecked() {
    if (this.priceTotal > 0) {
      this.showTotalPrice = true;
    } else {
      this.showTotalPrice = false;
    }

    if (localStorage.getItem('currentUser') !== null) {
      this.userName = JSON.parse(localStorage.getItem('currentUser')).firstName;
    }

    this.cdRef.detectChanges();
  }

  private amoutTotal(list: Pizza[]) {

    if (list === undefined) {
      return;
    }

    this.priceTotal = 0;

    for (const item of list) {
      this.priceTotal += this.pizzaService.totalValue(item) * item.amount;
    }
  }

  logout() {
    this.authenticationService.logout();
  }

  togglerClick() {
    this.event.emit();
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
