import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { equalFieldValueValidator } from '../util/equalFieldValueValidator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      email2: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    },
      {validator: [equalFieldValueValidator('password', 'password2'),
      equalFieldValueValidator('email', 'email2')]}
    );
  }

  clear() {
    this.registerForm.reset();
    this.alertService.clear();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;

    this.registerForm.addControl('role', new FormControl());
    this.registerForm.patchValue({role: {id: 2}});

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value).subscribe(
      data => {
        this.alertService.success('Conta criada com sucesso', true);
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.submitted = false;
        this.alertService.error(error.error.message, false);
      }
    );
  }
}
