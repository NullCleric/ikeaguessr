import { Component, inject, OnInit, computed } from '@angular/core';
import { Game } from './services/game';
import { Language } from './services/language';

import { GameHeader } from './components/game-header/game-header';
import { LivesDisplay } from './components/lives-display/lives-display';
import { FurnitureImage } from './components/furniture-image/furniture-image';
import { TimerBar } from './components/timer-bar/timer-bar';
import { AnswerGrid } from './components/answer-grid/answer-grid';
import { NextButton } from './components/next-button/next-button';
import { GameOverDialog } from './components/game-over-dialog/game-over-dialog';
import { WelcomeDialog } from './components/welcome-dialog/welcome-dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GameHeader,
    LivesDisplay,
    FurnitureImage,
    TimerBar,
    AnswerGrid,
    NextButton,
    GameOverDialog,
    WelcomeDialog,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected game = inject(Game);
  protected lang = inject(Language);

  ngOnInit(): void {
    this.game.loadCatalogue();
  }

  // Le timer tourne uniquement pendant qu'on attend une réponse.
  protected isPlaying = computed(() => this.game.state() === 'playing');

  // On a répondu (ou le temps a expiré) : on montre la correction.
  protected hasAnswered = computed(() => this.game.state() === 'answered');

  protected isIntro = computed(() => this.game.state() === 'intro');

  protected isGameOver = computed(() => this.game.state() === 'gameover');
}
