import { Injectable } from '@angular/core';
import {catchError, Observable, of, throwError} from 'rxjs';
import {Summary} from '../models/summary';
import {mockData} from '../shared/mock-data';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  summaries = mockData;
  apiUrl = "http://127.0.0.1:5000"
  constructor(private http:HttpClient) { }

  getSummaries():Observable<Summary[]> {
    return of(this.summaries)
  }

  getSummaryById(id: Number):Observable<Summary | undefined> {
    const summary = this.summaries.find(s => s.id === id);
    return of(summary);
  }

  addSummary(data:any) {
    return this.http.post(this.apiUrl + "/post_user_input", data).pipe(catchError(this.handleError));
    // return this.http.get(this.apiUrl + "/get_user_input").pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    console.error('ERROR:', error);
    return throwError(() => new Error('Fatal Error!'));
  }
}
