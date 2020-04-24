import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'api/login';

  constructor(private http: HttpClient) {}

  login(email, password) {
    return this.http.post<Account>(this.url,  { email, password }, {observe: 'response'}).pipe(take(1))
    .pipe( (accountObservable) => {
      accountObservable.subscribe((response) => {
        let account: Account;

        account = {
          id: response.body.id,
          favorites: response.body.favorites,
          systemUser: {
            id: response.body.systemUser.id,
            firstName: response.body.systemUser.firstName,
            lastName: response.body.systemUser.lastName,
            email: response.body.systemUser.email,
            password: response.body.systemUser.password,
            address: response.body.systemUser.address,
            role: {id: response.body.systemUser.role.id, name: response.body.systemUser.role.name},
            phone: response.body.systemUser.phone,
            token: response.headers.get('Authorization').substring('Bearer'.length).trim()
          }
        };

        localStorage.setItem('currentAccount', JSON.stringify(account));
      });
      return accountObservable;
    });
  }

  logout() {
    localStorage.removeItem('currentAccount');
  }
}
