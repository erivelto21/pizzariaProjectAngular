import { Component, OnInit } from '@angular/core';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  readonly = false;
  submitted = false;
  paymentForm: FormGroup;
  cart: OrderedPizza[];
  deliveryFee = 10.00;
  cardNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  expirationDateMask = [/\d/, /\d/, '/', /\d/, /\d/];
  securityCodeMask = [/\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));

    this.paymentForm = this.formBuilder.group({
      paymentWay: ['', [Validators.required]],
      cardName: [''],
      cardNumber: [''],
      expirationDate: [''],
      securityCode: ['']
    });
  }

  private updateControls() {
    this.paymentForm.controls.cardName.updateValueAndValidity();
    this.paymentForm.controls.cardNumber.updateValueAndValidity();
    this.paymentForm.controls.expirationDate.updateValueAndValidity();
    this.paymentForm.controls.securityCode.updateValueAndValidity();
  }

  creditCardSelect() {
    this.alertService.clear();
    this.readonly = false;
    this.submitted = false;

    this.paymentForm.controls.cardName.setValidators([Validators.required]);
    this.paymentForm.controls.cardNumber.setValidators(Validators.required);
    this.paymentForm.controls.expirationDate.setValidators(Validators.required);
    this.paymentForm.controls.securityCode.setValidators(Validators.required);

    this.updateControls();
  }

  notCreditCardSelect() {
    this.alertService.clear();
    this.readonly = true;
    this.submitted = false;

    this.paymentForm.controls.cardName.setValidators(null);
    this.paymentForm.controls.cardNumber.setValidators(null);
    this.paymentForm.controls.expirationDate.setValidators(null);
    this.paymentForm.controls.securityCode.setValidators(null);

    this.updateControls();
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
    this.submitted = true;

    if (this.paymentForm.controls.paymentWay.value === '') {
      this.alertService.error('Selecione uma forma de pagamento', false);
      return;
    }

    const cart: [] = JSON.parse(localStorage.getItem('cart'));

    if (cart.length === 0) {
      this.alertService.error('carrinho vazio', false);
      return;
    }

    if (!this.paymentForm.valid) {
      return;
    }
  }
}
