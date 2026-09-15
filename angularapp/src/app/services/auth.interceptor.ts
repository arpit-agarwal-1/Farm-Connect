import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  catchError,
  throwError
} from 'rxjs';
import { Router } from '@angular/router';
import { AuthStorageService } from './auth-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router, private authStorage: AuthStorageService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token = this.authStorage.getItem('token');

    const publicApis = [
      '/user/login',
      '/user/signup',
      '/user/forgot-password'
    ]

    if (publicApis.some(url => request.url.includes(url))) {
      return next.handle(request);
    }
    let authRequest = request;

    if (token) {
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          // localStorage.removeItem('token');
          // localStorage.removeItem('role');
          this.authStorage.clear();
          this.router.navigate(['/home']);
        }
        return throwError(() => error);
      })
    );
  }
}
