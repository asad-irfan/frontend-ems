import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './../../services/employee.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, EmployeeState } from './../../store/app.states';
import { SaveAllEmployees, DeleteEmployee } from './../../store/actions/employee.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  allEmployeesData: any;
  id: any;
  showEmployeesData = false;
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Actions'];
  dataSource = new MatTableDataSource<any>();
  options: IndividualConfig;
  getState: Observable<any>;

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public router: Router,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(EmployeeState);
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
  getAllEmployessData() {
    this.employeeService.getAllEmployees().subscribe(res => {
      console.log(res);
      if (res.result.length == 0) {
        this.showEmployeesData = false;
      } else {
        this.showEmployeesData = true;
        this.store.dispatch(new SaveAllEmployees(res.result.employees));
        this.allEmployeesData = res.result.employees;
        this.dataSource = new MatTableDataSource<any>(this.allEmployeesData);
        this.dataSource.paginator = this.paginator;
      }
    }, err => {
      this.showEmployeesData = false;
      console.log(err)
    })

  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      // console.log('store data :', state)
      if (state.employeesData.length == 0) {
        this.showEmployeesData = false;
        this.getAllEmployessData();
      }
      this.allEmployeesData = state.employeesData;
      this.dataSource = new MatTableDataSource<any>(this.allEmployeesData);
      this.dataSource.paginator = this.paginator;
      this.showEmployeesData = true;
    });

  }
  openPopUp(content, id) {
    this.id = id;
    this.modalService.open(content, { centered: false });
  }
  Search(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.filteredData.length == 0) {
      this.showEmployeesData = false;
    } else {
      this.showEmployeesData = true;
    }
  }

  DeleteEmployee() {
    this.spinner.show();
    this.employeeService.deleteEmployee(this.id).subscribe(res => {
      this.spinner.hide();
      this.store.dispatch(new DeleteEmployee({id: this.id}));
      this.showSuccessToast('OK!!', 'Employee Deleted Successfully', 'success');
      this.ngOnInit();
      this.modalService.dismissAll();
    }, err => {
      this.spinner.hide();
      console.log(err);
      this.showErrorToast('ERROR!!', err.error.message, 'error');
    })
  }
  seeEmployeeDetails(id) {
    this.router.navigate(['employee', id]);
  }

}
