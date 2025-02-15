import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {SummaryService} from '../services/summary.service';
import {Summary} from '../models/summary';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './side-bar.component.html',
  standalone: true,
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  data:Summary[] = [];
  constructor(private summaryService: SummaryService) {
  }

  ngOnInit() {
   this.summaryService.getSummaries().subscribe({next: (data: Summary[]) => this.data = data});
  }

}
