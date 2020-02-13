import { Component, OnInit, Input } from '@angular/core';
import { OrderedPizza } from 'src/app/interfaces/ordered-pizza';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input() pizzas: OrderedPizza[];
  @Input() idOrder: number;

  constructor() { }

  ngOnInit() {}
}
