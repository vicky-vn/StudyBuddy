import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, Subject, tap, throwError} from 'rxjs';
import {Summary} from '../models/summary';
// import {mockData} from '../shared/mock-data';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = "http://127.0.0.1:5000";
  private refreshNeeded = new Subject<void>();

  refreshNeeded$ = this.refreshNeeded.asObservable();

  constructor(private http: HttpClient) { }

  getSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(this.apiUrl + "/get_user_input");
  }

  getSummaryById(id: string | null): Observable<Summary | undefined> {
    return this.getSummaries().pipe(
      map((summaries: Summary[]) =>
        summaries.find((summary: Summary) => summary._id === id)
      )
    );
  }

  addSummary(data: any): Observable<Summary> {
    return this.http.post<Summary>(this.apiUrl + "/post_user_input", data).pipe(
      tap(() => {
        // Emit value after successful post
        this.refreshNeeded.next();
      }),
      catchError(this.handleError)
    );
  }

  summarize(id: string, difficulty: string): Observable<{ id: string; summary: string }> {
    const payload = {
      id,
      difficulty_level: difficulty
    };
    return this.http.post<{ id: string; summary: string }>(`${this.apiUrl}/summarize`, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('ERROR:', error);
    return throwError(() => new Error('Fatal Error!'));
  }
}
