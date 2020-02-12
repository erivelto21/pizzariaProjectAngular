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

  payment(creditCard) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const user = this.authenticationService.getCurrentUserValue();

    return this.http
    .post(this.url,
      {user, cart, creditCard},
      {headers: new HttpHeaders().set('Authorization', user.token)} ).pipe(take(1));
  }
}
