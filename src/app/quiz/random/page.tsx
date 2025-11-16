"use client";

import { useState } from "react";
import { QuizCard } from "@/components/quiz-card";
import { VocabularyItem } from "@/types/vocabulary";
import { getRandomItem } from "@/lib/quiz";
import vocabularyData from "../../../../erp.json";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RandomQuizPage() {
  const [currentItem, setCurrentItem] = useState<VocabularyItem>(() =>
    getRandomItem(vocabularyData as VocabularyItem[])
  );

  const handleNext = () => {
    const newItem = getRandomItem(vocabularyData as VocabularyItem[]);
    setCurrentItem(newItem);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex justify-start">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
        </div>
        <QuizCard item={currentItem} mode="random" onNext={handleNext} />
      </div>
    </div>
  );
}

