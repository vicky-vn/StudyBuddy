import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SummaryService } from '../services/summary.service';
import { NgIf } from '@angular/common';
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
      input_text: ['', Validators.required]
    });
  }

  selectInputMethod(method: string): void {
    this.selectedInputMethod = method;
    // Reset the form control for input_text and file selection when switching
    if (method === 'file') {
      this.summaryForm.patchValue({ input_text: '' });
      this.selectedFile = null;
    } else if (method === 'text') {
      this.selectedFile = null;
    }
  }

  /**
   * Sets the selected difficulty level.
   */
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
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        // Patch the file's text content into the form control
        this.summaryForm.patchValue({ input_text: fileContent });
        this.submitSummary();
      };
      reader.onerror = () => {
        this.error = 'Error reading file.';
      };
      reader.readAsText(this.selectedFile);
    } else {
      // For text input, just validate and submit the form
      if (this.summaryForm.valid) {
        this.submitSummary();
      } else {
        this.error = 'All fields must be filled!';
      }
    }
  }

  /**
   * Submits the summary data to the backend.
   * Expects a response containing an "id" property.
   */
  submitSummary(): void {
    if (this.summaryForm.valid) {
      // You may add additional data (like difficulty) here if needed.
      const data = { ...this.summaryForm.value };
      this.summaryService.addSummary(data).subscribe({
        next: (response: any) => {
          console.log('Response from API:', response);
          // Navigate to the summary page using the returned id
          this.router.navigate(['/summary', response.id], { replaceUrl: true });
        },
        error: (error: any) => {
          this.error = 'Failed to create summary. Please try again.';
          console.error('Error creating summary:', error);
        }
      });
    } else {
      this.error = 'All fields must be filled!';
    }
  }

  protected readonly SummaryService = SummaryService;
}
