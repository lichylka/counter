"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type IncomeItem = {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  type: string;
  period: string;
};

type Props = { params: { projectId: string; year: string; month: string } };

function PageContent({ params }: Props) {
  const [incomeList, setIncomeList] = useState<IncomeItem[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAddIncome = () => {
    const newItem: IncomeItem = {
      id: Date.now(),
      name: "Новий дохід",
      unit: "кг",
      quantity: 100,
      price: 50,
      type: "Продукція",
      period: "2025-06",
    };
    setIncomeList([...incomeList, newItem]);
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

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Доходи проєкту: (назва проекту)
          </h1>
          <Button variant="outline" asChild>
            <Link href={`/project/${params.projectId}/profit/year/${params.year}`}>
              🔙 Назад до проєкту
            </Link>
          </Button>
        </header>

        {/* Periods Table */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Доходи за період</h2>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Період</th>
                <th className="border px-4 py-2">Сума доходу</th>
                <th className="border px-4 py-2">Дії</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(incomeList.map((item) => item.period))).map(
                (period) => (
                  <tr key={period}>
                    <td className="border px-4 py-2">{period}</td>
                    <td className="border px-4 py-2">
                      {incomeList
                        .filter((i) => i.period === period)
                        .reduce((sum, i) => sum + i.price * i.quantity, 0)}{" "}
                      грн
                    </td>
                    <td className="border px-4 py-2">
                      <Button variant="link" className="text-purple-600">
                        редагувати
                      </Button>
                    </td>
                  </tr>
                )
              )}
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
                <th className="border px-2 py-1">Період</th>
              </tr>
            </thead>
            <tbody>
              {incomeList.map((item) => (
                <tr key={item.id}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.unit}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.price}</td>
                  <td className="border px-2 py-1">
                    {item.quantity * item.price}
                  </td>
                  <td className="border px-2 py-1">{item.type}</td>
                  <td className="border px-2 py-1">{item.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Manual Add Button */}
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
    </div>
  );
}

export default PageContent;
