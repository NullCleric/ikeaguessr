import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Furniture, Question } from '../models/furniture.model';

export type GameState = 'loading' | 'playing' | 'answered' | 'gameover';

const MAX_LIVES = 3;
const OPTIONS_COUNT = 4;

@Injectable({ providedIn: 'root' })
export class Game {
  private http = inject(HttpClient);

  private catalogue = signal<Furniture[]>([]);

  readonly state = signal<GameState>('loading');
  readonly lives = signal(MAX_LIVES);
  readonly score = signal(0);
  readonly currentQuestion = signal<Question | null>(null);
  readonly selectedAnswer = signal<string | null>(null);

  private usedIds = signal<Set<number>>(new Set());

  readonly isCorrect = computed(() => {
    const q = this.currentQuestion();
    const a = this.selectedAnswer();
    return q !== null && a !== null && a === q.furniture.name;
  });

  loadAndStart(): void {
    this.http.get<Furniture[]>('furniture.json').subscribe({
      next: (data) => {
        this.catalogue.set(data);
        this.startGame();
      },
      error: (err) => console.error('Échec du chargement du catalogue', err),
    });
  }

  startGame(): void {
    this.lives.set(MAX_LIVES);
    this.score.set(0);
    this.usedIds.set(new Set());
    this.selectedAnswer.set(null);
    this.nextQuestion();
  }

  nextQuestion(): void {
    const all = this.catalogue();
    const used = this.usedIds();

    const available = all.filter((f) => !used.has(f.id));
    const pool = available.length > 0 ? available : all;

    const furniture = this.pickRandom(pool);
    this.usedIds.update((set) => new Set(set).add(furniture.id));

    const options = this.buildOptions(furniture);

    this.currentQuestion.set({ furniture, options });
    this.selectedAnswer.set(null);
    this.state.set('playing');
  }

  answer(choice: string): void {
    if (this.state() !== 'playing') return;

    this.selectedAnswer.set(choice);
    this.state.set('answered');

    if (choice === this.currentQuestion()?.furniture.name) {
      this.score.update((s) => s + 1);
    } else {
      this.loseLife();
    }
  }

  timeout(): void {
    if (this.state() !== 'playing') return;
    this.selectedAnswer.set('__timeout__');
    this.state.set('answered');
    this.loseLife();
  }

  private loseLife(): void {
    this.lives.update((l) => l - 1);
    if (this.lives() <= 0) {
      this.state.set('gameover');
    }
  }

  private pickRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private buildOptions(correct: Furniture): string[] {
    const otherNames = Array.from(
      new Set(
        this.catalogue()
          .map((f) => f.name)
          .filter((name) => name !== correct.name)
      )
    );
    const distractors = this.shuffle(otherNames).slice(0, OPTIONS_COUNT - 1);
    return this.shuffle([correct.name, ...distractors]);
  }

  private shuffle<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}
