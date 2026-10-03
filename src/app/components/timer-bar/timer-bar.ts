import {
  Component, input, output, inject,
  computed, effect, signal,
} from '@angular/core';
import { interval, map, takeWhile, startWith } from 'rxjs';
import { Language } from '../../services/language';

@Component({
  selector: 'app-timer-bar',
  standalone: true,
  templateUrl: './timer-bar.html',
  styleUrl: './timer-bar.scss',
})
export class TimerBar {
  duration = input<number>(20);
  resetKey = input.required<number>();
  running = input.required<boolean>();

  expired = output<void>();

  protected lang = inject(Language);

  // Signal interne : le flux de temps restant pour la question courante.
  // Il est recréé à chaque nouvelle question via l'effect plus bas.
  protected remaining = signal(this.duration());

  constructor() {
    // À chaque changement de question (resetKey) ou d'état (running),
    // on (re)construit le flux de décompte.
    effect((onCleanup) => {
      const key = this.resetKey();     // dépendances réactives
      const isRunning = this.running();

      if (!isRunning) {
        return;
      }

      const total = this.duration();
      this.remaining.set(total);

      // interval(1000) émet 0,1,2,… chaque seconde.
      // On le transforme en temps restant : total, total-1, …, 0.
      const sub = interval(1000)
        .pipe(
          map((tick) => total - (tick + 1)),
          startWith(total),
          takeWhile((r) => r >= 0),
        )
        .subscribe((r) => {
          this.remaining.set(r);
          if (r === 0) {
            this.expired.emit();
          }
        });

      // onCleanup s'exécute avant la prochaine ré-exécution de l'effect
      // (nouvelle question) ET à la destruction du composant.
      onCleanup(() => sub.unsubscribe());
    });
  }

  protected percent = computed(() => (this.remaining() / this.duration()) * 100);
}
