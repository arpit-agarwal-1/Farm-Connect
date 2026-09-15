import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly baseUrl = 'http://localhost:8080/request';

  constructor(private readonly http: HttpClient) { }



  addRequest(requestObject: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addRequest`, requestObject);
  }

  getRequestsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRequestsByUserId/${userId}`);
  }


  deleteRequest(requestId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRequest/${requestId}`);
  }


  updateRequest(requestId: string, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateRequest/${requestId}`, request);
  }

  updateRequestStatus(requestId:string, status:string):Observable<any>{
    return this.http.patch(`${this.baseUrl}/updateStatus/${requestId}`, {status});
  }


  getAllRequests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllRequests`);
  }
}
