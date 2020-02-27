import { TestBed } from '@angular/core/testing';

import { CustomFlavorService } from './custom-flavor.service';

describe('CustomFlavorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomFlavorService = TestBed.get(CustomFlavorService);
    expect(service).toBeTruthy();
  });
});
