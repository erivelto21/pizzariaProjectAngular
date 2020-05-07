import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewChecked  {

  @Output() event = new EventEmitter();
  showTotalPrice = false;
  userName: string;
  total = 0;

  constructor(private cartService: CartService,
              private cdRef: ChangeDetectorRef,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.cartService.getTotal().subscribe((total) => {this.total = total});
  }

  ngAfterViewChecked() {
    const currentAccount = JSON.parse(localStorage.getItem('currentAccount'));

    if(currentAccount !== null) {
      this.userName = currentAccount.systemUser.firstName;
    }

    this.cdRef.detectChanges();
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
