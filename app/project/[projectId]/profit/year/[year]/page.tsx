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
      <Link href={`/project/${projectId}`}>
        <Button>Назад</Button>
      </Link>
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
              {showFullTable &&
                ["Q1", "Q2", "Q3", "Q4"].map((quarter, i) => (
                  <Quarter
                    key={i}
                    expandedQuarters={expandedQuarters}
                    projectId={projectId}
                    toggleQuarter={toggleQuarter}
                    year={year}
                    quarter={quarter as "Q1" | "Q2" | "Q3" | "Q4"}
                  />
                ))}
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

function Quarter({
  toggleQuarter,
  expandedQuarters,
  projectId,
  year,
  quarter,
}: {
  toggleQuarter: (q: string) => void;
  expandedQuarters: { [key: string]: boolean };
  projectId: string;
  year: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
}) {
  const quarterData = {
    Q1: {
      name: "1 квартал",
      value: [
        { name: "Січень", id: 1 },
        { name: "Лютий", id: 2 },
        { name: "Березень", id: 3 },
      ],
    },
    Q2: {
      name: "2 квартал",
      value: [
        { name: "Квітень", id: 4 },
        { name: "Травень", id: 5 },
        { name: "Червент", id: 6 },
      ],
    },
    Q3: {
      name: "3 квартал",
      value: [
        { name: "Липень", id: 7 },
        { name: "Серпень", id: 8 },
        { name: "Вересень", id: 9 },
      ],
    },
    Q4: {
      name: "4 квартал",
      value: [
        { name: "Жовтень", id: 10 },
        { name: "Листопад", id: 11 },
        { name: "Грудень", id: 12 },
      ],
    },
  };

  return (
    <>
      <tr className="bg-gray-50 font-semibold">
        <td className="px-4 py-2 border">{quarterData[quarter].name}</td>
        <td className="px-4 py-2 border">28,000</td>
        <td className="px-4 py-2 border">20,000</td>
        <td className="px-4 py-2 border">8,000</td>
        <td className="px-4 py-2 border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleQuarter(quarter)}
          >
            {expandedQuarters[quarter] ? "🔼 Згорнути" : "🔽 Розгорнути"}
          </Button>
        </td>
      </tr>
      {expandedQuarters[quarter] && (
        <>
          {quarterData[quarter].value.map((el) => (
            <tr key={el.id}>
              <td className="px-4 py-2 border">{el.name}</td>
              <td className="px-4 py-2 border">
                <Link
                  href={`/project/${projectId}/profit/year/${year}/month/${el.id}/income`}
                >
                  10,000✏️
                </Link>
              </td>
              <td className="px-4 py-2 border">
                <Link
                  href={`/project/${projectId}/profit/year/${year}/month/${el.id}/expenses`}
                >
                  7,000✏️
                </Link>
              </td>
              <td className="px-4 py-2 border">3,000</td>
              <td className="px-4 py-2 border"></td>
            </tr>
          ))}
        </>
      )}
    </>
  );
}
