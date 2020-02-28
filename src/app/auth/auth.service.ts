import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Url = environment.baseURL;
  authState = new BehaviorSubject(null);
  User: Observable<any>;
  role: any;

  constructor(private httpClient: HttpClient) {
    this.loadUser();
    this.User = this.authState.asObservable();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authState.next(token);
    } else {
      this.authState.next(null);
    }
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}user/login`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.authState.next(res.token);
      }));
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.Url}user/signup`, user);
  }

}
