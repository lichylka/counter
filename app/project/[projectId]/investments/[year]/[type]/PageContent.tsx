"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { periodLabelToString } from "@/helpers/periodLabelToString";

type Props = {
  params: { projectId: string; year: string };
  reportYear: typeof api.reportYear.getOneWithIncludes._returnType;
};

function PageContent({ params: { projectId, year }, reportYear }: Props) {
  const [expandedQuarters, setExpandedQuarters] = useState<{
    [key: string]: boolean;
  }>({});
  const [showFullTable, setShowFullTable] = useState(true);

  const toggleQuarter = (_id: string) => {
    setExpandedQuarters((prev) => ({ ...prev, [_id]: !prev[_id] }));
  };

  const toggleFullTable = () => {
    setShowFullTable((prev) => !prev);
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Інвестиції та позики</h1>

        <Button variant="outline" asChild>
          <Link href={`/project/${projectId}`}>🔙 Назад до проєкту</Link>
        </Button>
      </div>
      <div className="text-sm text-gray-600">Період: {year}</div>

      {/* Таблиця P&L */}
      <Card>
        <CardContent className="overflow-auto">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Період",
                  "Інвестдоходи",
                  "Інвествидатки",
                  "Інвестпотік",
                  "Дії",
                ].map((el) => (
                  <th key={el} className="px-4 py-2 border">
                    {el}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showFullTable &&
                reportYear.quarters.map((quarter, i) => (
                  <Quarter
                    key={i}
                    expandedQuarters={expandedQuarters}
                    projectId={projectId}
                    toggleQuarter={toggleQuarter}
                    year={year}
                    quarter={quarter}
                    months={quarter.months as Doc<"reports_months">[]}
                  />
                ))}
              <tr className="bg-green-100 font-bold">
                <td className="px-4 py-2 border">РІК ({year})</td>
                <td className="px-4 py-2 border">{reportYear.income_total}</td>
                <td className="px-4 py-2 border">
                  {reportYear.expenses_total}
                </td>
                <td className="px-4 py-2 border">{reportYear.profit_total}</td>
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

export default PageContent;

function Quarter({
  toggleQuarter,
  expandedQuarters,
  projectId,
  year,
  quarter,
  months,
}: {
  toggleQuarter: (q: string) => void;
  expandedQuarters: { [key: string]: boolean };
  projectId: string;
  year: string;
  quarter: Doc<"reports_quarters">;
  months: Doc<"reports_months">[];
}) {
  return (
    <>
      <tr className="bg-gray-50 font-semibold">
        <td className="px-4 py-2 border">{quarter.period_label}</td>
        <td className="px-4 py-2 border">{quarter.income_total}</td>
        <td className="px-4 py-2 border">{quarter.expenses_total}</td>
        <td className="px-4 py-2 border">{quarter.profit_total}</td>
        <td className="px-4 py-2 border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleQuarter(quarter._id)}
          >
            {expandedQuarters[quarter._id] ? "🔼 Згорнути" : "🔽 Розгорнути"}
          </Button>
        </td>
      </tr>
      {expandedQuarters[quarter._id] && (
        <>
          {months.map((el) => {
            return (
              <tr key={el._id}>
                <td className="px-4 py-2 border">
                  {periodLabelToString(el.period_label)}
                </td>
                <td className="px-4 py-2 border">
                  <Link
                    href={`/project/${projectId}/investments/${year}/type/month/${el.period_label.split("/")[0]}/income`}
                  >
                    {el.income_total}✏️
                  </Link>
                </td>
                <td className="px-4 py-2 border">
                  <Link
                    href={`/project/${projectId}/investments/${year}/type/month/${el.period_label.split("/")[0]}/expenses`}
                  >
                    {el.expenses_total}✏️
                  </Link>
                </td>
                <td className="px-4 py-2 border">{el.profit_total}</td>
                <td className="px-4 py-2 border"></td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}
