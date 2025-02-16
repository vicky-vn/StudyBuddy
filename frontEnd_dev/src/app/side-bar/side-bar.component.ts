import { Component } from '@angular/core';
import {NgClass, NgForOf, NgOptimizedImage} from '@angular/common';
import {SummaryService} from '../services/summary.service';
import {Summary} from '../models/summary';
import {RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-side-bar',
  imports: [
    NgForOf,
    RouterLink,
    NgClass,
    NgOptimizedImage
  ],
  templateUrl: './side-bar.component.html',
  standalone: true,
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  data: Summary[] = [];
  private subscription: Subscription;

  constructor(private summaryService: SummaryService) {
    this.subscription = this.summaryService.refreshNeeded$.subscribe(() => {
      this.loadSummaries();
    });
  }

  ngOnInit() {
    this.loadSummaries();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadSummaries() {
    this.summaryService.getSummaries().subscribe({
      next: (data: Summary[]) => this.data = data
    });
  }

}
