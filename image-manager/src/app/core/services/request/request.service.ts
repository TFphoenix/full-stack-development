import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/shared/constants';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly _baseUrl: string = environment.services.api;
  private readonly _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private readonly _http: HttpClient, private readonly _router: Router) { }

  get<T = any>(url: string): Observable<any> {
    const headers = this.getHeaders();

    return this._http
      .get<T>(this._baseUrl + url, {
        headers: headers,
        reportProgress: true
      })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  post<T = any>(url: string, body: any): Observable<any> {
    const headers = this.getHeaders();

    return this._http
      .post<T>(this._baseUrl + url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  postImage<T = any>(url: string, body: File) {
    // only need Authorization header
    // fails if Content-Type header is present
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Authorization': `Bearer ${localStorage.getItem(Constants.LocalStorage.authToken)}`
      }
    );
    const formData: FormData = new FormData();
    formData.append('file', body, body.name);

    return this._http
      .post<T>(
        this._baseUrl + url,
        formData,
        {
          headers: headers,
          reportProgress: true
        }
      )
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  postUnhandled<T = any>(url: string, body: any): Observable<any> {
    const headers = this.getHeaders();

    return this._http.post<T>(this._baseUrl + url, body, {
      headers: headers,
      reportProgress: true
    });
  }

  put<T = any>(url: string, body: any): Observable<any> {
    const headers = this.getHeaders();

    return this._http
      .put<T>(this._baseUrl + url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  patch<T = any>(url: string, body: any): Observable<any> {
    const headers = this.getHeaders().set('X-HTTP-Method-Override', 'PATCH');

    return this._http
      .post<T>(this._baseUrl + url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  delete<T = any>(url: string, ids: string[] = null): Observable<any> {
    const headers = this.getHeaders();

    url = this._baseUrl + url;

    if (ids) {
      if (ids.length > 1) {
        // many ids to delete
        return this._http.post<T>(`${this._baseUrl + url}:delete`, ids, {
          headers: headers,
          reportProgress: true
        });
      }

      if (ids.length === 1) {
        // one id to delete and was provided in the ids param
        url = `${this._baseUrl + url}/${ids[0]}`;
      }
    }

    return this._http
      .delete<T>(url, {
        headers: headers,
        reportProgress: true
      })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            localStorage.removeItem(Constants.LocalStorage.authToken);
            this._router.navigate(['/login']);
            return of(null);
          }
        })
      );
  }

  private getHeaders() {
    return this._headers.append('Authorization', `Bearer ${localStorage.getItem(Constants.LocalStorage.authToken)}`);
  }
}
