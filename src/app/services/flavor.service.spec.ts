import { TestBed } from '@angular/core/testing';

import { FlavorService } from './flavor.service';

describe('FlavorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlavorService = TestBed.get(FlavorService);
    expect(service).toBeTruthy();
  });
});
