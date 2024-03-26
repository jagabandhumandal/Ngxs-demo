import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FetchDetailsService } from '../fetch-details.service';
import { Select, Store } from '@ngxs/store';
import {
  AddEmployee,
  DeleteEmployee,
  GetEmployee,
} from '../store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnDestroy {
  result: any;

  @Select(EmployeeState.getEmployeeList) employees$!: Observable<Employee[]>;

  @Select(EmployeeState.employeeLOaded) loadedEmployee$!: Observable<boolean>;

  empSubLoaded!: Subscription;

  EmployeeDetailForm = new FormGroup({
    name: new FormControl(),
    department: new FormControl(),
    designation: new FormControl(),
  });

  constructor(private fetch: FetchDetailsService, private store: Store) {
    this.GetAllEmployeeDetails();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.store.dispatch(
      new AddEmployee(this.EmployeeDetailForm.value as Employee)
    );

    // this.fetch.addDetails(this.EmployeeDetailForm.value).subscribe(() => {
    //   this.GetAllEmployeeDetails();
    // });
  }

  GetAllEmployeeDetails() {
    // this.fetch.getDetails().subscribe((data)=>{
    //   this.result = data;
    // });
    this.empSubLoaded = this.loadedEmployee$.subscribe((res) => {
      if (!res) {
        this.store.dispatch(new GetEmployee());
      }
    });

    this.employees$.subscribe((data) => {
      this.result = data;
    });
  }

  DeleteData(id: number) {
    this.store.dispatch(new DeleteEmployee(id));
    // this.fetch.deleteById(id).subscribe(() => {
    //   this.GetAllEmployeeDetails();
    // });
  }

  ngOnDestroy(): void {
    this.empSubLoaded.unsubscribe();
  }
}
