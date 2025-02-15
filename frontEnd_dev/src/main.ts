/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, Routes} from '@angular/router';
import {SummaryComponent} from './app/summary/summary.component';
import {SummarizeComponent} from './app/summarize/summarize.component';
import {provideHttpClient} from "@angular/common/http";

const routes: Routes = [
  { path: '', redirectTo: '/summary', pathMatch: 'full' },
  { path: 'summary', component:SummarizeComponent},
  { path: 'summary/:id', component: SummaryComponent },
];


bootstrapApplication(AppComponent, {providers: [provideRouter(routes), provideHttpClient()]})
  .catch((err) => console.error(err));
