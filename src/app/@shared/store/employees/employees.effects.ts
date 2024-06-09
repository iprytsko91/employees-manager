import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, withLatestFrom } from "rxjs";

import { EmployeeService } from "../../services";
import {
  addEmployee,
  addEmployeeFailure, addEmployeeSuccess, editEmployee, editEmployeeFailure, editEmployeeSuccess,
  loadAllEmployees,
  loadAllEmployeesFailure,
  loadAllEmployeesSuccess
} from "./employees.actions";
import { selectAllEmployees } from "./employees.selectors";

@Injectable()
export class EmployeesEffects {
  constructor(private actions$: Actions,
              private employeeService: EmployeeService,
              private store: Store) {
  }

  readonly loadAllEmployees$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadAllEmployees),
      exhaustMap((action) =>
        this.employeeService.getAllEmployees()
          .pipe(
            map(res => loadAllEmployeesSuccess({ payload: res })),
            catchError(error => of(loadAllEmployeesFailure({ payload: error })))
          )
      )
    ),
    { useEffectsErrorHandler: false }
  )

  readonly addEmployee$ = createEffect(
    () => this.actions$.pipe(
      ofType(addEmployee),
      withLatestFrom(this.store.select(selectAllEmployees)),
      exhaustMap(([action, employees]) => {
          const isEmployeeExist = employees.find(item => item.id === action.payload.id);

          if (isEmployeeExist) {
            return of(addEmployeeFailure({ payload: new Error('Employee with same Id already exists') }));
          }

          return of(addEmployeeSuccess({ payload: action.payload }));
        }
      )
    ),
    { useEffectsErrorHandler: false }
  )

  readonly editEmployee$ = createEffect(
    () => this.actions$.pipe(
      ofType(editEmployee),
      withLatestFrom(this.store.select(selectAllEmployees)),
      exhaustMap(([action, employees]) => {
          const isEmployeeExist = employees.find(item => item.id !== action.originalId && item.id === action.payload.id);

          if (isEmployeeExist) {
            return of(editEmployeeFailure({ payload: new Error('Employee with same Id already exists') }));
          }

          return of(editEmployeeSuccess({ payload: action.payload, originalId: action.originalId }));
        }
      )
    ),
    { useEffectsErrorHandler: false }
  )
}
