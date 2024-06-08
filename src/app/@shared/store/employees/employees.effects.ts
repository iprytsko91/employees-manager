import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

import { EmployeeService } from "../../services";
import { loadAllEmployees, loadAllEmployeesFailure, loadAllEmployeesSuccess } from "./employees.actions";

@Injectable()
export class EmployeesEffects {
  constructor(private actions$: Actions,
              private employeeService: EmployeeService) {
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
}
