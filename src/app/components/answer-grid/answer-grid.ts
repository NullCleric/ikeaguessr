import { Component, input, output, computed } from '@angular/core';
import { AnswerOption, OptionState } from '../answer-option/answer-option';

@Component({
  selector: 'app-answer-grid',
  standalone: true,
  imports: [AnswerOption],        // ← la grille utilise answer-option dans son template
  templateUrl: './answer-grid.html',
  styleUrl: './answer-grid.scss',
})
export class AnswerGrid {
  options = input.required<string[]>();      // les 4 noms
  correctAnswer = input.required<string>();  // le bon nom
  selected = input<string | null>(null);     // ce que le joueur a cliqué
  answered = input<boolean>(false);          // a-t-on déjà répondu ?

  picked = output<string>();                 // remonte le clic vers le haut

  // Calcule l'état visuel d'un bouton donné.
  protected stateFor(option: string): OptionState {
    // Tant qu'on n'a pas répondu : tout est neutre.
    if (!this.answered()) return 'idle';

    // Après réponse : la bonne passe en vert, toujours.
    if (option === this.correctAnswer()) return 'correct';

    // Celle qu'on a cliquée à tort passe en rouge.
    if (option === this.selected()) return 'wrong';

    // Les autres s'estompent.
    return 'muted';
  }
}
