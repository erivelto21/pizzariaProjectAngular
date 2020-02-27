import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsDetailsModalComponent } from './ingredients-details-modal.component';

describe('IngredientsDetailsModalComponent', () => {
  let component: IngredientsDetailsModalComponent;
  let fixture: ComponentFixture<IngredientsDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
