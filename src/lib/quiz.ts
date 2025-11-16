import { VocabularyItem, QuizAnswer, QuizResult } from "@/types/vocabulary";

export function getRandomItem(items: VocabularyItem[]): VocabularyItem {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function getItemById(
  items: VocabularyItem[],
  id: number
): VocabularyItem | undefined {
  return items.find((item) => item.id === id);
}

export function normalizeText(text: string): string {
  return text.trim().toLowerCase();
}

export function checkAnswer(
  userAnswer: QuizAnswer,
  correctAnswer: VocabularyItem
): QuizResult {
  const normalizedUserFullname = normalizeText(userAnswer.fullname);
  const normalizedCorrectFullname = normalizeText(correctAnswer.fullname);

  const normalizedUserDescription = normalizeText(userAnswer.description);
  const normalizedCorrectDescription = normalizeText(correctAnswer.description);

  return {
    fullnameCorrect: normalizedUserFullname === normalizedCorrectFullname,
    descriptionCorrect:
      normalizedCorrectDescription.includes(normalizedUserDescription) ||
      normalizedUserDescription.includes(normalizedCorrectDescription),
  };
}
