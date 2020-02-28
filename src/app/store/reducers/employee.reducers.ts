import { EmployeesActionTypes, EmployeesActions } from '../actions/employee.actions';

export interface State {
  employeesData: any[];
}

export const initialState: State = {
  employeesData: [],
};

export function reducer(state = initialState, action: EmployeesActions): State {
  switch (action.type) {
    case EmployeesActionTypes.SAVE_ALL_EMPLOYEES: {
      return {
        ...state,
        employeesData: action.payload,
      };
    }

    case EmployeesActionTypes.ADD_EMPLOYEE: {
      let data = action.payload;
      let employeesDataArray = [data, ...state.employeesData ];
      return {
        ...state,
        employeesData: employeesDataArray,
      };
    }


    case EmployeesActionTypes.EDIT_EMPLOYEE: {
      let data = action.payload;
      let employeesDataEditedArray = state.employeesData.map(item => {
        if (item.id == data._id) {
          let editedEmployee = Object.assign({}, item, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        })
        item = editedEmployee;
        }
        return item;
      });
      return {
        ...state,
        employeesData: employeesDataEditedArray,
      };
    }
    case EmployeesActionTypes.DELETE_EMPLOYEE: {
      let employeesDataArrayAfterDelete = state.employeesData.filter(
        item => item.id != action.payload.id);
      return {
        ...state,
        employeesData: employeesDataArrayAfterDelete,
      };
    }


    default: {
      return state;
    }

  }
}
