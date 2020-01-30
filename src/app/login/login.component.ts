import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

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
    if (this.authenticationService.getCurrentUserValue()) {
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

    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    .subscribe((data) => {
      this.router.navigate([this.returnUlr]);
    },
    (error) => {
      this.submitted = false;
      this.alertService.error(error.error, false);
    });
  }

  change() {
    this.sideNavBarIsClose = !this.sideNavBarIsClose;
  }
}
