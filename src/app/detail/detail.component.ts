import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchDetailsService } from '../fetch-details.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEmployee } from '../store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnDestroy {
  @Select(EmployeeState.selectedEmployee)
  selectedEmployee$!: Observable<Employee>;
  result: any;
  selectedEmployeeSub!: Subscription;
  constructor(
    private fetch: FetchDetailsService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
    // this.fetch.getDetails().subscribe((data) => {
    //   this.result = data;
    // });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      let id = Number(param['get']('id'));
      // this.fetch.getDetailsById(id).subscribe((data) => {
      //   this.result = data;
      // });
      this.store.dispatch(new SetSelectedEmployee(id));
      this.selectedEmployeeSub = this.selectedEmployee$.subscribe((data) => {
        this.result = data;
      });
    });
  }

  ngOnDestroy() {
    this.selectedEmployeeSub.unsubscribe();
  }
}
