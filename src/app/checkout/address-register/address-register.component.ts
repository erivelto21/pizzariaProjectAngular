import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.css']
})
export class AddressRegisterComponent implements OnInit {

  addressForm: FormGroup;
  readonly = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      street: ['Pastel', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      complement: [''],
      city: ['Fortaleza', Validators.required],
      state: ['CE', Validators.required],
      cep: [''],
    });
  }

  cep() {
    const name = 'cep';
    const cep: string = this.addressForm.controls[name].value;

    this.readonly = cep.length > 0;
  }

}
