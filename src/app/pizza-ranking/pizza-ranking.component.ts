import { Component, OnInit } from '@angular/core';
import { PizzaRankingService } from '../services/pizza-ranking.service';
import { RankItem } from '../interfaces/rank-item';
import { Flavor } from '../interfaces/flavor';
import { FlavorService } from '../services/flavor.service';
import { Router } from '@angular/router';
import { EditPizzaService } from '../services/edit-pizza.service';

@Component({
  selector: 'app-pizza-ranking',
  templateUrl: './pizza-ranking.component.html',
  styleUrls: ['./pizza-ranking.component.css']
})
export class PizzaRankingComponent implements OnInit {

  itens: RankItem[] = [];

  constructor(private pizzaRankingService: PizzaRankingService,
              private flavorService: FlavorService,
              private router: Router,
              private editPizzaService: EditPizzaService) { }

  ngOnInit(): void {
    this.pizzaRankingService.getRanking().subscribe(
      (data: RankItem[]) => {
        this.getTop3(data);
      }
    );
  }

  getCssClass(description: string): string {
    if(description === '1º Lugar') {
      return 'first-place col-lg-4 col-md-4 col-sm-4 col-12'
    } else if(description === '2º Lugar') {
      return 'second-place col-lg-4 col-md-4 col-sm-4 col-12'
    } else if(description === '3º Lugar') {
      return 'third-place col-lg-4 col-md-4 col-sm-4 col-12'
    } else {
      return 'col-lg-4 col-md-4 col-sm-4 col-4';
    }
  }

  buy(name: string) {
    this.flavorService.flavorsList().subscribe(
      (flavors: Flavor[]) => {
        const flavor: Flavor = this.findFlavor(name, flavors);

        if(flavor)
          this.redirect(flavor);
      }
    );
  }

  private findFlavor(name: string, flavors: Flavor[]) {
    return flavors.find((flavor) => flavor.name === name);
  }

  private redirect(flavor: Flavor) {
    this.editPizzaService.setFlavor(flavor);
    this.router.navigate(['/edit']);
  }

  private getTop3(rankItens: RankItem[]) {
    this.itens = rankItens.slice(0, 3);

    if(this.itens.length < 3)
      this.generateGenericTop3(this.itens.length);

    this.renameTop3Description();
  }

  private generateGenericTop3(length: number) {
    const genericItem: RankItem =  {name: '', image: '', price: 0, amount: 0, type: null, description: ''};
    this.setGenericItem(length, genericItem);
  }

  private setGenericItem(length: number, genericItem: RankItem) {
    if(length === 3)
      return;
    else
      this.itens.push(genericItem);
      this.setGenericItem(++length, genericItem);
  }

  private renameTop3Description() {
    let i = 1;

    this.itens.forEach((item) => {
      i = this.renameDescription(item, i);
    })
  }

  private renameDescription(item: RankItem, i: number) {
    if(item.name !== '') {
      item.description = i +'º Lugar'

      return ++i;
    } else {
      return i;
    }
  }
}
