import { Component, inject, input } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-lives-display',
  standalone: true,
  templateUrl: './lives-display.html',
  styleUrl: './lives-display.scss',
})
export class LivesDisplay {
  // Le parent passe le nombre de vies courant et le max.
  lives = input.required<number>();
  maxLives = input<number>(3);

  protected lang = inject(Language);

  // [0,1,2] : un élément par cœur à afficher.
  get hearts(): number[] {
    return Array.from({ length: this.maxLives() }, (_, i) => i);
  }
}
