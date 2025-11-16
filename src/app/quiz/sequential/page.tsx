"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QuizCard } from "@/components/quiz-card";
import { VocabularyItem } from "@/types/vocabulary";
import vocabularyData from "../../../../erp.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, RotateCw, List as ListIcon, Shuffle } from "lucide-react";
import Link from "next/link";

export default function SequentialQuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filteredList, setFilteredList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const storedIds = sessionStorage.getItem("sequentialQuizIds");
    if (!storedIds) {
      router.push("/list");
      return;
    }

    try {
      const ids = JSON.parse(storedIds) as number[];
      const items = (vocabularyData as VocabularyItem[]).filter((item) =>
        ids.includes(item.id)
      );
      setFilteredList(items);
    } catch (error) {
      console.error("Failed to parse quiz IDs:", error);
      router.push("/list");
    }
  }, [router]);

  if (filteredList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">로딩 중...</div>
        </div>
      </div>
    );
  }

  const totalCount = filteredList.length;
  const currentItem = filteredList[currentIndex];
  const progressText = `${currentIndex + 1} / ${totalCount}`;

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
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
              전체 용어를 순서대로 모두 학습했습니다!
            </CardTitle>
            <p className="text-lg sm:text-xl text-green-100">
              이제 랜덤 퀴즈로 복습해보세요!
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {totalCount}개 완료
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                순서대로 모든 용어를 학습하셨습니다
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/quiz/random" className="block">
                <Button
                  className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
                  size="lg"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  랜덤 퀴즈로 이동
                </Button>
              </Link>

              <Link href="/list" className="block">
                <Button
                  variant="outline"
                  className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] border-2 font-semibold"
                  size="lg"
                >
                  <ListIcon className="w-5 h-5 mr-2" />
                  전체 목록으로 돌아가기
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
          <Link href="/list">
            <Button variant="outline" size="sm" className="gap-2 min-h-[40px]">
              <ListIcon className="w-4 h-4" />
              목록으로
            </Button>
          </Link>
        </div>
        <QuizCard
          item={currentItem}
          mode="random"
          onNext={handleNext}
          progress={progressText}
        />
      </div>
    </div>
  );
}
