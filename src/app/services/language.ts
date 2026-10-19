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
    restart: 'Recommencer',
    welcomeTitle: 'Bienvenue sur IKEA Guessr !',
    welcomeIntro: 'BILLY, KALLAX, HEMNES… Connaissez-vous vraiment les noms des meubles IKEA ?',
    ruleGuess: 'Un meuble s’affiche : retrouvez son nom parmi 4 propositions.',
    ruleTimer: 'Vous avez 20 secondes pour répondre à chaque question.',
    ruleLives: 'Vous avez 3 vies. Chaque erreur ou temps écoulé en coûte une.',
    startGame: 'Commencer à jouer',
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
    restart: 'Restart',
    welcomeTitle: 'Welcome to IKEA Guessr!',
    welcomeIntro: 'BILLY, KALLAX, HEMNES… Do you really know your IKEA furniture names?',
    ruleGuess: 'A piece of furniture appears: find its name among 4 options.',
    ruleTimer: 'You have 20 seconds to answer each question.',
    ruleLives: 'You have 3 lives. Each mistake or timeout costs one.',
    startGame: 'Start playing',
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
