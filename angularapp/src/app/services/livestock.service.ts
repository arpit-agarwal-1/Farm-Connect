import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {

  private readonly apiUrl = 'http://localhost:8080/livestock'; 

  constructor(private readonly http: HttpClient) { }

  getAllLivestock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllLivestock`);
  }

  addLivestock(livestock: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addLivestock`, livestock);
  }

  getLivestockById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getLivestockById/${id}`);
  }


  getLivestockByUserid(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getLivestockByUserid/${userId}`);
  }

  updateLivestock(id: string, livestock: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateLivestock/${id}`, livestock);
  }

  deleteLivestock(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteLivestock/${id}`);
  }
}
