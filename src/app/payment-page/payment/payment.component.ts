import { Component, OnInit } from '@angular/core';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomizedTransactionResponse } from 'src/app/interfaces/customized-transaction-response';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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

  private firstTransaction = true;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private paymentService: PaymentService,
              private cartService: CartService,
              private router: Router) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));

    this.paymentForm = this.formBuilder.group({
      paymentWay: ['', [Validators.required]],
      cardName: ['Morpheus Fishburne'],
      cardNumber: ['4111111111111111'],
      expirationDate: ['0922'],
      securityCode: ['123']
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
      for (let i = 0; i < item.amount; i++) {
        priceTotal += item.flavor.price;
      }
    }

    return priceTotal;
  }

  private cardBuilder() {
    let numberValue: string = '' + this.paymentForm.controls.cardNumber.value;
    numberValue = numberValue.replace(/\s/g, '').toLowerCase();

    let expirationDateValue: string = '' + this.paymentForm.controls.expirationDate.value;
    expirationDateValue = expirationDateValue.replace('/', '');

    const card = {
      cardNumber: numberValue,
      cardCvv: this.paymentForm.controls.securityCode.value,
      cardExpirationDate: expirationDateValue,
      cardHolderName: this.paymentForm.controls.cardName.value
    };

    return card;
  }

  private cancelPayment() {
    this.submitted = false;
    this.firstTransaction = true;
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

    if (!this.firstTransaction) {
      return;
    }

    this.firstTransaction = false;

    const paymentWayValue = this.paymentForm.controls.paymentWay.value;
    let paymentWay = '';

    let card = null;

    const paymentWayAction = {
      mastercard() {
        paymentWay = 'Cartão de crédito';
      },
      visa() {
        paymentWay = 'Cartão de crédito';
      },
      elo() {
        paymentWay = 'Cartão de crédito';
      },
      paypal() {
        paymentWay = 'paypal';
      }
    };

    const action = paymentWayAction[paymentWayValue];
    action();

    if (paymentWay === 'Cartão de crédito') {
      card = this.cardBuilder();
    }
    if (paymentWay === 'paypal') {
      this.alertService.error('Selecione outra forma de pagamento, paypal ainda não disponível', false);
      this.cancelPayment();
      return;
    }

    this.paymentService.payment(card, paymentWay).subscribe(
      (data: CustomizedTransactionResponse) => {
        if (data.statusValue === 'paid') {
          this.alertService.success(data.message, true);

          this.cartService.newCart();
        } else {
          this.firstTransaction = true;
          this.alertService.error(data.message, true);
        }

        this.router.navigate(['/orders']);
      },
      (error: HttpErrorResponse) => {
        this.cancelPayment();
        this.alertService.error(error.error.message, false);
      }
    );
  }
}
