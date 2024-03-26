import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Employee } from 'src/app/models/Employee';
import {
  AddEmployee,
  DeleteEmployee,
  GetEmployee,
  SetSelectedEmployee,
  UpdateEmployee,
} from '../actions/employee.action';
import { FetchDetailsService } from 'src/app/fetch-details.service';
import { tap } from 'rxjs';
import { updateItem } from '@ngxs/store/operators';

export class EmployeeStateModel {
  employees: Employee[] = [];
  employeesLoaded!: boolean;
  selectedEmployee?: Employee;
}

@State<EmployeeStateModel>({
  name: 'employees',
  defaults: {
    employees: [] as Employee[],
    employeesLoaded: false,
    selectedEmployee: null as any,
  },
})
@Injectable()
export class EmployeeState {
  constructor(private fetch: FetchDetailsService) {}

  @Selector()
  static getEmployeeList(state: EmployeeStateModel) {
    return state.employees;
  }

  @Selector()
  static employeeLOaded(state: EmployeeStateModel) {
    return state.employeesLoaded;
  }

  @Selector()
  static selectedEmployee(state: EmployeeStateModel) {
    return state.selectedEmployee;
  }

  @Action(GetEmployee)
  getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    return this.fetch.getDetails().pipe(
      tap((res) => {
        const state = getState();

        setState({
          ...state,
          employees: res as Employee[],
          employeesLoaded: true,
        });
      })
    );
  }

  @Action(SetSelectedEmployee)
  SetSelectedEmployee(
    { getState, setState }: StateContext<EmployeeStateModel>,
    { id }: SetSelectedEmployee
  ) {
    const state = getState();

    const empList = state.employees;

    const index = empList.findIndex((emp) => emp.empid === id);
    if (empList.length > 0) {
      return setState({
        ...state,
        selectedEmployee: empList[index],
      });
    } else {
      return this.fetch.getDetailsById(id).pipe(
        tap((res) => {
          const empList = [res];

          setState({
            ...state,
            employees: empList as Employee[],
            selectedEmployee: empList[0] as Employee,
          });
        })
      );
    }
  }

  @Action(AddEmployee)
  addEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { payload }: AddEmployee
  ) {
    return this.fetch.addDetails(payload).pipe(
      tap((res) => {
        const state = getState();

        patchState({
          employees: [...state.employees, res] as Employee[],
        });
      })
    );
  }

  @Action(DeleteEmployee)
  deleteEmployee(
    { getState, setState }: StateContext<EmployeeStateModel>,
    { id }: DeleteEmployee
  ) {
    return this.fetch.deleteById(id).pipe(
      tap((res) => {
        const state = getState();
        const filteredEmployee = state.employees.filter(
          (result) => result.empid !== id
        );

        setState({
          ...state,
          employees: filteredEmployee,
        });
      })
    );
  }

  @Action(UpdateEmployee)
  updateEmployee(
    { getState, patchState }: StateContext<EmployeeStateModel>,
    { id, payload }: UpdateEmployee
  ) {
    return this.fetch.EditDetails(Number(id), payload).pipe(
      tap((res) => {
        const state = getState();
        console.log('state:', state);
        const empList = state.employees;
        const index = empList.findIndex((emp) => emp.empid === payload.empid);
        console.log('emp:', empList[index]);
        empList[index] = res as Employee;
        console.log('after:', res);
        patchState({
          employees: empList,
        });
      })
    );
  }
}
