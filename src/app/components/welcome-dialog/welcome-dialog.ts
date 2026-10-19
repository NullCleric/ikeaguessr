import { Component, inject, output } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-welcome-dialog',
  standalone: true,
  templateUrl: './welcome-dialog.html',
  styleUrl: './welcome-dialog.scss',
})
export class WelcomeDialog {
  start = output<void>();
  protected lang = inject(Language);
}
