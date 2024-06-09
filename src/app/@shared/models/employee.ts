import { Department } from "./department.enum";

export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  street: string;
  department: Department;

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
