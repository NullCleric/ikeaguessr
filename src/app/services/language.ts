import { Injectable, signal } from '@angular/core';

export type Lang = 'fr' | 'en';

const TRANSLATIONS = {
  fr: {
    subtitle: 'Le quiz des meubles',
    livesLeft: 'Vie restante',
    timeLeft: 'Temps restant',
    nextQuestion: 'Question suivante',
    correct: 'Bonne réponse !',
    wrong: 'Mauvaise réponse',
    theAnswerWas: 'La réponse était',
    gameOver: 'Partie terminée',
    yourScore: 'Votre score',
    playAgain: 'Rejouer ?',
    loading: 'Chargement…',
  },
  en: {
    subtitle: 'The Furniture Quiz Game',
    livesLeft: 'Lives left',
    timeLeft: 'Time left',
    nextQuestion: 'Next question',
    correct: 'Correct!',
    wrong: 'Wrong answer',
    theAnswerWas: 'The answer was',
    gameOver: 'Game over',
    yourScore: 'Your score',
    playAgain: 'Play again?',
    loading: 'Loading…',
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS['fr'];

@Injectable({ providedIn: 'root' })
export class Language {
  readonly lang = signal<Lang>(this.detectBrowserLang());

  private detectBrowserLang(): Lang {
    const code = navigator.language.toLowerCase();
    return code.startsWith('fr') ? 'fr' : 'en';
  }

  t(key: TranslationKey): string {
    return TRANSLATIONS[this.lang()][key];
  }
}
