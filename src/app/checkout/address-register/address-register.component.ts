import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { CepAux } from 'src/app/interfaces/cep-aux';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Address } from 'src/app/interfaces/address';
import { locationValidator } from 'src/app/util/locationValidator';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styleUrls: ['./address-register.component.css']
})
export class AddressRegisterComponent implements OnInit {

  submitted = false;
  addressForm: FormGroup;
  readonly = false;
  cepMask = [/\d/, /\d/, /\d/, /\d/ , /\d/, '-', /\d/, /\d/, /\d/];
  private user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cepService: CepService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    if (this.user.address !== undefined ) {
      this.setAddress();
      return;
    }

    this.addressForm = this.formBuilder.group({
      id: [''],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      complement: [''],
      city: ['Fortaleza', Validators.required],
      state: ['CE', Validators.required],
      cep: [''],
    });
  }

  private setAddress() {
    this.addressForm = this.formBuilder.group({
      id: [this.user.address.id],
      street: [this.user.address.street, Validators.required],
      number: [this.user.address.number, Validators.required],
      neighborhood: [this.user.address.neighborhood, Validators.required],
      complement: [this.user.address.complement],
      city: [this.user.address.city, Validators.required],
      state: [this.user.address.state, Validators.required],
      cep: [this.user.address.cep],
    },
      {validator: [locationValidator('city', 'state')]}
    );
  }

  cep() {
    this.alertService.clear();

    const name = 'cep';
    const cep: string = this.addressForm.controls[name].value;

    this.readonly = cep.length > 0;

    if (cep.length === 9 && cep.charAt(cep.length - 1) !== '_') {
      this.cepService.get(cep).subscribe(
        (data: CepAux) => {
          const result = data.uf === 'CE' && data.localidade === 'Fortaleza';

          if (!result) {
            this.alertService.error('Cidade ou estado inválida', false);
            return;
          }

          this.addressForm.patchValue({
            street: data.logradouro,
            neighborhood: data.bairro,
            complement: data.complemento,
            city: data.localidade,
            state: data.uf
          });
        }
      );
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.user.address = this.addressForm.value;

    this.userService.address(this.user).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.alertService.error(error.error, false);
      }
    );
  }
}
