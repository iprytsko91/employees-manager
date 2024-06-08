import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Employee } from "../@shared/models";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";

import { selectAllEmployees } from "../@shared/store/employees/employees.selectors";
import { loadAllEmployees } from "../@shared/store/employees";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";

@Component({
  selector: 'emm-employees',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    EditEmployeeComponent
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  @ViewChild('dialog') dialog: ElementRef;
  employees$: Observable<Employee[]> = this.store.select(selectAllEmployees);

  constructor(private store: Store) {
    this.store.dispatch(loadAllEmployees());
  }

  editEmployee(employee: Employee) {
    console.log('edit', employee)
    this.dialog.nativeElement.showModal();
  }

  addEmployee() {

  }
}
