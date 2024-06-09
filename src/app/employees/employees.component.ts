import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Employee } from "../@shared/models";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { selectAllEmployees } from "../@shared/store/employees/employees.selectors";
import { loadAllEmployees } from "../@shared/store/employees";
import { EditEmployeeDialogComponent } from "./edit-employee-dialog/edit-employee-dialog.component";

@Component({
  selector: 'emm-employees',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    EditEmployeeDialogComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  @ViewChild('editEmployeeDialog') editEmployeeDialog: EditEmployeeDialogComponent;
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  constructor(private store: Store) {
    this.store.dispatch(loadAllEmployees());
  }

  editEmployee(employee: Employee) {
    this.editEmployeeDialog.open(employee, true);
  }

  addEmployee() {
    this.editEmployeeDialog.open(null);
  }
}
