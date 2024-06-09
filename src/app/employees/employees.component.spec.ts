import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Store, StoreModule } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EffectsModule } from "@ngrx/effects";
import { of } from "rxjs";

import { EmployeesComponent } from './employees.component';
import { Employee } from "../@shared/models";
import { By } from "@angular/platform-browser";

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  const employees: Employee[] = [
    new Employee({id: '111'}),
    new Employee({id: '222'}),
    new Employee({id: '333'}),
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeesComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule
      ],
      providers: [provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all employees rows in table', () => {
    component.employees$ = of(employees);
    fixture.detectChanges();

    const tableRows = fixture.debugElement.queryAll(By.css(`.employee-row`));

    expect(tableRows.length).toEqual(employees.length);
  });

  it('should show third row ID', () => {
    component.employees$ = of(employees);
    fixture.detectChanges();
    const employeeIndex = 2;

    const tableRows = fixture.debugElement.queryAll(By.css(`.employee-row`));
    const thirdRow = tableRows[employeeIndex].query(By.css(`.employee-id`));

    debugger
    expect(thirdRow.nativeElement.textContent).toEqual(employees[employeeIndex].id);
  })
});
