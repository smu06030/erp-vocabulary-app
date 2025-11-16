"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Home, BookOpen, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VocabularyItem } from "@/types/vocabulary";
import vocabularyData from "../../../erp.json";

export default function ListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = (vocabularyData as VocabularyItem[]).filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.abbr.toLowerCase().includes(query) ||
      item.fullname.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const handleSequentialQuiz = () => {
    const ids = filteredData.map((item) => item.id);
    sessionStorage.setItem("sequentialQuizIds", JSON.stringify(ids));
    router.push("/quiz/sequential");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4 py-4 sm:py-6 md:py-8">
        <div className="flex justify-between items-center gap-3">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 min-h-[40px] px-3 sm:px-4"
            >
              <Home className="w-4 h-4" />
              <span className="hidden xs:inline">홈으로</span>
            </Button>
          </Link>
          <div className="text-xs sm:text-sm text-muted-foreground font-medium">
            총 {filteredData.length}개
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg py-5 sm:py-6 px-4">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
              전체 용어 목록
            </CardTitle>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  type="text"
                  placeholder="약어, 영문, 한글로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:pl-10 text-base sm:text-lg py-4 sm:py-5 md:py-6 min-h-[48px]"
                />
              </div>

              {filteredData.length > 0 && (
                <Button
                  onClick={handleSequentialQuiz}
                  className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[52px] bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 font-semibold"
                  size="lg"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  순서대로 퀴즈 풀기 ({filteredData.length}개)
                </Button>
              )}
            </div>

            <div className="grid gap-2 sm:gap-3 max-h-[calc(100vh-380px)] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
              {filteredData.map((item) => (
                <Link key={item.id} href={`/quiz/${item.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-green-500 active:scale-[0.98]">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xl sm:text-2xl break-all text-center px-1">
                            {item.abbr}
                          </span>
                        </div>
                        <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg break-words leading-tight">
                            {item.fullname}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 hidden sm:block">
                          <BookOpen className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {filteredData.length === 0 && (
                <div className="text-center py-12 sm:py-16 text-muted-foreground px-4">
                  <p className="text-base sm:text-lg font-medium">
                    검색 결과가 없습니다.
                  </p>
                  <p className="text-sm sm:text-base mt-2">
                    다른 키워드로 검색해보세요.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
