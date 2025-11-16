"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  List,
  RotateCcw,
} from "lucide-react";
import { VocabularyItem, QuizAnswer } from "@/types/vocabulary";
import { checkAnswer } from "@/lib/quiz";

interface QuizCardProps {
  item: VocabularyItem;
  mode: "random" | "selected";
  onNext?: () => void;
  onBackToList?: () => void;
  progress?: string;
}

export function QuizCard({
  item,
  mode,
  onNext,
  onBackToList,
  progress,
}: QuizCardProps) {
  const [userAnswer, setUserAnswer] = useState<QuizAnswer>({
    fullname: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    fullnameCorrect: boolean;
    descriptionCorrect: boolean;
  } | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const fullnameInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setUserAnswer({ fullname: "", description: "" });
    setSubmitted(false);
    setResult(null);
    scrollToTop();

    setTimeout(() => {
      fullnameInputRef.current?.focus();
    }, 100);
  }, [item]);

  const scrollToTop = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    const quizResult = checkAnswer(userAnswer, item);
    setResult(quizResult);
    setSubmitted(true);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 100);
  };

  const handleRetry = () => {
    setUserAnswer({ fullname: "", description: "" });
    setSubmitted(false);
    setResult(null);
    scrollToTop();

    setTimeout(() => {
      fullnameInputRef.current?.focus();
    }, 100);
  };

  const handleNext = () => {
    if (mode === "random" && onNext) {
      onNext();
    } else if (mode === "selected" && onBackToList) {
      onBackToList();
    }
  };

  const isFormValid =
    userAnswer.fullname.trim() && userAnswer.description.trim();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isFormValid && !submitted) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card ref={cardRef} className="w-full max-w-2xl shadow-xl">
      <CardHeader className="text-center space-y-2 sm:space-y-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg py-6 sm:py-8 px-4">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
          ERP 단어 연습장
        </CardTitle>
        <p className="text-sm sm:text-base text-blue-100">
          약어를 보고 영문 풀네임과 한글 설명을 입력하세요
        </p>
      </CardHeader>

      <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8">
        <div className="text-center space-y-3">
          {progress && (
            <div className="text-sm sm:text-base font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              진행: {progress}
            </div>
          )}
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            문제
          </p>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 sm:p-8 md:p-10 shadow-lg">
            <p className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider break-all">
              {item.abbr}
            </p>
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="fullname"
              className="text-base sm:text-lg font-semibold"
            >
              영문 풀네임
            </Label>
            <Input
              ref={fullnameInputRef}
              id="fullname"
              type="text"
              placeholder="예: Enterprise Resource Planning"
              value={userAnswer.fullname}
              onChange={(e) =>
                setUserAnswer({ ...userAnswer, fullname: e.target.value })
              }
              onKeyDown={handleKeyDown}
              disabled={submitted}
              className="text-base sm:text-lg p-4 sm:p-5 md:p-6 min-h-[48px]"
            />
            {submitted && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  {result?.fullnameCorrect ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  <span
                    className={`text-sm sm:text-base font-semibold ${
                      result?.fullnameCorrect
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result?.fullnameCorrect ? "정답입니다!" : "오답입니다"}
                  </span>
                </div>
                {!result?.fullnameCorrect && (
                  <p className="text-sm sm:text-base text-muted-foreground bg-blue-50 p-3 sm:p-4 rounded-lg break-words">
                    정답:{" "}
                    <span className="font-semibold text-blue-700">
                      {item.fullname}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="description"
              className="text-base sm:text-lg font-semibold"
            >
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
              onKeyDown={handleKeyDown}
              disabled={submitted}
              className="text-base sm:text-lg p-4 sm:p-5 md:p-6 min-h-[48px]"
            />
            {submitted && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2">
                  {result?.descriptionCorrect ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  )}
                  <span
                    className={`text-sm sm:text-base font-semibold ${
                      result?.descriptionCorrect
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result?.descriptionCorrect ? "정답입니다!" : "오답입니다"}
                  </span>
                </div>
                {!result?.descriptionCorrect && (
                  <p className="text-sm sm:text-base text-muted-foreground bg-blue-50 p-3 sm:p-4 rounded-lg break-words">
                    정답:{" "}
                    <span className="font-semibold text-blue-700">
                      {item.description}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          {!submitted ? (
            <Button
              ref={submitButtonRef}
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold"
              size="lg"
            >
              제출하기
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {mode === "random" && (
                <Button
                  ref={retryButtonRef}
                  onClick={handleRetry}
                  variant="outline"
                  className="w-full sm:flex-1 text-base sm:text-lg py-5 sm:py-6 min-h-[52px] border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold"
                  size="lg"
                >
                  재도전
                  <RotateCcw className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                ref={nextButtonRef}
                onClick={handleNext}
                className={`w-full ${
                  mode === "random" ? "sm:flex-1" : ""
                } text-base sm:text-lg py-5 sm:py-6 min-h-[52px] bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 font-semibold`}
                size="lg"
              >
                {mode === "random" ? (
                  <>
                    다음 문제
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    <List className="w-5 h-5 mr-2" />
                    목록으로 돌아가기
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
