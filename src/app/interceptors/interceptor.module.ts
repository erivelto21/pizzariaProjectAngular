import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptorService } from './http-headers-interceptor.service';
import { RefreshTokenInterceptorService } from './refresh-token-interceptor.service';

@NgModule({
 providers: [
    HttpHeadersInterceptorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptorService,
    multi: true,
  },
  RefreshTokenInterceptorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshTokenInterceptorService,
    multi: true,
  }
 ],
})
export class InterceptorModule {}