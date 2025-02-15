import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Summary} from '../models/summary';
import {mockData} from '../shared/mock-data';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  summaries = mockData;
  constructor() { }

  getSummaries():Observable<Summary[]> {
    return of(this.summaries)
  }

  getSummaryById(id: Number):Observable<Summary | undefined> {
    const summary = this.summaries.find(s => s.id === id);
    return of(summary);
  }
}
