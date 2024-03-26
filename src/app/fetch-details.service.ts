import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/Employee';

@Injectable({
  providedIn: 'root',
})
export class FetchDetailsService {
  constructor(private http: HttpClient) {}

  getDetails() {
    return this.http.get('https://localhost:7137/api/employees');
  }

  getDetailsById(id: number) {
    return this.http.get('https://localhost:7137/api/employees/' + id);
  }

  addDetails(employeeDetail: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(employeeDetail);
    return this.http.post(
      'https://localhost:7137/api/employees/adddetails',
      body,
      { headers: headers }
    );
  }

  EditDetails(id: number, employeeDetail: any) {
    const headers = { 'content-type': 'application/json' };
    employeeDetail.empid = id;
    const body = JSON.stringify(employeeDetail);
    return this.http.put('https://localhost:7137/api/employees/' + id, body, {
      headers: headers,
    });
  }
  deleteById(id: number) {
    return this.http.delete('https://localhost:7137/api/employees/' + id);
  }
}
