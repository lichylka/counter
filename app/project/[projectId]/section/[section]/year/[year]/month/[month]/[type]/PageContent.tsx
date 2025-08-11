"use client";

import AddIncomeModal from "@/components/AddIncomeModal";
import AddInvestExpenses from "@/components/AddInvestExpenses";
import AddInvestIncomeModal from "@/components/AddInvestIncomeModal";
import AIBlock from "@/components/AIBlock";
import EditValueModalSecondStep from "@/components/EditValueModalSecondStep";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { monthLabels } from "@/helpers/monthsLabels";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import {
  ProjectMonthType,
  ProjectSectionType,
  projectYearRoute,
} from "@/helpers/routes";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  params: {
    projectId: string;
    year: string;
    month: string;
    section: ProjectSectionType;
    type: ProjectMonthType;
  };
  preloadedReportMonth: Preloaded<typeof api.reportMonth.getOne>;
};

const HEADER_FIELDS: Record<
  ProjectSectionType,
  Record<
    ProjectMonthType,
    {
      heading: string;
      field: keyof Doc<"reports_months">;
      content: (props: ChildrenProps) => React.ReactNode;
    }
  >
> = {
  investments: {
    expenses: {
      heading: "Інвествидатки",
      field: "invest_expense_total",
      content: InvestmentExpenses,
    },
    income: {
      heading: "Інвестдоходи",
      field: "invest_income_total",
      content: InvestmentsIncome,
    },
  },
  profit: {
    expenses: {
      heading: "Витрати",
      field: "expenses_total",
      content: ProfitExpenses,
    },
    income: { heading: "Доходи", field: "income_total", content: ProfitIncome },
  },
};

function PageContent({ params, preloadedReportMonth }: Props) {
  const reportMonth = usePreloadedQuery(preloadedReportMonth);

  if (!reportMonth) return null;

  const fields = HEADER_FIELDS[params.section][params.type];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {fields.heading} за період:{" "}
          {monthLabels[Number(params.month) - 1] || params.month} {params.year}
        </h1>
        <Button variant="outline" asChild>
          <Link
            href={projectYearRoute({
              projectId: params.projectId,
              section: params.section,
              year: params.year,
            })}
          >
            🔙 Назад до проєкту
          </Link>
        </Button>
      </div>

      <section>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Період</th>
              <th className="border px-4 py-2">Сума доходу</th>
              <th className="border px-4 py-2">Дії</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                {periodLabelToString(reportMonth.period_label)}
              </td>
              <td className="border px-4 py-2">
                {Number(reportMonth[fields.field] ?? 0)}{' '}
                грн
              </td>
              <td className="border px-4 py-2">
                <Button variant="link" className="text-purple-600">
                  редагувати
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      {fields.content({
        params,
        reportMonth,
      })}
      {/* <AIBlock /> */}
    </div>
  );
}

export default PageContent;

type ChildrenProps = {
  params: {
    projectId: string;
    year: string;
    month: string;
    section: ProjectSectionType;
    type: ProjectMonthType;
  };
  reportMonth: Doc<"reports_months">;
};

function ProfitIncome({ params, reportMonth }: ChildrenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const incomes =
    useQuery(api.income.getIncomeForProjectWithPeriod, {
      projectId: params.projectId,
      period: params.month,
    })?.reverse() ?? [];

  const addIncome = useMutation(api.income.addIncome);

  const handleAddIncome = () => {
    setIsOpen(true);
  };

  const handleSaveNewRow = async (
    incomeData: Omit<typeof api.income.addIncome._args, "period" | "projectId">
  ) => {
    await addIncome({
      ...incomeData,
      period: params.month,
      projectId: params.projectId,
    });
    setIsOpen(false);
  };

  return (
    <div className="p-6 space-y-6 mx-auto">
      <main className=" mx-auto py-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Деталізація доходів</h2>
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Назва</th>
                <th className="border px-2 py-1">Од. виміру</th>
                <th className="border px-2 py-1">Кількість</th>
                <th className="border px-2 py-1">Ціна</th>
                <th className="border px-2 py-1">Сума</th>
                <th className="border px-2 py-1">Тип</th>
                <th className="border px-2 py-1">Дії</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((item) => (
                <tr key={item._id}>
                  <td className="border px-2 py-1">{item.product?.name}</td>
                  <td className="border px-2 py-1">{item.product?.unit}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.price}</td>
                  <td className="border px-2 py-1">
                    {item.quantity * item.price}
                  </td>
                  <td className="border px-2 py-1">{item.product?.type}</td>
                  <td className="border px-2 py-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Button
          onClick={handleAddIncome}
          className="bg-green-600 hover:bg-green-700"
        >
          ➕ Додати дохід вручну
        </Button>
      </main>
      <AddIncomeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSaveNewRow={handleSaveNewRow}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
      />
    </div>
  );
}

function ProfitExpenses({ params, reportMonth }: ChildrenProps) {
  const expenses =
    useQuery(api.expenses.getExpensesForProjectWithPeriod, {
      projectId: params.projectId,
      period: params.month,
    })?.reverse() ?? [];
  const addExpense = useMutation(api.expenses.addExpense);

  const [isOpen, setIsOpen] = useState(false);

  const handleAddExpense = () => {
    setIsOpen(true);
  };

  const handleSaveNewRow = async (
    expenseData: Omit<
      typeof api.expenses.addExpense._args,
      "period" | "projectId"
    >
  ) => {
    await addExpense({
      ...expenseData,
      period: params.month,
      projectId: params.projectId,
    });
    setIsOpen(false);
  };

  return (
    <main className=" mx-auto py-10 space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Деталізація витрат</h2>

        {["Постійні", "Змінні: Прямі", "Змінні: Накладні"].map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{type}</h3>
            <table className="w-full border table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Назва</th>
                  <th className="border px-2 py-1">Од. виміру</th>
                  <th className="border px-2 py-1">Кількість</th>
                  <th className="border px-2 py-1">Ціна</th>
                  <th className="border px-2 py-1">Сума</th>
                  <th className="border px-2 py-1">Категорія</th>
                  <th className="border px-2 py-1">Дії</th>
                </tr>
              </thead>
              <tbody>
                {expenses
                  .filter((e) => e.expense_item?.type === type)
                  .map((item) => (
                    <tr key={item._id}>
                      <td className="border px-2 py-1">
                        {item.expense_item?.name}
                      </td>
                      <td className="border px-2 py-1">
                        {item.expense_item?.unit}
                      </td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">{item.price}</td>
                      <td className="border px-2 py-1">{item.total_expense}</td>
                      <td className="border px-2 py-1">
                        {item.expense_item?.category}
                      </td>
                      <td className="border px-2 py-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <button
        onClick={handleAddExpense}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ➕ Додати витрату вручну
      </button>

      <EditValueModalSecondStep
        isOpen={isOpen}
        handleSaveNewRow={handleSaveNewRow}
        setIsOpen={setIsOpen}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
        period_month_id={reportMonth.period_month_id}
      />
    </main>
  );
}

type RowOmit = Omit<
  typeof api.investExpenses.addExpense._args.args,
  "period" | "projectId"
>;

export type CreateIvestExpense =
  | (RowOmit & { asset_id: string })
  | (RowOmit & { assetName: string; assetType: string });

function InvestmentExpenses({ params, reportMonth }: ChildrenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const investExpenses =
    useQuery(api.investExpenses.getExpensesForProjectWithPeriod, {
      projectId: params.projectId,
      period_month_id: reportMonth?.period_month_id,
    })?.reverse() ?? [];

  const addExpense = useMutation(api.investExpenses.addExpense);

  const assets =
    useQuery(api.asset.getForProject, {
      projectId: params.projectId,
    }) || [];

  const assetsPerMonths =
    useQuery(api.assetsPerMonth.getPerMonthAndProject, {
      periods_months_id: reportMonth?.period_month_id,
      project_id: params.projectId,
    }) || [];

  const handleAddExpense = () => {
    setIsOpen(true);
  };

  const handleSaveNewRow = async (expenseData: CreateIvestExpense) => {
    await addExpense({
      args: {
        ...expenseData,
        period: params.month,
        projectId: params.projectId,
        type: expenseData.type as any,
      },
    });
    setIsOpen(false);
  };

  return (
    <main className=" mx-auto py-10 space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">Деталізація витрат</h2>

        {["Постійні", "Змінні: Прямі", "Змінні: Накладні"].map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{type}</h3>
            <table className="w-full border table-auto text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Назва</th>
                  <th className="border px-2 py-1">Од. виміру</th>
                  <th className="border px-2 py-1">Кількість</th>
                  <th className="border px-2 py-1">Ціна</th>
                  <th className="border px-2 py-1">Сума</th>
                  <th className="border px-2 py-1">Категорія</th>
                  <th className="border px-2 py-1">Дії</th>
                </tr>
              </thead>
              <tbody>
                {investExpenses
                  .filter((e) => e.expense_item?.type === type)
                  .map((item) => (
                    <tr key={item._id}>
                      <td className="border px-2 py-1">
                        {item.expense_item?.name}
                      </td>
                      <td className="border px-2 py-1">
                        {item.expense_item?.unit}
                      </td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">{item.price}</td>
                      <td className="border px-2 py-1">{item.total_expense}</td>
                      <td className="border px-2 py-1">
                        {item.expense_item?.category}
                      </td>
                      <td className="border px-2 py-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      <button
        onClick={handleAddExpense}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ➕ Додати витрату вручну
      </button>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Деталізація активів</h3>
        <table className="w-full border table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Назва</th>
              <th className="border px-2 py-1">Сума на початку</th>
              <th className="border px-2 py-1">Сума інвестицій</th>
              <th className="border px-2 py-1">Сума на кінець</th>
              <th className="border px-2 py-1">Вид активу</th>
              <th className="border px-2 py-1">Дії</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map((el) => {
              const assetMonth = assetsPerMonths.find(
                (month) => month.asset_id == el._id
              );
              if (!assetMonth) {
                console.error("no month for this asset");
                return <tr key={el._id}></tr>;
              }
              return (
                <tr key={el._id}>
                  <td className="border px-2 py-1">{el.name}</td>
                  <td className="border px-2 py-1">
                    {assetMonth.opening_balance}
                  </td>
                  <td className="border px-2 py-1">
                    {assetMonth.monthly_depreciation}
                  </td>
                  <td className="border px-2 py-1">
                    {assetMonth.closing_balance}
                  </td>
                  <td className="border px-2 py-1">{el.assetType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddInvestExpenses
        isOpen={isOpen}
        handleSaveNewRow={handleSaveNewRow}
        setIsOpen={setIsOpen}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
        period_month_id={reportMonth.period_month_id}
        assets={assets}
      />
    </main>
  );
}

function InvestmentsIncome({ params, reportMonth }: ChildrenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const incomes =
    useQuery(api.investIncomes.getIncomeForProjectWithPeriod, {
      projectId: params.projectId,
      period: params.month,
    })?.reverse() ?? [];

  const addIncome = useMutation(api.investIncomes.addIncome);

  const handleAddIncome = () => {
    setIsOpen(true);
  };

  const handleSaveNewRow = async (
    incomeData: Omit<
      typeof api.investIncomes.addIncome._args,
      "period" | "projectId"
    >
  ) => {
    await addIncome({
      ...incomeData,
      period: params.month,
      projectId: params.projectId,
    });
    setIsOpen(false);
  };

  return (
    <div className=" space-y-6 mx-auto">
      <main className="mx-auto py-10 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Деталізація доходів</h2>
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Назва</th>
                <th className="border px-2 py-1">Од. виміру</th>
                <th className="border px-2 py-1">Кількість</th>
                <th className="border px-2 py-1">Ціна</th>
                <th className="border px-2 py-1">Сума</th>
                <th className="border px-2 py-1">Дії</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((item) => (
                <tr key={item._id}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.unit}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.price}</td>
                  <td className="border px-2 py-1">
                    {item.quantity * item.price}
                  </td>
                  <td className="border px-2 py-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Button
          onClick={handleAddIncome}
          className="bg-green-600 hover:bg-green-700"
        >
          ➕ Додати дохід вручну
        </Button>
      </main>
      <AddInvestIncomeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSaveNewRow={handleSaveNewRow}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
      />
    </div>
  );
}
