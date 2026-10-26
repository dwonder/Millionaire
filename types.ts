
export enum GameState {
  Start = 'start',
  Playing = 'playing',
  End = 'end',
}

export enum SoundType {
  Start = 'start',
  Play = 'play',
  Suspense = 'suspense',
  Correct = 'correct',
  Wrong = 'wrong',
  Win = 'win',
  Lose = 'lose',
  FinalAnswer = 'final_answer',
  Tick = 'tick',
  FiftyFifty = 'fiftyFifty',
  AskAudience = 'askAudience',
  PhoneFriend = 'phoneFriend',
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category?: string;
  hostAdvice?: string;
  clue?: string;
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
  SafetyClue = 'safetyClue',
}

export interface Lifelines {
  [LifelineType.FiftyFifty]: boolean;
  [LifelineType.AskAudience]: boolean;
  [LifelineType.PhoneFriend]: boolean;
  [LifelineType.SafetyClue]?: boolean;
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

export interface LeaderboardEntry {
  partitionKey?: string;
  rowKey?: string;
  playerName: string;
  score: string;
  scoreValue: number;
  questionLevel: number;
  isWinner: boolean;
  date: string;
  title?: string;
  attempts?: number;
}

export interface AzureStorageStatus {
  connectedToAzure: boolean;
  storageType: string;
  tableName: string;
  totalRecords: number;
  azureConfigured: boolean;
}
