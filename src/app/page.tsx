"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shuffle, List, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg py-12">
          <div className="flex justify-center">
            <BookOpen className="w-16 h-16" />
          </div>
          <CardTitle className="text-4xl font-bold">ERP 단어 연습장</CardTitle>
          <p className="text-blue-100 text-lg">
            ERP·물류·회계 용어를 학습하는 퀴즈 애플리케이션
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-muted-foreground">
              학습 모드를 선택하세요
            </h2>

            <div className="grid gap-4">
              <Link href="/quiz/random" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                        <Shuffle className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold">랜덤 퀴즈</h3>
                        <p className="text-muted-foreground">
                          랜덤으로 출제되는 용어를 학습합니다. 반복 학습에
                          효과적입니다.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/list" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                        <List className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl font-bold">전체 용어 보기</h3>
                        <p className="text-muted-foreground">
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

          <div className="pt-6 border-t">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-bold text-blue-600">91개</span>의 용어
                수록
              </p>
              <p className="text-xs text-muted-foreground">
                ERP, WMS, MES, SCM 등 실무 필수 용어 학습
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
