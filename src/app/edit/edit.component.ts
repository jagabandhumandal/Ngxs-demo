import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FetchDetailsService } from '../fetch-details.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {
  SetSelectedEmployee,
  UpdateEmployee,
} from '../store/actions/employee.action';
import { Employee } from '../models/Employee';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  result: any;
  @Select(EmployeeState.selectedEmployee)
  selectedEmployee$!: Observable<Employee>;
  selectedEmployeeSub!: Subscription;

  EmployeeDetailForm = new FormGroup({
    name: new FormControl(),
    department: new FormControl(),
    designation: new FormControl(),
  });
  constructor(
    private fetch: FetchDetailsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      let id = Number(param['get']('id'));
      console.log('id', id);
      // this.fetch.getDetailsById(id).subscribe((data) => {
      //   this.result = data;
      // });
      this.store.dispatch(new SetSelectedEmployee(id));
      this.selectedEmployeeSub = this.selectedEmployee$.subscribe((data) => {
        // console.log('hello', data);
        // this.result = data;
        this.EmployeeDetailForm = new FormGroup({
          name: new FormControl(data.name),
          department: new FormControl(data.department),
          designation: new FormControl(data.designation),
        });
      });
    });
  }

  onSubmit() {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      let id = Number(param['get']('id'));

      //   this.fetch
      //     .EditDetails(id, this.EmployeeDetailForm.value)
      //     .subscribe(() => {
      //       this.router.navigateByUrl('/display');
      //     });
      // });
      console.log('component:', this.EmployeeDetailForm.value);
      this.store.dispatch(
        new UpdateEmployee(id, this.EmployeeDetailForm.value as Employee)
      );
      this.router.navigateByUrl('/display');
    });
  }

  ngOnDestroy() {
    this.selectedEmployeeSub.unsubscribe();
  }
}
