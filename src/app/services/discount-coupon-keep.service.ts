import { Injectable } from '@angular/core';
import { DiscountCoupon } from '../interfaces/discount-coupon';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountCouponKeepService {
  private discountCouponSubject = new BehaviorSubject<DiscountCoupon>(null);

  constructor() {
    this.discountCouponSubject.next(JSON.parse(localStorage.getItem('discountCoupon')))
  }

  getValueObservable() {
    return this.discountCouponSubject.asObservable();
  }

  getValue() {
    return this.discountCouponSubject.getValue();
  }

  setValue(discountCoupon: DiscountCoupon) {
    localStorage.setItem('discountCoupon', JSON.stringify(discountCoupon));
    this.discountCouponSubject.next(discountCoupon);
  }

  clear() {
    localStorage.removeItem('discountCoupon');
    this.discountCouponSubject.next(null);
  }
}
