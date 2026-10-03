import { Component, inject, input, output } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-game-over-dialog',
  standalone: true,
  templateUrl: './game-over-dialog.html',
  styleUrl: './game-over-dialog.scss',
})
export class GameOverDialog {
  score = input.required<number>();
  replay = output<void>();
  protected lang = inject(Language);
}
