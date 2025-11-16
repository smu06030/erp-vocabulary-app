"use client";

import { useState, useEffect } from "react";
import { QuizCard } from "@/components/quiz-card";
import { VocabularyItem } from "@/types/vocabulary";
import { shuffleArray } from "@/lib/quiz";
import vocabularyData from "../../../../erp.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, RotateCw, List as ListIcon } from "lucide-react";
import Link from "next/link";

export default function RandomQuizPage() {
  const [shuffledList, setShuffledList] = useState<VocabularyItem[] | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setShuffledList(shuffleArray(vocabularyData as VocabularyItem[]));
  }, []);

  if (!shuffledList) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">로딩 중...</div>
        </div>
      </div>
    );
  }

  const totalCount = shuffledList.length;
  const currentItem = shuffledList[currentIndex];
  const progressText = `${currentIndex + 1} / ${totalCount}`;

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center space-y-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg py-12 px-4">
            <div className="flex justify-center">
              <div className="text-6xl">🎉</div>
            </div>
            <CardTitle className="text-2xl sm:text-4xl font-bold">
              모든 문제를 완료했습니다!
            </CardTitle>
            <p className="text-lg sm:text-xl text-green-100">
              수고하셨어요! 오늘도 성장했습니다.
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {totalCount}개 완료
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                모든 ERP 용어를 학습하셨습니다
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleRestart}
                className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                size="lg"
              >
                <RotateCw className="w-5 h-5 mr-2" />
                다시 시작하기
              </Button>

              <Link href="/list" className="block">
                <Button
                  variant="outline"
                  className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] border-2 font-semibold"
                  size="lg"
                >
                  <ListIcon className="w-5 h-5 mr-2" />
                  전체 용어 보기
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="ghost"
                  className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px]"
                  size="lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  홈으로
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 min-h-[40px]">
              <Home className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
        </div>
        <QuizCard
          item={currentItem}
          mode="random"
          onNext={handleNext}
          progress={progressText as string}
        />
      </div>
    </div>
  );
}
