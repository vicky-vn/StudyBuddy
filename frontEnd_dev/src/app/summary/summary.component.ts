import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SummaryService} from '../services/summary.service';
import {Summary} from '../models/summary';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  standalone: true,
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  summary: Summary | undefined;

  constructor(
    private route: ActivatedRoute,
    private summaryService: SummaryService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.summaryService.getSummaryById(Number(id)).subscribe((data) => {
        this.summary = data;
      });
    });
  }

  protected readonly SummaryService = SummaryService;
}
