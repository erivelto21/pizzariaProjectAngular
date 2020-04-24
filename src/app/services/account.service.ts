import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Account } from '../interfaces/account';
import { Flavor } from '../interfaces/flavor';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = 'api/account';
  private idAccount: number;
  private authorizationToken: string;

  constructor(private http: HttpClient) { }

  private getData() {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));

    if (account !== null) {
      this.idAccount = account.id;
      this.authorizationToken = account.systemUser.token;
    }
  }

  getFavoriteList() {
    this.getData();

    return this.http.get<Flavor[]>(this.url + '/favorite/' + this.idAccount,
      {headers: new HttpHeaders().set('Authorization', this.authorizationToken).set('Content-Type', 'application/json')})
      .pipe(take(1));
  }

  addFavorite(idFlavor: number) {
    this.getData();

    return this.http.patch<Account>(this.url + '/favorite/add/' + this.idAccount + '/flavor/' + idFlavor, null,
      {headers: new HttpHeaders().set('Authorization', this.authorizationToken).set('Content-Type', 'application/json')})
      .pipe(take(1));
  }

  removeFavorite(idFlavor: number) {
    this.getData();
    return this.http.patch<Account>(this.url + '/favorite/remove/' + this.idAccount + '/flavor/' + idFlavor, null,
      {headers: new HttpHeaders().set('Authorization', this.authorizationToken).set('Content-Type', 'application/json')})
      .pipe(take(1));
  }

  updateFavorites(favorites: Flavor[]) {
    const currentAccount: Account = JSON.parse(localStorage.getItem('currentAccount'));

    currentAccount.favorites = favorites;

    localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
  }
}
