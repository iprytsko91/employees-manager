import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf, UpperCasePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Actions, ofType } from "@ngrx/effects";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";

import { Department, Employee } from "../../@shared/models";
import { getStringArrayFromEnum } from "../../@shared/utils";
import {
  addEmployee,
  addEmployeeFailure,
  addEmployeeSuccess,
  editEmployee, editEmployeeFailure,
  editEmployeeSuccess
} from "../../@shared/store/employees";

@Component({
  selector: 'emm-edit-employee-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    UpperCasePipe,
    NgIf
  ],
  templateUrl: './edit-employee-dialog.component.html',
  styleUrl: './edit-employee-dialog.component.scss'
})
export class EditEmployeeDialogComponent implements OnInit {
  @ViewChild('dialog') dialogRef: ElementRef;

  form: FormGroup;
  departments: string[] = getStringArrayFromEnum(Department);
  errorMessage: string;
  originalEmployeeId: string;
  protected isEdit: boolean = false;

  get dialog(): HTMLDialogElement {
    return this.dialogRef.nativeElement;
  }

  get title(): string {
    return this.isEdit ? 'Edit Employee' : 'Add Employee';
  }

  constructor(private fb: FormBuilder,
              private store: Store,
              private actions$: Actions) {
    this.actions$
      .pipe(
        ofType(addEmployeeSuccess, editEmployeeSuccess),
        tap(action => this.close()),
        takeUntilDestroyed(),
      )
      .subscribe();

    this.actions$
      .pipe(
        ofType(addEmployeeFailure, editEmployeeFailure),
        tap(action => {
          this.errorMessage = action.payload.message;
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.initForm();
  }

  open(data: Employee, isEdit?: boolean): void {
    this.isEdit = isEdit;

    if (data) {
      this.form.setValue(data);
      this.originalEmployeeId = data.id;
    }

    this.dialog.showModal();
  }

  close(reason?: string): void {
    this.dialog.close(reason);
    this.reset();
  }

  isRequired(formControlName: string): boolean {
    return this.form.get(formControlName)?.hasValidator(Validators.required)
  }

  save(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const employee = new Employee(this.form.value);

      if(this.isEdit) {
        this.store.dispatch(editEmployee({ payload: employee, originalId: this.originalEmployeeId }));

        return;
      }

      this.store.dispatch(addEmployee({ payload: employee }));
    }
  }

  reset(): void {
    this.form.reset();
    this.errorMessage = null;
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [0],
      city: [''],
      street: [''],
      department: ['', Validators.required]
    })
  }
}
