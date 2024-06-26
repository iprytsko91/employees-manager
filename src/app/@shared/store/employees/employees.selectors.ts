import { EmployeeState } from "./employees.reducer";
import { createSelector } from "@ngrx/store";
import { Employee } from "../../models";

export interface AppState {
  appState: EmployeeState;
}

export const selectAppState = (state: AppState) => state.appState;

export const selectAllEmployees = createSelector(
  selectAppState,
  (state: EmployeeState) => {
    return state.employees
  }
);
