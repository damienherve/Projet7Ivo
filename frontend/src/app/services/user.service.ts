import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../common-types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Subject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.users.asObservable();
  }

  loadUsers() {
    this.http
      .get<User[]>('http://localhost:8080/api/users')
      .subscribe((users) => this.users.next(users));
  }

  deleteUser(userId: string) {
    this.http
      .delete(`http://localhost:8080/api/user/${userId}`)
      .subscribe(() => {
        this.loadUsers();
      });
  }
}
