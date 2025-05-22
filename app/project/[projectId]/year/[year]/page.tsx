"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ProfitReportPage({
  params,
}: {
  params: Promise<{ projectId: string; year: string }>;
}) {
  const { projectId, year } = use(params);
  const [expandedQuarters, setExpandedQuarters] = useState<{
    [key: string]: boolean;
  }>({});
  const [showFullTable, setShowFullTable] = useState(true);

  if (!projectId) {
    throw new Error("ID проекту не вказано");
  }

  const toggleQuarter = (q: string) => {
    setExpandedQuarters((prev) => ({ ...prev, [q]: !prev[q] }));
  };

  const toggleFullTable = () => {
    setShowFullTable((prev) => !prev);
  };

  return (
    <div className="p-6 space-y-8">
      <Button>Назад</Button>
      <h1 className="text-3xl font-bold">Звіт про прибутки (P&amp;L)</h1>
      <div className="text-sm text-gray-600">
        Проєкт: Фундук у пакуванні | Період: {year}
      </div>

      {/* Таблиця P&L */}
      <Card>
        <CardContent className="overflow-auto">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Період</th>
                <th className="px-4 py-2 border">Доходи</th>
                <th className="px-4 py-2 border">Витрати</th>
                <th className="px-4 py-2 border">Прибуток</th>
                <th className="px-4 py-2 border">Дії</th>
              </tr>
            </thead>
            <tbody>
              {showFullTable && (
                <>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-2 border">1 квартал</td>
                    <td className="px-4 py-2 border">28,000</td>
                    <td className="px-4 py-2 border">20,000</td>
                    <td className="px-4 py-2 border">8,000</td>
                    <td className="px-4 py-2 border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleQuarter("Q1")}
                      >
                        {expandedQuarters["Q1"]
                          ? "🔼 Згорнути"
                          : "🔽 Розгорнути"}
                      </Button>
                    </td>
                  </tr>
                  {expandedQuarters["Q1"] && (
                    <>
                      <tr>
                        <td className="px-4 py-2 border">Січень</td>
                        <td className="px-4 py-2 border">10,000✏️</td>
                        <td className="px-4 py-2 border">7,000✏️</td>
                        <td className="px-4 py-2 border">3,000</td>
                        <td className="px-4 py-2 border"></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Лютий</td>
                        <td className="px-4 py-2 border">
                          <Link href={`/project/${projectId}/income/${2}`}>
                            9,000✏️
                          </Link>
                        </td>
                        <td className="px-4 py-2 border">
                          <Link href={`/project/${projectId}/expenses/${2}`}>
                            6,500✏️
                          </Link>
                        </td>
                        <td className="px-4 py-2 border">2,500</td>
                        <td className="px-4 py-2 border"></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Березень</td>
                        <td className="px-4 py-2 border">9,000✏️</td>
                        <td className="px-4 py-2 border">6,500✏️</td>
                        <td className="px-4 py-2 border">2,500</td>
                        <td className="px-4 py-2 border"></td>
                      </tr>
                    </>
                  )}
                </>
              )}
              <tr className="bg-green-100 font-bold">
                <td className="px-4 py-2 border">РІК ({year})</td>
                <td className="px-4 py-2 border">133,000</td>
                <td className="px-4 py-2 border">94,000</td>
                <td className="px-4 py-2 border">39,000</td>
                <td className="px-4 py-2 border">
                  <Button variant="ghost" size="sm" onClick={toggleFullTable}>
                    {showFullTable
                      ? "🔽 Згорнути таблицю"
                      : "🔼 Розгорнути таблицю"}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Блок AI */}
      <Card>
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">
            🤖 AI-помічник з прибутковості
          </h2>
          <input
            type="text"
            placeholder="Як підвищити рентабельність продукції?"
            className="w-full border rounded-md px-4 py-2"
          />
          <Button>Запитати у AI</Button>
          <div className="text-sm text-gray-600">
            AI: Щоб підвищити рентабельність, варто або оптимізувати виробничі
            витрати, або переглянути ціноутворення.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
