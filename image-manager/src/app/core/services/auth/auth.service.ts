import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { RequestService } from '../request/request.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated: boolean = false;
  userData: any;

  constructor(private readonly _requestService: RequestService, private readonly _router: Router) {}

  login(loginData: any) {
    this.loginUser(loginData).subscribe(
      data => {
        this.isUserAuthenticated = true;

        this._router.navigate(['/']);
      },
      err => {
        alert(err.message); // TODO: Display toastr alert
        this.isUserAuthenticated = false;
      }
    );
  }

  logout() {
    this.isUserAuthenticated = false;
    this._router.navigate(['/login']);
  }

  private loginUser(body: any): Observable<any> {
    return this._requestService.post(Constants.ApiEndpoints.login, body).pipe(
      tap(responseToken => {
        localStorage.setItem(Constants.LocalStorage.authToken, responseToken);
        this.userData = responseToken;
      })
    );
  }
}
