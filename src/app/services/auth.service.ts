import { Injectable, Injector } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  public token: string;

  public username;

  public permissoes = [];

  public user;

  constructor(
    private injector: Injector,
    private router: Router) {

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;

      if (currentUser && currentUser.permissoes) {
        this.permissoes = currentUser && currentUser.permissoes;
      }
  }

  public get http(): HttpClient {
    return this.injector.get(HttpClient);
  }

  currentUser(): Observable<User> {
    return this.http.get<User>(environment.apiUrlPortal + 'current-user');
  }

  logout(): Observable<any> {
    return this.http.get(environment.apiUrlPortal + 'logout');
  }
}
