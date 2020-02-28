import { Component } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { EmployeeService } from './../../services/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, EmployeeState } from './../../store/app.states';
import { AddEmployee } from './../../store/actions/employee.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  EmployeeForm: FormGroup;
  firstName: String;
  lastName: String;
  email: String;
  options: IndividualConfig;
  getState: Observable<any>;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private form: FormBuilder,
    private store: Store<AppState>,
    public router: Router,
  ) {
    this.getState = this.store.select(EmployeeState);

    this.EmployeeForm = form.group({
      'FirstName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'Email': [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
    });
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 5000;
  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }

  AddNewEmployee() {
    this.spinner.show();
    this.employeeService.addEmployee({
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email
    }).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.store.dispatch(new AddEmployee(res.result.employee));
      this.showSuccessToast('OK!!', res.message, 'success');
      this.router.navigateByUrl('/employees');
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }


}
