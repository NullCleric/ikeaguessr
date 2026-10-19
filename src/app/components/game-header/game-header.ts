import { Component, inject, output } from '@angular/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-game-header',
  standalone: true,
  templateUrl: './game-header.html',
  styleUrl: './game-header.scss',
})
export class GameHeader {
  restart = output<void>();
  protected lang = inject(Language);
}
