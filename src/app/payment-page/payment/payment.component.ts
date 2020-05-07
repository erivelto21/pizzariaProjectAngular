import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  total = 0;
  deliveryFee = 10.00;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getTotal().subscribe((total) => this.total = total)
  }

  ngOnDestroy() {
    this.cartService.get().subscribe().unsubscribe();
  }
}
