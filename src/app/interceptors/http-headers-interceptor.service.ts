import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class HttpHeadersInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));

    if(!this.isTokenNotNecessary(request) && account !== null) {
      request = this.setTokenInRequest(request, account);
    }

    if(!this.isContentTypeNotNecessary(request)) {
      request = this.setContentTypeInRequest(request);
    }

    return next.handle(request);
  }

  private isTokenNotNecessary(request: HttpRequest<any>) {
    return request.url === environment.apiUrl + '/oauth/token' || request.url === environment.apiUrl + '/flavor' ||
    (request.url === environment.apiUrl + '/user' && request.method === 'POST') || request.url.includes('https://viacep.com.br/ws/');
  }

  private isContentTypeNotNecessary(request: HttpRequest<any>) {
    return request.url === environment.apiUrl + '/oauth/token' || request.url.includes('https://viacep.com.br/ws/');
  }

  private setTokenInRequest(request: HttpRequest<any>, account: Account): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + account.systemUser.token
      }
    });
  }

  private setContentTypeInRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }
}
