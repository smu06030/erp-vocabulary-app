"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import { VocabularyItem } from "@/types/vocabulary";
import vocabularyData from "../../../erp.json";

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = (vocabularyData as VocabularyItem[]).filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.abbr.toLowerCase().includes(query) ||
      item.fullname.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4 py-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              홈으로
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            총 {filteredData.length}개의 용어
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              전체 용어 목록
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="약어, 영문, 한글로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>

            <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2">
              {filteredData.map((item) => (
                <Link key={item.id} href={`/quiz/${item.id}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-green-500 hover:scale-[1.01]">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">
                            {item.abbr}
                          </span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-bold text-lg">{item.fullname}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {filteredData.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">검색 결과가 없습니다.</p>
                  <p className="text-sm">다른 키워드로 검색해보세요.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
