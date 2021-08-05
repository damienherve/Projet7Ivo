import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private userId: string;

  get isLoggedIn() {
    return this.isAuth$.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('TOKEN', token);
      this.setToken(token);
    }
  }

  createUser(fullName: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post('http://localhost:8080/api/auth/signup', {
          fullName: fullName,
          email: email,
          password: password,
        })
        .subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  private setToken = (token: string) => {
    this.authToken = token;
    localStorage.setItem('token', token);
    this.isAuth$.next(true);
  };

  loginUser(email: string, password) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post('http://localhost:8080/api/auth/login', {
          email: email,
          password: password,
        })
        .subscribe(
          (response: { userId: string; token: string }) => {
            this.userId = response.userId;
            this.setToken(response.token);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('token');
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }
}
