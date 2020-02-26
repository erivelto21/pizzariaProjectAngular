import { TestBed } from '@angular/core/testing';

import { EditPizzaService } from './edit-pizza.service';

describe('EditPizzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditPizzaService = TestBed.get(EditPizzaService);
    expect(service).toBeTruthy();
  });
});
