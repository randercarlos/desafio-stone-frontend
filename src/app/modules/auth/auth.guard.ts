import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgcSnackbarService } from 'ngc';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      private authService: AuthService,
      private snackBar: NgcSnackbarService
    ) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (!localStorage.getItem('currentUser')) {
          this.router.navigate(['/auth/login']);
        }

        const routePath = next.routeConfig.path;

        return this.canAccessRoute(routePath);
    }

    canActivateChild(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.authService.currentUser) {

        window.location.href = environment.portalUrl;

        return false;
      }

      const routePath = this.getRoutePath(next);

      return this.canAccessRoute(routePath);
    }

    canAccessRoute(routePath: String) {

      console.log(routePath);

      if (!this.authService.permissoes.includes(routePath)) {
        this.snackBar.error('Acesso Negado');

        return false;
      }

      return true;
    }

    private getRoutePath(state: ActivatedRouteSnapshot) {

      let routePath = (state.routeConfig) ? state.routeConfig.path : '';

      if (state.parent) {
        const urlPath = this.getRoutePath(state.parent);

        if (urlPath) {
          routePath = this.getRoutePath(state.parent) + '/' + routePath;
        }
      }

      return routePath;
    }
}
