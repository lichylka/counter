"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { projectYearRoute } from "@/helpers/routes";
import TableComponent, {
  Column,
  TableProps,
} from "@/components/TableComponent";

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

  const INVEST_COLUMNS: Column<Doc<"reports_years">>[] = [
    { header: "Період", key: "year" },
    { header: "Інвестдоходи", key: "invest_income_total" },
    { header: "Інвествидатки", key: "invest_expense_total" },
    { header: "Інвестпотік", key: "invest_profit_total" },
    {
      header: "Розрахунок",
      key: "_id",
      render: (row) => (
        <Link
          href={projectYearRoute({
            projectId: params.projectId,
            year: row.year.toString(),
            section: "investments",
          })}
        >
          <Button variant="outline" size="sm">
            Редагувати
          </Button>
        </Link>
      ),
    },
  ];

  const PROFIT_COLUMNS: Column<Doc<"reports_years">>[] = [
    { header: "Період", key: "year" },
    { header: "Доходи", key: "income_total" },
    { header: "Витрати", key: "expenses_total" },
    { header: "Прибуток", key: "profit_total" },
    {
      header: "Розрахунок",
      key: "_id",
      render: (row) => (
        <Link
          href={projectYearRoute({
            projectId: params.projectId,
            year: row.year.toString(),
            section: "profit",
          })}
        >
          <Button variant="outline" size="sm">
            Редагувати
          </Button>
        </Link>
      ),
    },
  ];

  const CASHFLOW_COLUMNS: Column<Doc<"reports_years">>[] = [
    { header: "Період", key: "year" },
    { header: "Вхідпотік", key: "cashflow_inflow" },
    { header: "Вихідпотік", key: "cashflow_outflow" },
    { header: "Чистий потік", key: "cashflow_total" },
    {
      header: "Розрахунок",
      key: "_id",
      render: () => <Button variant="outline">Розгорнути</Button>,
    },
  ];

  return (
    <div className="space-y-10">
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
        <TableWithTitle<Doc<"reports_years">>
          title="Інвестиції та позики"
          data={reportYears}
          summary
          columns={INVEST_COLUMNS}
        />
      </Card>

      <Card className="p-4">
        <TableWithTitle<Doc<"reports_years">>
          title="Звіт (P&L)"
          columns={PROFIT_COLUMNS}
          data={reportYears}
          summary
        />
      </Card>

      <Card className="p-4">
        <TableWithTitle<Doc<"reports_years">>
          title="Грошопотік"
          columns={CASHFLOW_COLUMNS}
          data={reportYears}
          summary
        />
      </Card>
    </div>
  );
}

type TableWithTitleProps<T> = { title: string } & TableProps<T>;

export function TableWithTitle<T extends Record<string, any>>({
  title,
  className,
  ...props
}: TableWithTitleProps<T>) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <TableComponent {...props} />
      </div>
    </div>
  );
}
