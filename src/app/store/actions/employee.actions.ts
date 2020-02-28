import { Action } from '@ngrx/store';

export enum EmployeesActionTypes {
  SAVE_ALL_EMPLOYEES = 'SaveAllEmployees',
  ADD_EMPLOYEE = 'AddEmployee',
  EDIT_EMPLOYEE = 'EditEmployee',
  DELETE_EMPLOYEE = 'DeleteEmployee',
}

export class SaveAllEmployees implements Action {
  readonly type = EmployeesActionTypes.SAVE_ALL_EMPLOYEES;
  constructor(public payload: any) { }
}
export class AddEmployee implements Action {
  readonly type = EmployeesActionTypes.ADD_EMPLOYEE;
  constructor(public payload: any) { }
}
export class EditEmployee implements Action {
  readonly type = EmployeesActionTypes.EDIT_EMPLOYEE;
  constructor(public payload: any) { }
}
export class DeleteEmployee implements Action {
  readonly type = EmployeesActionTypes.DELETE_EMPLOYEE;
  constructor(public payload: any) { }
}

export type EmployeesActions =
  | SaveAllEmployees
  | AddEmployee
  | EditEmployee
  | DeleteEmployee;

