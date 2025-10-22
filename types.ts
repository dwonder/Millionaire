
export enum GameState {
  Start = 'start',
  Playing = 'playing',
  End = 'end',
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Prize {
  level: number;
  prize: string;
  title: string;
  isSafeZone: boolean;
}

export enum LifelineType {
  FiftyFifty = 'fiftyFifty',
  AskAudience = 'askAudience',
  PhoneFriend = 'phoneFriend',
}

export interface Lifelines {
  [LifelineType.FiftyFifty]: boolean;
  [LifelineType.AskAudience]: boolean;
  [LifelineType.PhoneFriend]: boolean;
}

export enum AnswerState {
    Default = 'default',
    Selected = 'selected',
    Correct = 'correct',
    Incorrect = 'incorrect',
    Disabled = 'disabled',
}

export interface SavedGameState {
  playerName: string;
  currentQuestionIndex: number;
  lifelines: Lifelines;
}
