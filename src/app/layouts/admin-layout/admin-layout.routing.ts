import { Routes } from '@angular/router';

import { EmployeesComponent } from '../../pages/employees/employees.component';
import { AddEmployeeComponent } from '../../pages/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from '../../pages/employee-details/employee-details.component';


export const AdminLayoutRoutes: Routes = [
    {
      path: 'employees',
      component: EmployeesComponent,
    },
    {
      path: 'employee/:id',
      component: EmployeeDetailsComponent,
    },
    {
      path: 'add-employee',
      component: AddEmployeeComponent,
    }

];
