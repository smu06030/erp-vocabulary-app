"use client";

import { useParams, useRouter } from "next/navigation";
import { QuizCard } from "@/components/quiz-card";
import { VocabularyItem } from "@/types/vocabulary";
import { getItemById } from "@/lib/quiz";
import vocabularyData from "../../../../erp.json";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function SelectedQuizPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const item = getItemById(vocabularyData as VocabularyItem[], id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">
            용어를 찾을 수 없습니다
          </h1>
          <p className="text-muted-foreground">존재하지 않는 용어 ID입니다.</p>
          <Link href="/list">
            <Button>목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBackToList = () => {
    router.push("/list");
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
        <QuizCard item={item} mode="selected" onBackToList={handleBackToList} />
      </div>
    </div>
  );
}
