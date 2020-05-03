import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUlr = '';
  sideNavBarIsClose = true;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (JSON.parse(localStorage.getItem('currentAccount'))) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    const email: string = this.loginForm.controls.email.value;
    const password: string = this.loginForm.controls.password.value;

    this.authenticationService.getToken(email, password)
    .subscribe(
    (data) => {
      this.findAccountByEmail(email, data.access_token, data.refresh_token);
    },
    (error: HttpErrorResponse) => {
      this.submitted = false;

      if (error.status === 400 && error.error.error_description === 'Bad credentials') {
        this.alertService.error('Email ou senha inválido', false);
      } else {
        this.alertService.error('Um error aconteceu', false);
      }
    });
  }

  change() {
    this.sideNavBarIsClose = !this.sideNavBarIsClose;
  }

  private findAccountByEmail(email: string, token: string, refreshToken: string) {
    this.authenticationService.getAccountByUserEmail(email, token).subscribe(
      (account) => {
        this.authenticationService.login(account, token, refreshToken);
        this.router.navigate([this.returnUlr]);
      }
    );
  }
}
