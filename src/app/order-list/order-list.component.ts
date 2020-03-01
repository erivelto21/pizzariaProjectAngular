import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order';
import { Pizza } from '../interfaces/pizza';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  pizzas: string;


  constructor(private orderService: OrderService, private alertService: AlertService) { }

  ngOnInit() {
    this.orderService.getByUser().subscribe(
      (data: Order[]) => {
        this.orders = data.slice(0).reverse();
      },
      error => {
        this.alertService.error(error.error.message, false);
      }
    );
  }

  public getAmount(pizzas: Pizza[]): number {
    let amount = 0;

    pizzas.forEach( (pizza: Pizza) => amount += pizza.amount);

    return amount;
  }

  public getPizzas(pizzas: Pizza[]): string {
    let line = '';
    const aux: Pizza[] = JSON.parse(JSON.stringify(pizzas));

    this.putCommaAndDot(aux);

    aux.forEach( (pizza: Pizza) => line += pizza.customFlavor.name);

    return line;
  }

  private putCommaAndDot(pizzas: Pizza[]) {
    const pointIndex = pizzas.length - 1;

    for (let i = 0; i < pizzas.length; i++) {
      if (i === pointIndex) {
        pizzas[i].customFlavor.name += '.';
      } else {
        pizzas[i].customFlavor.name += ', ';
      }
    }
  }

  ngOnDestroy() {
    this.orderService.getByUser().subscribe().unsubscribe();
  }
}
