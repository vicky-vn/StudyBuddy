import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SummaryService } from '../services/summary.service';
import {formatDate, NgIf} from '@angular/common';
import { Router } from '@angular/router';
import { Summary } from '../models/summary';

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
  error: string | null = null;
  summaryForm: FormGroup;
  selectedInputMethod: string = 'file';
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private summaryService: SummaryService,
    private router: Router
  ) {
    this.summaryForm = this.fb.group({
      session_name: ['', Validators.required],
      input_text: ['', Validators.required],
      language: ['English', Validators.required]
    });
  }

  selectInputMethod(method: string): void {
    this.selectedInputMethod = method;
    if (method === 'file') {
      this.summaryForm.patchValue({ input_text: '' });
      this.selectedFile = null;
    } else if (method === 'text') {
      this.selectedFile = null;
    }
  }

  selectDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    this.error = null;
    if (this.selectedInputMethod === 'file') {
      if (!this.selectedFile) {
        this.error = 'Please select a file.';
        return;
      }

      const formData = new FormData();
      formData.append('session_name', this.summaryForm.get('session_name')?.value);
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('language', this.summaryForm.get('language')?.value);
      console.log(formData);
      this.submitSummary(formData);
    } else {
      if (this.summaryForm.valid) {
        const formData = new FormData();
        formData.append('session_name', this.summaryForm.get('session_name')?.value);
        formData.append('input_text', this.summaryForm.get('input_text')?.value);
        formData.append('language', this.summaryForm.get('language')?.value);


        this.submitSummary(formData);
      } else {
        this.error = 'All fields must be filled!';
      }
    }
  }

  submitSummary(formData: FormData): void {
    this.summaryService.addSummary(formData).subscribe({
      next: (response: any) => {
        console.log('Response from API:', response);

        this.summaryService.summarize(response.id, this.selectedDifficulty!, this.summaryForm.get('language')?.value).subscribe({
          next: (summaryResponse: any) => {
            console.log('Summarized data:', summaryResponse);
            this.router.navigate(['/summary', summaryResponse.id], { replaceUrl: true });
          },
          error: (error: any) => {
            this.error = 'Failed to summarize. Please try again.';
            console.error('Error summarizing:', error);
          }
        });

        this.router.navigate(['/summary', response.id], { replaceUrl: true });
      },
      error: (error: any) => {
        this.error = 'Failed to create summary. Please try again.';
        console.error('Error creating summary:', error);
      }
    });
  }
  protected readonly SummaryService = SummaryService;
}
