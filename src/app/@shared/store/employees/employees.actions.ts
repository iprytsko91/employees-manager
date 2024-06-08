import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models";

export const loadAllEmployees = createAction('[Employees] Load All Employees');
export const loadAllEmployeesSuccess = createAction('[Employees] Load All Employees Success', props<{ payload: Employee[] }>());
export const loadAllEmployeesFailure = createAction('[Employees] Load All Employees Failure', props<{ payload: Error }>());
export const reset = createAction('[Employees] Reset');
