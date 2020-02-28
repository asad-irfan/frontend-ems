import { createFeatureSelector } from '@ngrx/store';
import * as employee from './reducers/employee.reducers';

export interface AppState {
  employeeState: employee.State;
}

export const reducers =  {
  employee: employee.reducer
};

export const EmployeeState = createFeatureSelector<AppState>('employee');
