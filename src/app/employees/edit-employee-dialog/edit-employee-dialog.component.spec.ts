import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { EditEmployeeDialogComponent } from './edit-employee-dialog.component';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeDialogComponent;
  let fixture: ComponentFixture<EditEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditEmployeeDialogComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
