import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = 'api/payment/creditcard';

  constructor(private http: HttpClient) { }

  payment(creditCard, paymentWay) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('currentAccount')).systemUser;

    if (paymentWay === 'Cartão de crédito') {
      return this.creditCardPayment(user, cart, 'Cartão de crédito', creditCard);
    }

    if (paymentWay === 'paypal') { }
  }

  private creditCardPayment(user, cart, paymentWay, creditCard) {
    return this.http
    .post(
      this.url, {user, paymentWay, cart, creditCard})
      .pipe(take(1));
  }
}
