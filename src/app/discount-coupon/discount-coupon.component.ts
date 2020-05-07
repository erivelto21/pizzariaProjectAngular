import { Component, OnInit } from '@angular/core';
import { DiscountCouponService } from '../services/discount-coupon.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DiscountCouponKeepService } from '../services/discount-coupon-keep.service';

@Component({
  selector: 'app-discount-coupon',
  templateUrl: './discount-coupon.component.html',
  styleUrls: ['./discount-coupon.component.css']
})
export class DiscountCouponComponent implements OnInit {

  discountCouponForm: FormGroup;
  submitted = false;
  message: string;
  isValid: boolean;

  constructor(private discountCouponService: DiscountCouponService,
              private formBuilder: FormBuilder,
              private discountCouponKeepService: DiscountCouponKeepService) { }

  ngOnInit() {
    const discountCoupon = this.discountCouponKeepService.getValue();

    if(discountCoupon) {
      this.discountCouponForm = this.formBuilder.group({
        couponCode: [discountCoupon.code, Validators.required],
      });

    } else {
      this.discountCouponForm = this.formBuilder.group({
        couponCode: ['', Validators.required],
      });
    }
  }

  clear() {
    this.message = '';
    this.isValid = false;
    this.discountCouponForm.controls.couponCode.setValue('');
    this.discountCouponKeepService.clear();
  }

  onSubmit() {
    this.submitted = true;
    this.message = '';

    if(this.discountCouponForm.invalid) {
      return;
    }

    this.discountCouponService.get(this.discountCouponForm.controls.couponCode.value).subscribe(
      (discountCoupon) => {
        this.message = 'Cupom válido, desconto de ' + discountCoupon.percentageDiscount + '%';
        this.isValid = true;
        this.submitted = false;

        this.discountCouponKeepService.setValue(discountCoupon);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.message = 'Cupom expirado';
          this.isValid = false;
        }

        if(error.status === 404) {
          this.message = 'Cupom não existe';
          this.isValid = false;
        }

        this.submitted = false;
      }
    );
  }
}
