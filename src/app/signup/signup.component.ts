import { Component } from '@angular/core';
import { AuthService } from './../../app/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: any;
  password: any;
  confirmPassword: any;
  SignUpForm: FormGroup;
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

    this.SignUpForm = form.group({
      Email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
      Password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      ConfirmPassword: [null, Validators.compose([
        Validators.required,
      ])],
    });

  }
  signup() {
    this.authService.register({
      email: this.email,
      password: this.password,
      passwordConfirm: this.confirmPassword,
    }).subscribe(res => {
      this.showSuccessToast('OK!!',  'Account Created Successfully!', 'success');
      this.router.navigateByUrl('/login');
    }, err => {
      this.showErrorToast('Error!!', err.error.message, 'error');
      console.log(err);
    });
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }


}
