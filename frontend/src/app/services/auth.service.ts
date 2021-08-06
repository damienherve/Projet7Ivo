import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Role, User } from '../common-types';

interface AuthResponse {
  user: User;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  isAdmin = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private currentUser?: User = undefined;

  get isLoggedIn() {
    return this.isAuth.asObservable();
  }

  getToken() {
    return this.authToken;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }

  createUser(fullName: string, email: string, password: string) {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.http
        .post('http://localhost:8080/api/auth/signup', {
          fullName: fullName,
          email: email,
          password: password,
        })
        .subscribe(
          (response: AuthResponse) => {
            this.setUser(response.user);
            this.setToken(response.token);
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  private setToken = (token: string) => {
    this.authToken = token;
    localStorage.setItem('token', token);
    this.isAuth.next(true);
  };

  private setUser = (user: User) => {
    this.currentUser = user;
    this.isAdmin.next(user.role === Role.ADMIN);
  };

  loginUser(email: string, password) {
    return new Promise<AuthResponse>((resolve, reject) => {
      this.http
        .post('http://localhost:8080/api/auth/login', {
          email: email,
          password: password,
        })
        .subscribe(
          (response: AuthResponse) => {
            this.setUser(response.user);
            this.setToken(response.token);
            resolve(response);
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
    this.currentUser = undefined;
    this.isAuth.next(false);
    this.router.navigate(['login']);
  }
}
