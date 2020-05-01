import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { CepAux } from 'src/app/interfaces/cep-aux';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { SystemUser } from 'src/app/interfaces/system-user';
import { locationValidator } from 'src/app/util/locationValidator';
import { Account } from 'src/app/interfaces/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-delivery-data',
  templateUrl: './edit-delivery-data.component.html',
  styleUrls: ['./edit-delivery-data.component.css']
})
export class EditDeliveryDataComponent implements OnInit {

  submitted = false;
  addressForm: FormGroup;
  readonly = false;
  cepMask = [/\d/, /\d/, /\d/, /\d/ , /\d/, '-', /\d/, /\d/, /\d/];
  phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private user: SystemUser;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cepService: CepService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentAccount')).systemUser;

    if (this.user.address !== null ) {
      this.setAddress();
      return;
    }

    this.addressForm = this.formBuilder.group({
      id: [''],
      street: ['', Validators.required],
      number: ['', [Validators.required, Validators.max(99999999)]],
      neighborhood: ['', Validators.required],
      complement: [''],
      city: ['Fortaleza', Validators.required],
      state: ['CE', Validators.required],
      cep: [''],
      phone: ['', Validators.required],
    });
  }

  private setAddress() {
    this.addressForm = this.formBuilder.group({
      id: [this.user.address.id],
      street: [this.user.address.street, Validators.required],
      number: [this.user.address.number, [Validators.required, Validators.max(99999999)]],
      neighborhood: [this.user.address.neighborhood, Validators.required],
      complement: [this.user.address.complement],
      city: [this.user.address.city, Validators.required],
      state: [this.user.address.state, Validators.required],
      cep: [this.user.address.cep],
      phone: [this.user.phone, Validators.required],
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

  onSubmit(routeUrl: string) {
    this.submitted = true;

    if(!this.isFormValid()) {
      return;
    }

    this.setValidatedDataInUserObject();

    forkJoin([this.phoneSubmit(), this.addressSubmit()]).subscribe(
      data => {
        this.updateAccount();
        this.redirect(routeUrl);
        this.submitted = false;
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.alertService.error(error.error.message, false);
      }
    );
  }

  private updateAccount() {
    const account: Account = JSON.parse(localStorage.getItem('currentAccount'));
    account.systemUser = this.user;

    localStorage.setItem('currentAccount', JSON.stringify(account));
  }

  private addressSubmit() {
    return this.userService.address(this.user);
  }

  private phoneSubmit() {
    return this.userService.phone(this.user);
  }

  private isFormValid() {
    if (this.addressForm.invalid) {
      return false;
    }

    return true;
  }

  private setValidatedDataInUserObject() {
    const phone = 'phone';
    this.user.phone = this.addressForm.controls[phone].value;

    delete this.addressForm.value.phone;
    this.user.address = this.addressForm.value;
  }

  private redirect(routeUrl: string) {
    if(routeUrl === '') {
      this.alertService.success('Informações para a entrega atualizadas com sucesso', true);
      return;
    }

    this.router.navigate([routeUrl]);
  }
}
