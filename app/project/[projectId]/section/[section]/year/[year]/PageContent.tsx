"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import {
  projectMonthRoute,
  ProjectMonthType,
  projectRoute,
  ProjectSectionType,
} from "@/helpers/routes";
import TableComponent, { Column } from "@/components/TableComponent";

type Props = {
  params: { projectId: string; year: string; section: ProjectSectionType };
  reportYear: typeof api.reportYear.getOneWithIncludes._returnType;
};

function PageContent({
  params: { projectId, year, section },
  reportYear,
}: Props) {
  const [showFullTable, setShowFullTable] = useState(true);

  const toggleFullTable = () => {
    setShowFullTable((prev) => !prev);
  };

  const INVEST_COLUMNS: Column<Doc<"reports_years">>[] = [
    { header: "Період", key: "year" },
    { header: "Інвестдоходи", key: "invest_income_total" },
    { header: "Інвествидатки", key: "invest_expense_total" },
    { header: "Інвестпотік", key: "invest_profit_total" },
    {
      header: "Дії",
      key: "_id",
      render: () => (
        <Button variant="ghost" size="sm" onClick={toggleFullTable}>
          {showFullTable ? "🔽 Згорнути таблицю" : "🔼 Розгорнути таблицю"}
        </Button>
      ),
    },
  ];

  const PROFIT_COLUMNS: Column<Doc<"reports_years">>[] = [
    { header: "Період", key: "year" },
    { header: "Доходи", key: "income_total" },
    { header: "Витрати", key: "expenses_total" },
    { header: "Прибуток", key: "profit_total" },
    {
      header: "Дії",
      key: "_id",
      render: () => (
        <Button variant="ghost" size="sm" onClick={toggleFullTable}>
          {showFullTable ? "🔽 Згорнути таблицю" : "🔼 Розгорнути таблицю"}
        </Button>
      ),
    },
  ];

  const columns = section == "investments" ? INVEST_COLUMNS : PROFIT_COLUMNS;

  const formatData = (
    data: Doc<"reports_quarters"> | Doc<"reports_months">
  ) => {
    return (
      section == "investments"
        ? {
            id: data._id,
            label: data.period_label,
            income: data.invest_income_total ?? 0,
            expense: data.invest_expense_total ?? 0,
            profit: data.invest_profit_total ?? 0,
          }
        : {
            id: data._id,
            label: data.period_label,
            income: data.income_total,
            expense: data.expenses_total,
            profit: data.profit_total,
          }
    ) satisfies QuarterData;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {section == "investments"
            ? "Інвестиції та позики"
            : "Звіт про прибутки (P&L)"}
        </h1>

        <Button variant="outline" asChild>
          <Link href={projectRoute({ projectId })}>🔙 Назад до проєкту</Link>
        </Button>
      </div>
      <div className="text-sm text-gray-600">Період: {year}</div>

      <Card>
        <CardContent className="overflow-auto">
          <TableComponent
            columns={columns}
            data={[reportYear]}
            expandableComponent={
              <>
                {showFullTable &&
                  reportYear.quarters.map((quarter, i) => (
                    <Quarter
                      key={i}
                      projectId={projectId}
                      year={year}
                      quarter={formatData(quarter)}
                      section={section}
                      months={quarter.months.map((month) => formatData(month))}
                    />
                  ))}
              </>
            }
          />
        </CardContent>
      </Card>

      {/* <AIBlock /> */}
    </div>
  );
}

export default PageContent;

type QuarterData = {
  id: string;
  label: string;
  income: number;
  expense: number;
  profit: number;
};

function Quarter({
  projectId,
  year,
  quarter,
  months,
  section,
}: {
  projectId: string;
  year: string;
  quarter: QuarterData;
  months: QuarterData[];
  section: ProjectSectionType;
}) {
  const getRoute = (periodLabel: string, type: ProjectMonthType) => {
    const month = periodLabel.split("/")[0];
    return projectMonthRoute({ month, year, section, projectId, type });
  };
  const [showQuarter, setShowQuarter] = useState(false);

  return (
    <>
      <tr className="bg-gray-50 font-semibold">
        <td className="px-4 py-2 border">{quarter.label}</td>
        <td className="px-4 py-2 border">{quarter.income}</td>
        <td className="px-4 py-2 border">{quarter.expense}</td>
        <td className="px-4 py-2 border">{quarter.profit}</td>
        <td className="px-4 py-2 border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQuarter((prev) => !prev)}
          >
            {showQuarter ? "🔼 Згорнути" : "🔽 Розгорнути"}
          </Button>
        </td>
      </tr>
      {showQuarter && (
        <>
          {months.map((el) => {
            return (
              <tr key={el.id}>
                <td className="px-4 py-2 border">
                  {periodLabelToString(el.label)}
                </td>
                <td className="px-4 py-2 border">
                  <Link href={getRoute(el.label, "income")}>{el.income}✏️</Link>
                </td>
                <td className="px-4 py-2 border">
                  <Link href={getRoute(el.label, "expenses")}>
                    {el.expense}✏️
                  </Link>
                </td>
                <td className="px-4 py-2 border">{el.profit}</td>
                <td className="px-4 py-2 border"></td>
              </tr>
            );
          })}
        </>
      )}
    </>
  );
}
