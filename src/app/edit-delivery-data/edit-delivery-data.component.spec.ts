import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryDataComponent } from './edit-delivery-data.component';

describe('AddressRegisterComponent', () => {
  let component: EditDeliveryDataComponent;
  let fixture: ComponentFixture<EditDeliveryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeliveryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
