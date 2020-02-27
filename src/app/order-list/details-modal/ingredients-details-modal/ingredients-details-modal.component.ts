import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/interfaces/ingredient';

@Component({
  selector: 'app-ingredients-details-modal',
  templateUrl: './ingredients-details-modal.component.html',
  styleUrls: ['./ingredients-details-modal.component.css']
})
export class IngredientsDetailsModalComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Input() idCustomFlavor: number;

  constructor() { }

  ngOnInit() {
  }
}
