import { Component, OnInit } from '@angular/core';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  readonly = false;
  cart: OrderedPizza[];
  deliveryFee = 10.00;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  creditCardSelect() {
    this.readonly = false;
  }

  notCreditCardSelect() {
    this.readonly = true;
  }

  public amoutTotal() {

    if (this.cart === undefined) {
      return;
    }

    let priceTotal = 0;

    for (const item of this.cart) {
      for (let i = 0; i < item.quantidade; i++) {
        priceTotal += item.flavor.price;
      }
    }

    return priceTotal;
  }

  onSubmit() {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));

    if (cart.length === 0) {
      this.alertService.error('carrinho vazio', false);
      return;
    }
  }
}
