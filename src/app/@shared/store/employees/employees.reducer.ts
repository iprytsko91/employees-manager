import { createReducer, on } from "@ngrx/store";

import { loadAllEmployeesFailure, loadAllEmployeesSuccess, reset } from "./employees.actions";
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
  on(reset, (state) => initialState)
)
