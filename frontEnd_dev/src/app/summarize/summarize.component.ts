import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SummaryService} from '../services/summary.service';

@Component({
  selector: 'app-summarize',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './summarize.component.html',
  styleUrl: './summarize.component.css'
})
export class SummarizeComponent {
  selectedDifficulty: string | null = "Beginner";
  summaryForm: FormGroup;

  constructor(private fb: FormBuilder, private summaryService:SummaryService) {
    this.summaryForm = this.fb.group({
      session_name: ['', Validators.required],
      input_text: ['', Validators.required]
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
