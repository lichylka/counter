"use client";
import EditValueModalSecondStep from "@/components/EditValueModalSecondStep";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";
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
  const project = useQuery(api.projects.getById, {
    id: params.projectId as any,
  });

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
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          💸 Витрати проєкту: {project?.name}
        </h1>
        <Button variant="outline" asChild>
          <Link
            href={`/project/${params.projectId}/profit/year/${params.year}`}
          >
            🔙 Назад до проєкту
          </Link>
        </Button>
      </header>

      {/* 📅 Витрати за період */}
      <section>
        <h2 className="text-xl font-semibold mb-2">
          Витрати за період:{" "}
          {[
            "Січень",
            "Лютий",
            "Березень",
            "Квітень",
            "Травень",
            "Червень",
            "Липень",
            "Серпень",
            "Вересень",
            "Жовтень",
            "Листопад",
            "Грудень",
          ][Number(params.month) - 1] || params.month}{" "}
          {params.year}
        </h2>
        <table className="w-full border table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Період</th>
              <th className="border px-4 py-2">Сума</th>
              <th className="border px-4 py-2">Дії</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(new Set(expenses.map((e) => e.period))).map(
              (period) => {
                const total = expenses
                  .filter((e) => e.period === period)
                  .reduce((sum, e) => sum + e.price * e.quantity, 0);
                return (
                  <tr key={period}>
                    <td className="border px-4 py-2">
                      {[
                        "Січень",
                        "Лютий",
                        "Березень",
                        "Квітень",
                        "Травень",
                        "Червень",
                        "Липень",
                        "Серпень",
                        "Вересень",
                        "Жовтень",
                        "Листопад",
                        "Грудень",
                      ][Number(period) - 1] || period}{" "}
                      {params.year}
                    </td>
                    <td className="border px-4 py-2">{total.toFixed(2)} грн</td>
                    <td className="border px-4 py-2">
                      <button className="text-blue-600 hover:underline">
                        ✏️ Редагувати
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
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
                      <td className="border px-2 py-1">
                        {reportMonth.expenses_total}
                      </td>
                      <td className="border px-2 py-1">
                        {item.expense_item?.category}
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
