import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = 'http://localhost:8080/user';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  login(data: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }
  register(data: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, data);
  }
  getAllUsers():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllUsers`, {
      headers: this.getAuthHeaders(),
    });
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getAuthHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }
}
