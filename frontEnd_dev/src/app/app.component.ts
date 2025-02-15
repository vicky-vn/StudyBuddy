import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SummarizeComponent} from './summarize/summarize.component';
import {SideBarComponent} from './side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SummarizeComponent, SideBarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'winhacks';
}
