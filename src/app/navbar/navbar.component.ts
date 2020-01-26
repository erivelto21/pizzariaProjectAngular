import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderedPizza } from '../interfaces/Ordered-pizza';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked {

  @Output() event = new EventEmitter();
  priceTotal = 0;
  showTotalPrice = false;

  constructor(private cartService: CartService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cartService.get().subscribe((_) => this.amoutTotal(_));
  }

  ngAfterViewChecked() {
    if (this.priceTotal > 0) {
      this.showTotalPrice = true;
    } else {
      this.showTotalPrice = false;
    }

    this.cdRef.detectChanges();
  }

  private amoutTotal(list: OrderedPizza[]) {

    if (list === undefined) {
      return;
    }

    this.priceTotal = 0;

    for (const item of list) {
      for (let i = 0; i < item.quantidade; i++) {
        this.priceTotal += item.flavor.price;
      }
    }
  }

  togglerClick() {
    this.event.emit();
  }
}
