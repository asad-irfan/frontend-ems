import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  Url = environment.baseURL;
  token: any;
  httpOptions: any;

  constructor(private httpClient: HttpClient) { }

  getTokenAndHeaders() {
    this.token = localStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.token}`
      })
    };
  }

  addEmployee(employee: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.post(`${this.Url}employees`, employee, this.httpOptions);
  }

  getAllEmployees(): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}employees`, this.httpOptions);
  }
  getEmployeeById(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.get(`${this.Url}employees/${id}`, this.httpOptions);
  }

  updateEmployee(employee: any, id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.patch(`${this.Url}employees/${id}`, employee, this.httpOptions);
  }
  deleteEmployee(id: any): Observable<any> {
    this.getTokenAndHeaders();
    return this.httpClient.delete(`${this.Url}employees/${id}`, this.httpOptions);
  }

}
