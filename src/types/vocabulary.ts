export interface VocabularyItem {
  id: number;
  abbr: string;
  fullname: string;
  description: string;
}

export interface QuizAnswer {
  fullname: string;
  description: string;
}

export interface QuizResult {
  fullnameCorrect: boolean;
  descriptionCorrect: boolean;
}
