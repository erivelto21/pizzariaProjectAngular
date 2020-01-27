import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUlr: string;
  sideNavBarIsClose = true;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.getCurrentUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUlr = this.router.config[this.router.config.length - 1].path;
  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    .subscribe((data) => {
      this.router.navigate([this.returnUlr]);
    },
    (error) => {
      this.alertService.error('Dados incorretos');
    });
  }

  change() {
    this.sideNavBarIsClose = !this.sideNavBarIsClose;
  }
}
