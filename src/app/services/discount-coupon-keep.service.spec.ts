import { TestBed } from '@angular/core/testing';

import { DiscountCouponKeepService } from './discount-coupon-keep.service';

describe('DiscountCouponKeepService', () => {
  let service: DiscountCouponKeepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountCouponKeepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
