import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SummaryService} from '../services/summary.service';
import {NgIf} from '@angular/common';
import {SideBarComponent} from '../side-bar/side-bar.component';

@Component({
  selector: 'app-summarize',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true,
  templateUrl: './summarize.component.html',
  styleUrl: './summarize.component.css'
})
export class SummarizeComponent {
  selectedDifficulty: string | null = "Beginner";
  error: string | null = null
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
      this.summaryService.addSummary(this.summaryForm.value).subscribe();
    } else {
        this.error = "All fields must be filled!";
    }
  }

  protected readonly SummaryService = SummaryService;

}
