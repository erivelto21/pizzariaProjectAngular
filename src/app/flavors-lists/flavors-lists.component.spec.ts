import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorsListsComponent } from './flavors-lists.component';

describe('FlavorsListsComponent', () => {
  let component: FlavorsListsComponent;
  let fixture: ComponentFixture<FlavorsListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorsListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorsListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
