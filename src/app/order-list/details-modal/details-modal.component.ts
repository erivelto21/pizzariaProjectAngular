import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from 'src/app/interfaces/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input() pizzas: Pizza[];
  @Input() idOrder: number;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() {}

  total(orderedPizza: Pizza) {
    return this.pizzaService.totalValue(orderedPizza) * orderedPizza.amount;
  }
}
