import { createAction, props } from "@ngrx/store";
import { Employee } from "../../models";

export const loadAllEmployees = createAction('[Employees] Load All Employees');
export const loadAllEmployeesSuccess = createAction('[Employees] Load All Employees Success', props<{ payload: Employee[] }>());
export const loadAllEmployeesFailure = createAction('[Employees] Load All Employees Failure', props<{ payload: Error }>());
export const addEmployee = createAction('[Employees] Add Employee', props<{ payload: Employee }>());
export const addEmployeeSuccess = createAction('[Employees] Add Employee Success', props<{ payload: Employee }>());
export const addEmployeeFailure = createAction('[Employees] Add Employee Failure', props<{ payload: Error }>());
export const editEmployee = createAction('[Employees] Edit Employee', props<{ payload: Employee, originalId: string }>());
export const editEmployeeSuccess = createAction('[Employees] Edit Employee Success', props<{ payload: Employee, originalId: string }>());
export const editEmployeeFailure = createAction('[Employees] Edit Employee Failure', props<{ payload: Error }>());
export const reset = createAction('[Employees] Reset');
