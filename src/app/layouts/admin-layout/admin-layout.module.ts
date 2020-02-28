import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import {MatIconModule} from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { EmployeesComponent } from '../../pages/employees/employees.component';
import { AddEmployeeComponent } from '../../pages/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from '../../pages/employee-details/employee-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    MatIconModule,
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
 ],
  declarations: [
    EmployeeDetailsComponent,
    EmployeesComponent,
    AddEmployeeComponent

  ]
})

export class AdminLayoutModule {}
