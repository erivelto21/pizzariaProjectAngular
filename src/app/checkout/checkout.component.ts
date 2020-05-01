import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressRegisterComponent } from './address-register/address-register.component';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(AddressRegisterComponent)
  private addressRegisterComponent: AddressRegisterComponent;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  submitAddressData() {
    if(!this.isCartValid()) {
      return;
    }

    this.addressRegisterComponent.onSubmit('/payment');
  }

  private isCartValid() {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));

    if (cart.length === 0) {
      this.alertService.error('carrinho vazio', false);
      return false;
    }

    return true;
  }
}
