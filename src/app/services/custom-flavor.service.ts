import { Injectable } from '@angular/core';
import { CustomFlavor } from '../classes/custom-flavor';

@Injectable({
  providedIn: 'root'
})
export class CustomFlavorService {

  constructor() { }

  totalValue(customFlavor: CustomFlavor) {
    return customFlavor.price + customFlavor.additionalsValue;
  }
}
