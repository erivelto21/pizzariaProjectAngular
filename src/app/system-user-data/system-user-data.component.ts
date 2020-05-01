import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemUser } from '../interfaces/system-user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { equalFieldValueValidator } from '../util/equalFieldValueValidator';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { AddressRegisterComponent } from '../checkout/address-register/address-register.component';

@Component({
  selector: 'app-system-user-data',
  templateUrl: './system-user-data.component.html',
  styleUrls: ['./system-user-data.component.css']
})
export class SystemUserDataComponent implements OnInit {

  @ViewChild(AddressRegisterComponent)
  private addressRegisterComponent: AddressRegisterComponent;

  user: SystemUser;
  passwordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentAccount')).systemUser;

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    },
    {validator: [equalFieldValueValidator('password', 'password2')]}
    );
  }

  onSubmit() {
    this.submitted = true;

    if(this.passwordForm.invalid) {
      return;
    }

    this.userService.password(this.user.id, this.user.token, this.passwordForm.controls.password.value).subscribe(
      data => {
        this.alertService.success('Senha alterada com sucesso', true);
        this.submitted = false;
        this.passwordForm.setValue({password: '', password2: ''});
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.alertService.error(error.error.message, false);
      }
    );
  }

  onSubmitAddressRegisterForm() {
    this.addressRegisterComponent.onSubmit('');
  }
}
