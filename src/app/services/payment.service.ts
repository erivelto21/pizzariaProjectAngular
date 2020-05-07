import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { DiscountCoupon } from '../interfaces/discount-coupon';
import { DiscountCouponKeepService } from './discount-coupon-keep.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private url = 'api/payment/creditcard';

  constructor(private http: HttpClient, private discountCouponKeepService: DiscountCouponKeepService) { }

  payment(creditCard, paymentWay) {
    const cart: [] = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('currentAccount')).systemUser;

    if (paymentWay === 'Cartão de crédito') {
      const coupon: DiscountCoupon = this.discountCouponKeepService.getValue();

      if(coupon !== null) {
        return this.creditCardPaymentWithDiscount(user, cart, 'Cartão de crédito', creditCard, coupon.code);
      }else {
        return this.creditCardPayment(user, cart, 'Cartão de crédito', creditCard);
      }
    }

    if (paymentWay === 'paypal') { }
  }

  private creditCardPayment(user, cart, paymentWay, creditCard) {
    return this.http
    .post(
      this.url, {user, paymentWay, cart, creditCard})
      .pipe(take(1));
  }

  private creditCardPaymentWithDiscount(user, cart, paymentWay, creditCard, discountCode) {
    return this.http
    .post(
      this.url + '/' + discountCode, {user, paymentWay, cart, creditCard})
      .pipe(take(1));
  }
}
