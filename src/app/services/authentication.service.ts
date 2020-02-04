import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  private url = 'api/pizzaria/login';

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  getCurrentUserValue(): User {
      return this.currentUserSubject.value;
  }

  getUserSubject() {
    return this.currentUserSubject;
  }

  login(email, password) {
    return this.http.post<User>(this.url,  { email, password }, {observe: 'response'}).pipe(take(1))
    .pipe( (userObservable) => {
      userObservable.subscribe((response) => {
        let user: User;

        user = {
          id: response.body.id,
          firstName: response.body.firstName,
          lastName: response.body.lastName,
          email: response.body.email,
          password: response.body.password,
          address: response.body.address,
          role: {id: response.body.role.id, name: response.body.role.name},
          token: response.headers.get('Authorization').substring('Bearer'.length).trim()};

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      });
      return userObservable;
    });
  }

  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
