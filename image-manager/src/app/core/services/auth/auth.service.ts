import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { RequestService } from '../request/request.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated: boolean = false;
  userData: any;

  constructor(private readonly _requestService: RequestService) {}

  login(loginData: any) {
    this.loginUser(loginData).subscribe(
      data => {
        localStorage.setItem(Constants.LocalStorage.authToken, data.token);
        this.isUserAuthenticated = true;

        // this.token = data.token;
        // this.router.navigate(['table']);
      },
      err => {
        alert(err.message);
        this.isUserAuthenticated = false;
      }
    );
  }

  private loginUser(body: any): Observable<any> {
    return this._requestService.post('login', body).pipe(
      tap(data => {
        console.log(data);
        this.userData = data;
      })
    );
  }

  logout() {
    this.isUserAuthenticated = false;
  }
}
