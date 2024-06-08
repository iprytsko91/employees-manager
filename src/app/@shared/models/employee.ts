export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  street: string;
  department: string;

  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
}
