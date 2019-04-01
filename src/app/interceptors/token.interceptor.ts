import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NgcSnackbarService } from 'ngc';
import { environment } from './../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: NgcSnackbarService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // TODO remover Authorization para consulta de CEP
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        // Authorization: `Bearer ${this.authService.token}`,
      }
    });



    return next.handle(request).do(
      (event: HttpEvent<any>) => event ,
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return window.location.href = environment.portalUrl;
          } else if (err.status === 403) {
            this.snackBar.error('api.generic.error');
          }
        }
      });
  }
}
