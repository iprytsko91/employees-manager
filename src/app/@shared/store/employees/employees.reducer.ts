import { createReducer, on } from "@ngrx/store";

import {
  addEmployee, addEmployeeFailure,
  addEmployeeSuccess, editEmployeeSuccess,
  loadAllEmployeesFailure,
  loadAllEmployeesSuccess,
  reset
} from "./employees.actions";
import { Employee } from "../../models";

export type EmployeeState = {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: []
}

export const employeesReducer = createReducer(
  initialState,
  on(loadAllEmployeesSuccess, ((state, { payload }) => {
    return {
      ...state,
      employees: [...state.employees, ...payload]
    }
  })),
  on(loadAllEmployeesFailure, (state) => {
    console.error("Unable to load data");
    return state;
  }),
  on(addEmployeeSuccess, ((state, { payload }) => {
    return {
      ...state,
      employees: [...state.employees, payload]
    }
  })),
  on(addEmployeeFailure, ((state, { payload }) => {
    console.error(payload.message);
    return state;
  })),

  on(editEmployeeSuccess, ((state, { payload, originalId }) => {
     return {
      ...state,
      employees: state.employees.map(item => item.id === originalId ? payload: item)
    }
  })),
  on(addEmployeeFailure, ((state, { payload }) => {
    console.error(payload.message);
    return state;
  })),
  on(reset, (state) => initialState)
)
