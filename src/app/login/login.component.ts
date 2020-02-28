import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: any;
  password: any;
  LoginForm: FormGroup;
  options: IndividualConfig;

  constructor(
    private router: Router,
    private authService: AuthService,
    public form: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;

    this.LoginForm = form.group({
      Email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      Password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
    });

  }

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe(res => {
      this.router.navigateByUrl('/employees');
    }, err => {
      this.showErrorToast('Error!!', err.error.message, 'error');
      console.log(err);
    });
  }
  showErrorToast(title: string, message: string, type: string) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

}
