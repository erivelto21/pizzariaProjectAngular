import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Account } from '../interfaces/account';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.apiUrl + '/oauth/token';
  private clientid = 'Y2xpZW50aWRfcGl6emFyaWE=';
  private clientSecret =  'U2VjcmV0X2NsaWVudF9waXp6YXJpYQ==';


  constructor(private http: HttpClient) {}

  getToken(email, password) {
    const headers = new HttpHeaders(
      {Authorization: 'Basic ' + btoa(this.clientid + ':' + this.clientSecret), 'Content-type': 'application/x-www-form-urlencoded'});

    const payload = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<any>(this.url, payload.toString(), { headers }).pipe(take(1));
  }

  getAccountByUserEmail(email: string, token: string) {
    const headers = new HttpHeaders( {Authorization: 'Bearer ' + token,
                                      'Content-type': 'application/json'});

    return this.http.get<Account>(environment.apiUrl + '/account/' + email, { headers });
  }

  login(account: Account, token: string, refreshToken: string) {
    account.systemUser.token = token;
    account.systemUser.refreshToken = refreshToken;

    localStorage.setItem('currentAccount', JSON.stringify(account));
  }

  logout() {
    localStorage.removeItem('currentAccount');
  }

  updateToken(refreshToken: string) {
    const headers = new HttpHeaders(
      {Authorization: 'Basic ' + btoa(this.clientid + ':' + this.clientSecret), 'Content-type': 'application/x-www-form-urlencoded'});

    const payload = new HttpParams()
      .set('refresh_token', refreshToken)
      .set('grant_type', 'refresh_token');
    return this.http.post<any>(this.url, payload.toString(), { headers }).pipe(take(1));
  }
}
