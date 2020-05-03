import { TestBed } from '@angular/core/testing';

import { HttpHeadersInterceptorService } from './http-headers-interceptor.service';

describe('InterceptorService', () => {
  let service: HttpHeadersInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHeadersInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
