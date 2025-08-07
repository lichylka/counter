"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import React, { useState } from "react";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { monthLabels } from "@/helpers/monthsLabels";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import { Edit, Trash2 } from "lucide-react";
import { FunctionReference } from "convex/server";
import AddInvestExpenses from "@/components/AddInvestExpenses";

type RowOmit = Omit<
  typeof api.investExpenses.addExpense._args.args,
  "period" | "projectId"
>;

export type CreateIvestExpense =
  | (RowOmit & { asset_id: string })
  | (RowOmit & { assetName: string; assetType: string });

type Props = {
  params: { projectId: string; year: string; month: string };
  periodMonth: Doc<"periods_months">;
  preloadedReportMonth: Preloaded<
    FunctionReference<
      "query",
      "public",
      {
        period_months_id: string;
      },
      Doc<"reports_months"> | null,
      string | undefined
    >
  >;
};

function PageContent({ params, preloadedReportMonth, periodMonth }: Props) {
  const investExpenses =
    useQuery(api.investExpenses.getExpensesForProjectWithPeriod, {
      projectId: params.projectId,
      period_month_id: periodMonth._id,
    })?.reverse() ?? [];

  const addExpense = useMutation(api.investExpenses.addExpense);

  const assets =
    useQuery(api.asset.getForProject, {
      projectId: params.projectId,
    }) || [];

  const assetsPerMonths =
    useQuery(api.assetsPerMonth.getPerMonthAndProject, {
      periods_months_id: periodMonth._id,
      project_id: params.projectId,
    }) || [];

  const [aiPrompt, setAiPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

  const reportMonth = usePreloadedQuery(preloadedReportMonth);

  if (!reportMonth) return null;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Інвествидатки за період:{" "}
          {monthLabels[Number(params.month) - 1] || params.month} {params.year}
        </h1>
        <Button variant="outline" asChild>
          <Link
            href={`/project/${params.projectId}/investments/${params.year}/type`}
          >
            🔙 Назад до проєкту
          </Link>
        </Button>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2"></h2>
        <table className="w-full border table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Період</th>
              <th className="border px-4 py-2">Сума</th>
              <th className="border px-4 py-2">Дії</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                {periodLabelToString(reportMonth.period_label)}
              </td>
              <td className="border px-4 py-2">
                {reportMonth.invest_expense_total ?? 0} грн
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
        <h3 className="text-md font-semibold mb-2">
          Інвестиції за період:{" "}
          {monthLabels[Number(params.month) - 1] || params.month} {params.year}
        </h3>
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

      <section>
        <h2 className="text-xl font-semibold mb-2 mt-6">AI-помічник</h2>
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Опиши витрати..."
          className="w-full border p-2 rounded mb-2"
          rows={3}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          🤖 Запитати у AI
        </button>
      </section>
      <AddInvestExpenses
        isOpen={isOpen}
        handleSaveNewRow={handleSaveNewRow}
        setIsOpen={setIsOpen}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
        period_month_id={periodMonth._id}
        assets={assets}
      />
    </main>
  );
}

export default PageContent;
