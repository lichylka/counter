"use client";
import EditValueModalSecondStep from "@/components/EditValueModalSecondStep";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
import { monthLabels } from "@/helpers/monthsLabels";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import { Edit, Trash2 } from "lucide-react";

type Props = {
  params: { projectId: string; year: string; month: string };
  periodMonth: Doc<"periods_months">;
  reportMonth: Doc<"reports_months">;
};

function PageContent({ params, reportMonth }: Props) {
  const expenses =
    useQuery(api.expenses.getExpensesForProjectWithPeriod, {
      projectId: params.projectId,
      period: params.month,
    })?.reverse() ?? [];
  const addExpense = useMutation(api.expenses.addExpense);

  const [aiPrompt, setAiPrompt] = useState("");
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
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Витрати за період:{" "}
          {monthLabels[Number(params.month) - 1] || params.month} {params.year}
        </h1>
        <Button variant="outline" asChild>
          <Link
            href={`/project/${params.projectId}/profit/year/${params.year}`}
          >
            🔙 Назад до проєкту
          </Link>
        </Button>
      </div>

      {/* 📅 Витрати за період */}
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
                {reportMonth.expenses_total} грн
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

      {/* 🧾 Таблиця витрат */}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => onEdit(project)}
                        >
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

      {/* ➕ Додати витрату */}
      <button
        onClick={handleAddExpense}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        ➕ Додати витрату вручну
      </button>

      {/* 🤖 AI-помічник */}
      <section>
        <h2 className="text-xl font-semibold mb-2 mt-6">AI-помічник</h2>
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Опиши витрати..."
          className="w-full border p-2 rounded mb-2"
          rows={3}
        />
        <button
          // onClick={handleAIQuery}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🤖 Запитати у AI
        </button>
      </section>
      <EditValueModalSecondStep
        isOpen={isOpen}
        handleSaveNewRow={handleSaveNewRow}
        setIsOpen={setIsOpen}
        reports_months_id={reportMonth._id}
        reports_quarters_id={reportMonth.report_quarters_id}
        reports_years_id={reportMonth.report_years_id}
      />
    </main>
  );
}

export default PageContent;
