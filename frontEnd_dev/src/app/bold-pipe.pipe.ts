import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'bold'
})
export class BoldPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: String | undefined): SafeHtml | undefined{
    if (!value) {
      return value;
    }
    let replaced = value.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    replaced = replaced.replace(/\n/g, '<br />');
    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }
}
