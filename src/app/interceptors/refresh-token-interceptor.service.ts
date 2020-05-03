import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

import { Account } from '../interfaces/account';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if(this.isAccessTokenExpired(httpErrorResponse)) {
          return this.updateToken(request, next);
        }
        if(this.isRefreshTokenExpired(httpErrorResponse)) {
          this.refreshTokenIsExpired();

          return next.handle(request).pipe(
            finalize(()=> {
              this.alertService.error('Sua sessão expirou', true);
            })
          );
        } else {
          return throwError(httpErrorResponse);
        }
      })
    );
  }

  private updateToken(request: HttpRequest<any>, next: HttpHandler) {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));

    return this.authenticationService.updateToken(account.systemUser.refreshToken).pipe(
      mergeMap((data) => {
        this.authenticationService.login(account, data.access_token, data.refresh_token);

        return next.handle(this.setTokenInRequest(request, data.access_token));
      })
    );
  }

  private setTokenInRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  private refreshTokenIsExpired() {
    this.authenticationService.logout();
  }

  private isAccessTokenExpired(httpErrorResponse: HttpErrorResponse) {
    return httpErrorResponse.status === 401 && httpErrorResponse.error.error_description.includes('Access token expired');
  }

  private isRefreshTokenExpired(httpErrorResponse: HttpErrorResponse) {
    return httpErrorResponse.status === 401 && httpErrorResponse.error.error_description.includes('Invalid refresh token (expired)');
  }
}