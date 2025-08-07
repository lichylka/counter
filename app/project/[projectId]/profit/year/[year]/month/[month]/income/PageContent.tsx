"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AddIncomeModal from "@/components/AddIncomeModal";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { periodLabelToString } from "@/helpers/periodLabelToString";
import { monthLabels } from "@/helpers/monthsLabels";
import { Edit, Trash2 } from "lucide-react";
import { FunctionReference } from "convex/server";

type IncomeItem = {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  type: string;
  period: string;
};

type Props = {
  params: { projectId: string; year: string; month: string };
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

function PageContent({ params, preloadedReportMonth }: Props) {
  const [incomeList, setIncomeList] = useState<IncomeItem[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
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

  const handleAIQuery = async () => {
    // TODO: Implement AI query
    const mockAIResponse: IncomeItem[] = [
      {
        id: Date.now(),
        name: "Полуниця",
        unit: "кг",
        quantity: 5000,
        price: 70,
        type: "Продукція",
        period: "2025-06",
      },
    ];
    setIncomeList([...incomeList, ...mockAIResponse]);
  };

  const reportMonth = usePreloadedQuery(preloadedReportMonth);

  if (!reportMonth) return null;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Доходи за період:{" "}
            {monthLabels[Number(params.month) - 1] || params.month}{" "}
            {params.year}
          </h1>
          <Button variant="outline" asChild>
            <Link
              href={`/project/${params.projectId}/profit/year/${params.year}`}
            >
              🔙 Назад до проєкту
            </Link>
          </Button>
        </header>

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
                  {reportMonth.income_total}
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

        {/* Income Details Table */}
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
                    <Button
                      variant="ghost"
                      size="icon"
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
        </section>

        <Button
          onClick={handleAddIncome}
          className="bg-green-600 hover:bg-green-700"
        >
          ➕ Додати дохід вручну
        </Button>

        {/* AI Assistant */}
        <section>
          <h2 className="text-xl font-semibold mb-2 mt-6">AI-помічник</h2>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Опиши джерело доходу..."
            className="w-full border p-2 rounded mb-2"
            rows={3}
          />
          <Button
            onClick={handleAIQuery}
            className="bg-blue-600 hover:bg-blue-700"
          >
            🤖 Запитати у AI
          </Button>
        </section>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline">Експорт в Excel</Button>
          <Button>Зберегти зміни</Button>
        </div>
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

export default PageContent;
