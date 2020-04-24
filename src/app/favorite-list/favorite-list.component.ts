import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Flavor } from '../interfaces/flavor';
import { EditPizzaService } from '../services/edit-pizza.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  favorites: Flavor[] = [];

  constructor(private accountService: AccountService,
              private editPizzaService: EditPizzaService,
              private router: Router) { }

  ngOnInit() {
    this.accountService.getFavoriteList().subscribe(
      (favorites) => {
        this.favorites = favorites;
      }
    );
  }

  order(flavor: Flavor) {
    this.editPizzaService.setFlavor(flavor);
    this.router.navigate(['/edit']);
  }

  remove(flavor: Flavor) {
    this.accountService.removeFavorite(flavor.id).subscribe(
      (account) => {
        const favorites = account.favorites;

        this.favorites = favorites;
        this.accountService.updateFavorites(favorites);
      }
    );
  }
}
