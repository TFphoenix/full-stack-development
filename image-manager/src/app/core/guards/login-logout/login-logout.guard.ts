import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutGuard implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._authService.checkAuthentication();

    // login
    if (route.url[0].path === 'login' && this._authService.isUserAuthenticated) {
      return this._router.parseUrl('/');
    }

    // logout
    if (route.url[0].path === 'logout' && !this._authService.isUserAuthenticated) {
      return this._router.parseUrl('/');
    }

    return true;
  }
}
