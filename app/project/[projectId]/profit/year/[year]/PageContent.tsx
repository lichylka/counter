"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import AIBlock from "@/components/AIBlock";

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
        <h1 className="text-3xl font-bold">Звіт про прибутки (P&amp;L)</h1>

        <Button variant="outline" asChild>
          <Link href={`/project/${projectId}`}>🔙 Назад до проєкту</Link>
        </Button>
      </div>
      <div className="text-sm text-gray-600">Період: {year}</div>

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

      <AIBlock />
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
                    href={`/project/${projectId}/profit/year/${year}/month/${el.period_label.split("/")[0]}/income`}
                  >
                    {el.income_total}✏️
                  </Link>
                </td>
                <td className="px-4 py-2 border">
                  <Link
                    href={`/project/${projectId}/profit/year/${year}/month/${el.period_label.split("/")[0]}/expenses`}
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
