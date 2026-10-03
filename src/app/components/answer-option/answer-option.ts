import { Component, input, output, computed } from '@angular/core';

// L'état visuel d'un bouton, calculé par la grille parente.
export type OptionState = 'idle' | 'correct' | 'wrong' | 'muted';

@Component({
  selector: 'app-answer-option',
  standalone: true,
  templateUrl: './answer-option.html',
  styleUrl: './answer-option.scss',
})
export class AnswerOption {
  label = input.required<string>();
  state = input<OptionState>('idle');
  disabled = input<boolean>(false);

  // Remonte le nom choisi au parent quand on clique.
  picked = output<string>();

  protected onClick(): void {
    if (!this.disabled()) {
      this.picked.emit(this.label());
    }
  }
}
