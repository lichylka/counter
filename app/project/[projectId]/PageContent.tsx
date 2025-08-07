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
  const reportYears = useQuery(api.reportYear.getMultipleWithIncludes, {
    period_year_ids: periodYears.map((el) => el._id),
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Хедер */}
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

      {/* Основні таблиці */}
      {/* <Card className="p-4">
        <TableSection
          title="Інвестиції та кредити"
          columns={[
            "Період",
            "Інвестдоходи",
            "Інвеститрати",
            "Залишок",
            "Розрахунок",
          ]}
          rows={yearsRows(
            "investments",
            projectYears,
            investments,
            params.projectId as string
          )}
        />
      </Card> */}

      <Card className="p-4">
        <InvestTable
          title="Інвестиції та позики"
          rows={reportYears}
          summary
          columns={[
            "Період",
            "Інвестдоходи",
            "Інвествидатки",
            "Інвестпотік",
            "Розрахунок",
          ]}
          projectId={params.projectId}
          rowAction={(row) => (
            <Link
              href={`/project/${params.projectId}/investments/${row.year}/${"type"}`}
            >
              <Button variant="outline" size="sm">
                Редагувати
              </Button>
            </Link>
          )}
        />
      </Card>

      <Card className="p-4">
        <SomeTable
          title="Звіт (P&L)"
          rows={reportYears}
          summary
          projectId={params.projectId}
          rowAction={(row) => (
            <Link href={`/project/${params.projectId}/profit/year/${row.year}`}>
              <Button variant="outline" size="sm">
                Редагувати
              </Button>
            </Link>
          )}
        />
      </Card>

      <Card className="p-4">
        <CashflowTable
          title="Грошопотік"
          rows={reportYears}
          summary
          columns={[
            "Період",
            "Вхідпотік",
            "Вихідпотік",
            "Чистий потік",
            "Розрахунок",
          ]}
          projectId={params.projectId}
          rowAction={() => <Button variant="outline">Розгорнути</Button>}
        />
      </Card>

      {/* <Card className="p-4">
        <TableSection
          title="Баланс"
          columns={[
            "Період",
            "Активи",
            "Зобов'язання",
            "Капітал",
            "Розрахунок",
          ]}
          rows={balanceRows(projectYears, tableData.balance)}
          summary
        />
      </Card> */}
    </div>
  );
}

function InvestTable({
  title,
  columns = ["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"],
  rows,
  summary = false,
  rowAction,
}: {
  title?: string;
  columns?: string[];
  rows?: typeof api.reportYear.getMultipleWithIncludes._returnType;
  summary?: boolean;
  projectId: string;
  rowAction: (
    row: (typeof api.reportYear.getMultipleWithIncludes._returnType)[0]
  ) => JSX.Element;
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
          {rows?.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{row.year}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.invest_income_total || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.invest_expense_total || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.invest_profit_total || 0}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rowAction(row)}
              </td>
            </tr>
          ))}
          {summary && (
            <tr className="bg-green-100  font-semibold">
              <td className="border border-gray-300 px-4 py-2">Разом</td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce(
                  (sum, row) => sum + (row.invest_income_total || 0),
                  0
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce((sum, row) => sum + (row.expenses_total || 0), 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce(
                  (sum, row) => sum + (row.invest_profit_total || 0),
                  0
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SomeTable({
  title,
  columns = ["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"],
  rows,
  summary = false,
  rowAction,
}: {
  title?: string;
  columns?: string[];
  rows?: typeof api.reportYear.getMultipleWithIncludes._returnType;
  summary?: boolean;
  projectId: string;
  rowAction: (
    row: (typeof api.reportYear.getMultipleWithIncludes._returnType)[0]
  ) => JSX.Element;
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
          {rows?.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{row.year}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.income_total}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.expenses_total}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.profit_total}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rowAction(row)}
              </td>
            </tr>
          ))}
          {summary && (
            <tr className="bg-green-100  font-semibold">
              <td className="border border-gray-300 px-4 py-2">Разом</td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce((sum, row) => sum + (row.income_total || 0), 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce((sum, row) => sum + (row.expenses_total || 0), 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce((sum, row) => sum + (row.profit_total || 0), 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
function CashflowTable({
  title,
  columns = ["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"],
  rows,
  summary = false,
  rowAction,
}: {
  title?: string;
  columns?: string[];
  rows?: typeof api.reportYear.getMultipleWithIncludes._returnType;
  summary?: boolean;
  projectId: string;
  rowAction: (
    row: (typeof api.reportYear.getMultipleWithIncludes._returnType)[0]
  ) => JSX.Element;
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
          {rows?.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{row.year}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.income_total + (row.invest_income_total || 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.expenses_total}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.profit_total + (row.invest_profit_total || 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rowAction(row)}
              </td>
            </tr>
          ))}
          {summary && (
            <tr className="bg-green-100  font-semibold">
              <td className="border border-gray-300 px-4 py-2">Разом</td>
              <td className="border border-gray-300 px-4 py-2">
                {(() => {
                  const incomeTotal =
                    rows?.reduce(
                      (sum, row) => sum + (row.income_total || 0),
                      0
                    ) || 0;
                  const investIncomeTotal =
                    rows?.reduce(
                      (sum, row) => sum + (row.invest_income_total || 0),
                      0
                    ) || 0;
                  return incomeTotal + investIncomeTotal;
                })()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {rows?.reduce((sum, row) => sum + (row.expenses_total || 0), 0)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(() => {
                  const profitTotal =
                    rows?.reduce(
                      (sum, row) => sum + (row.income_total || 0),
                      0
                    ) || 0;
                  const investProfitTotal =
                    rows?.reduce(
                      (sum, row) => sum + (row.invest_profit_total || 0),
                      0
                    ) || 0;
                  return profitTotal + investProfitTotal;
                })()}
              </td>
              <td className="border border-gray-300 px-4 py-2"></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}