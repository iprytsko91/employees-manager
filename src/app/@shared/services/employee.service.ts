import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Employee } from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly employeesMockDataJsonUrl = 'assets/employees.mock-data.json';

  constructor(private http: HttpClient) {
    this.getAllEmployees().subscribe(res => {
      console.log(res)
    })
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get(this.employeesMockDataJsonUrl)
      .pipe(
        map((res: unknown[]) => res.map(item => new Employee(item)))
      )
  }
}
