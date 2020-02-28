import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { EmployeeService } from './../../services/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, EmployeeState } from './../../store/app.states';
import { EditEmployee } from './../../store/actions/employee.actions';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  options: IndividualConfig;
  employeeID: any;
  employeeDetails: any;
  firstName: any;
  lastName: any;
  email: any;
  EditForm: FormGroup;
  SaveButton = false;
  disabledButton = true;
  getState: Observable<any>;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(EmployeeState);

    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-top-right';
    this.options.timeOut = 6000;
    this.route.paramMap.subscribe(params => {
      this.employeeID = params.get('id');
    });

    this.EditForm = fb.group({
      'FirstName': [{ value: this.firstName, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'LastName': [{ value: this.lastName, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ])],
      'Email': [{ value: this.email, disabled: this.disabledButton }, Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$')
      ])],
    });

  }
  showSuccessToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  showErrorToast(title, message, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
  goBack() {
    this.router.navigateByUrl('/employees');
   }
  ngOnInit() {
    this.spinner.show();
    this.employeeService.getEmployeeById(this.employeeID).subscribe(res => {
      this.employeeDetails = res.result.employee;
      this.firstName = this.employeeDetails.firstName;
      this.lastName = this.employeeDetails.lastName;
      this.email = this.employeeDetails.email;
      this.spinner.hide();
      console.log(res);
    }, err => {
      this.spinner.hide();
      console.log(err);
    });


  }
  EditInfo() {
    this.SaveButton = true;
    this.EditForm.get('FirstName').enable();
    this.EditForm.get('LastName').enable();
    this.EditForm.get('Email').enable();
  }

  SaveInfo() {
    this.spinner.show();
    this.employeeService.updateEmployee({
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
    }, this.employeeID).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      this.store.dispatch(new EditEmployee(res.result.employee));
      this.showSuccessToast('OK!!', res.message, 'success');
      this.EditForm.get('FirstName').disable();
      this.EditForm.get('LastName').disable();
      this.EditForm.get('Email').disable();
      this.SaveButton = false;
    }, err => {
      this.spinner.hide();
      console.log(' ERROR:', err);
      this.showErrorToast('Error!!', err.error.message, 'error');
    });


  }




}
