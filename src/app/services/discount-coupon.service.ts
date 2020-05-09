import { Injectable } from '@angular/core';
import { DiscountCoupon } from '../interfaces/discount-coupon';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountCouponService {
  private url = environment.apiUrl + '/discountcoupon';

  constructor(private http: HttpClient) { }

  get(code: string) {
    return this.http.get<DiscountCoupon>(`${this.url}` + '/' + code)
      .pipe(take(1));
  }
}
