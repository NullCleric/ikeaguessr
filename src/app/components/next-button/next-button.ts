import { Component, inject, output } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-next-button',
  standalone: true,
  templateUrl: './next-button.html',
  styleUrl: './next-button.scss',
})
export class NextButton {
  clicked = output<void>();
  protected lang = inject(Language);
}
