import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { OrderedPizza } from '../interfaces/ordered-pizza';
import { AuthenticationService } from '../services/authentication.service';
import { CustomFlavorService } from '../services/custom-flavor.service';

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
              private customFlavorService: CustomFlavorService) { }

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

  private amoutTotal(list: OrderedPizza[]) {

    if (list === undefined) {
      return;
    }

    this.priceTotal = 0;

    for (const item of list) {
      this.priceTotal += this.customFlavorService.totalValue(item.customFlavor) * item.amount;
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
