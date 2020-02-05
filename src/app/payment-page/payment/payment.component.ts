import { Component, OnInit } from '@angular/core';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  readonly = false;
  cart: OrderedPizza[];
  purchase = this.amoutTotal;

  constructor() { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  creditCardSelect() {
    this.readonly = false;
  }

  notCreditCardSelect() {
    this.readonly = true;
  }

  private amoutTotal() {

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
}
