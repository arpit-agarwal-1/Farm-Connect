import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private readonly http: HttpClient) { }
  

  private readonly baseUrl = 'http://localhost:8080/feed';

  getAllFeeds(): Observable<Feed[]> {

    return this.http.get<Feed[]>(`${this.baseUrl}/getAllFeeds`);

  }

  getFeedById(id: string): Observable<Feed> {

    return this.http.get<Feed>(`${this.baseUrl}/getFeedById/${id}`);

  }

  addFeed(feed: Feed): Observable<Feed> {

    return this.http.post<Feed>(`${this.baseUrl}/addFeed`, feed);

  }

  updateFeed(id: string, feed: Feed): Observable<any> {

    return this.http.put<Feed>(`${this.baseUrl}/updateFeed/${id}`, feed);

  }

  deleteFeed(id: string): Observable<void> {

    return this.http.delete<void>(`${this.baseUrl}/deleteFeed/${id}`);

  }
}
