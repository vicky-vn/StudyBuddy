import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SummaryService} from '../services/summary.service';
import {Summary} from '../models/summary';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-summary',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './summary.component.html',
  standalone: true,
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  summary: Summary | undefined;
  selectedDifficulty: string | null = "Beginner";
  summaryForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private summaryService: SummaryService,
    private fb: FormBuilder,
  ) {
    this.summaryForm = this.fb.group({
      session_name: ['', Validators.required],
      input_text: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.summaryService.getSummaryById(id).subscribe((data) => {
        this.summary = data;
      });
    });
  }
  selectDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
  }

  onSubmit() {
    if (this.summaryForm.valid) {
      this.summaryService.addSummary(this.summaryForm.value).subscribe()
    }
  }

  protected readonly SummaryService = SummaryService;
}
