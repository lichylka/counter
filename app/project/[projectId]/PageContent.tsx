"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";

export default function ProjectDashboard({
  params,
  periodYears,
  projectData,
}: {
  params: any;
  periodYears: typeof api.periodYear.getAllForProject._returnType;
  projectData: Doc<"projects">;
}) {
  const reportYears =
    useQuery(api.reportYear.getMultipleWithIncludes, {
      period_year_ids: periodYears.map((el) => el._id),
    }) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <header className="space-y-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Проект: {projectData.name}</h1>

          <Button variant="outline" asChild>
            <Link href="/dashboard">🔙 Назад до проєкту</Link>
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Початок: {projectData.start_date} | Термін: {projectData.period_plan}{" "}
          років | Початок продажів: {projectData.sales_start}
        </p>
        <p className="text-sm text-gray-500">
          📅 Створено: {projectData.created_at}
          <Badge variant="secondary" className="ml-2">
            {projectData.status}
          </Badge>
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline">📥 Завантажити PDF</Button>
          <Button variant="outline">📊 Повна аналітика</Button>
        </div>
      </header>

      <Card className="p-4">
        <TableWithTitle
          title="Інвестиції та позики"
          rows={reportYears.map((el) => [
            el.year,
            el.invest_income_total ?? 0,
            el.invest_expense_total ?? 0,
            el.invest_profit_total ?? 0,
          ])}
          summary
          columns={[
            "Період",
            "Інвестдоходи",
            "Інвествидатки",
            "Інвестпотік",
            "Розрахунок",
          ]}
          projectId={params.projectId}
          rowAction={(year) => (
            <Link
              href={`/project/${params.projectId}/investments/${year}/${"type"}`}
            >
              <Button variant="outline" size="sm">
                Редагувати
              </Button>
            </Link>
          )}
        />
      </Card>

      <Card className="p-4">
        <TableWithTitle
          title="Звіт (P&L)"
          columns={["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"]}
          rows={reportYears.map((el) => [
            el.year,
            el.income_total,
            el.expenses_total,
            el.profit_total,
          ])}
          summary
          projectId={params.projectId}
          rowAction={(year) => (
            <Link href={`/project/${params.projectId}/profit/year/${year}`}>
              <Button variant="outline" size="sm">
                Редагувати
              </Button>
            </Link>
          )}
        />
      </Card>

      <Card className="p-4">
        <TableWithTitle
          title="Грошопотік"
          columns={[
            "Період",
            "Вхідпотік",
            "Вихідпотік",
            "Чистий потік",
            "Розрахунок",
          ]}
          rows={reportYears.map((el) => [
            el.year,
            el.cashflow_inflow,
            el.cashflow_outflow,
            el.cashflow_total,
          ])}
          summary
          projectId={params.projectId}
          rowAction={() => <Button variant="outline">Розгорнути</Button>}
        />
      </Card>
    </div>
  );
}

function TableWithTitle({
  title,
  columns = ["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"],
  rows,
  summary = false,
  rowAction,
}: {
  title: string;
  columns: string[];
  rows: number[][];
  summary?: boolean;
  projectId: string;
  rowAction: (year: number) => JSX.Element;
}) {
  return (
    <div>
      <div className="overflow-x-auto"></div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <table className="min-w-full border-collapse border border-gray-300 text-xs">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              {row.map((el, ind) => (
                <td className="border border-gray-300 px-4 py-2" key={ind}>
                  {el}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                {rowAction(row[0])}
              </td>
            </tr>
          ))}
          {summary && (
            <tr className="bg-green-100  font-semibold">
              <td className="border border-gray-300 px-4 py-2">Разом</td>
              {Array.from({ length: rows[0]?.length - 1 }, (_, i) => i + 1).map(
                (ind) => (
                  <td className="border border-gray-300 px-4 py-2" key={ind}>
                    {rows.reduce((sum, row) => sum + (row.at(ind) || 0), 0)}
                  </td>
                )
              )}
              <td className="border border-gray-300 px-4 py-2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
