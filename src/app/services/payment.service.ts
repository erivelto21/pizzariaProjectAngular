import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { CreditCard } from '../interfaces/credit-card';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = 'api/pizzaria/payment/creditCard';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  payment(creditCard, paymentWay) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (paymentWay === 'Cartão de crédito') {
      return this.creditCardPayment(user, cart, 'Cartão de crédito', creditCard);
    }

    if (paymentWay === 'paypal') { }
  }

  private creditCardPayment(user, cart, paymentWay, creditCard) {
    return this.http
    .post(
      this.url, {user, paymentWay, cart, creditCard},
      {headers: new HttpHeaders().set('Authorization', user.token)} )
      .pipe(take(1));
  }
}
