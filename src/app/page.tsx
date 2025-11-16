"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, List, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-3 sm:space-y-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg py-8 sm:py-10 md:py-12 px-4">
          <div className="flex justify-center">
            <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
            ERP 단어 연습장
          </CardTitle>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 px-2">
            ERP·물류·회계 용어를 학습하는 퀴즈 애플리케이션
          </p>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8">
          <div className="space-y-4 sm:space-y-5">
            <h2 className="text-lg sm:text-xl font-semibold text-center text-muted-foreground px-2">
              학습 모드를 선택하세요
            </h2>

            <div className="grid gap-3 sm:gap-4">
              <Link href="/quiz/random" className="block">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500 active:scale-[0.98]">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                        <Shuffle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold">
                          랜덤 퀴즈
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          랜덤으로 출제되는 용어를 학습합니다. 반복 학습에
                          효과적입니다.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/list" className="block">
                <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500 active:scale-[0.98]">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                        <List className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold">
                          전체 용어 보기
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          모든 용어를 확인하고 원하는 용어를 선택하여
                          학습합니다.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 border-t">
            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-sm sm:text-base text-muted-foreground">
                총 <span className="font-bold text-blue-600">91개</span>의 용어
                수록
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                ERP, WMS, MES, SCM 등 실무 필수 용어 학습
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
