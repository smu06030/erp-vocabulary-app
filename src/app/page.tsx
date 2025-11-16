"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { VocabularyItem, QuizAnswer } from "@/types/vocabulary";
import { getRandomItem, checkAnswer } from "@/lib/quiz";
import vocabularyData from "../../erp.json";

export default function Home() {
  const [currentItem, setCurrentItem] = useState<VocabularyItem>(() =>
    getRandomItem(vocabularyData as VocabularyItem[])
  );
  const [userAnswer, setUserAnswer] = useState<QuizAnswer>({
    fullname: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    fullnameCorrect: boolean;
    descriptionCorrect: boolean;
  } | null>(null);

  const handleSubmit = () => {
    const quizResult = checkAnswer(userAnswer, currentItem);
    setResult(quizResult);
    setSubmitted(true);
  };

  const handleNext = () => {
    const newItem = getRandomItem(vocabularyData as VocabularyItem[]);
    setCurrentItem(newItem);
    setUserAnswer({ fullname: "", description: "" });
    setSubmitted(false);
    setResult(null);
  };

  const isFormValid =
    userAnswer.fullname.trim() && userAnswer.description.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">ERP 단어 연습장</CardTitle>
          <p className="text-blue-100">
            약어를 보고 영문 풀네임과 한글 설명을 입력하세요
          </p>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground font-medium">문제</p>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-8 shadow-lg">
              <p className="text-6xl font-bold tracking-wider">
                {currentItem.abbr}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-base font-semibold">
                영문 풀네임
              </Label>
              <Input
                id="fullname"
                type="text"
                placeholder="예: Enterprise Resource Planning"
                value={userAnswer.fullname}
                onChange={(e) =>
                  setUserAnswer({ ...userAnswer, fullname: e.target.value })
                }
                disabled={submitted}
                className="text-lg p-6"
              />
              {submitted && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {result?.fullnameCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={
                        result?.fullnameCorrect
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {result?.fullnameCorrect ? "정답입니다!" : "오답입니다"}
                    </span>
                  </div>
                  {!result?.fullnameCorrect && (
                    <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                      정답:{" "}
                      <span className="font-semibold text-blue-700">
                        {currentItem.fullname}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                한글 설명
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="예: 기업의 자원을 통합 관리하는 시스템"
                value={userAnswer.description}
                onChange={(e) =>
                  setUserAnswer({ ...userAnswer, description: e.target.value })
                }
                disabled={submitted}
                className="text-lg p-6"
              />
              {submitted && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {result?.descriptionCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span
                      className={
                        result?.descriptionCorrect
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {result?.descriptionCorrect
                        ? "정답입니다!"
                        : "오답입니다"}
                    </span>
                  </div>
                  {!result?.descriptionCorrect && (
                    <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                      정답:{" "}
                      <span className="font-semibold text-blue-700">
                        {currentItem.description}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {!submitted ? (
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                제출하기
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full text-lg py-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                size="lg"
              >
                다음 문제
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
