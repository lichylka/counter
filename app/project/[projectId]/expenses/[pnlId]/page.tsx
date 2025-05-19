"use client";

import { useState } from "react";

type ExpenseItem = {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  price: number;
  category: string;
  type: "Постійні" | "Змінні: Прямі" | "Змінні: Накладні";
  period: string;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAddExpense = () => {
    const newItem: ExpenseItem = {
      id: Date.now(),
      name: "Нова витрата",
      unit: "кг",
      quantity: 100,
      price: 50,
      category: "Матеріальні",
      type: "Змінні: Прямі",
      period: "2025-06",
    };
    setExpenses([...expenses, newItem]);
  };

  const handleAIQuery = async () => {
    // TODO: інтеграція з AI
    const mockResponse: ExpenseItem[] = [
      {
        id: Date.now(),
        name: "Пакування",
        unit: "шт",
        quantity: 10000,
        price: 1.5,
        category: "Матеріальні",
        type: "Змінні: Накладні",
        period: "2025-06",
      },
    ];
    setExpenses([...expenses, ...mockResponse]);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">
        💸 Витрати проєкту: (назва проекту)
      </h1>

      {/* 📅 Витрати за період */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Витрати за період</h2>
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
                    <td className="border px-4 py-2">{period}</td>
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
                  .filter((e) => e.type === type)
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="border px-2 py-1">{item.name}</td>
                      <td className="border px-2 py-1">{item.unit}</td>
                      <td className="border px-2 py-1">{item.quantity}</td>
                      <td className="border px-2 py-1">{item.price}</td>
                      <td className="border px-2 py-1">
                        {(item.quantity * item.price).toFixed(2)}
                      </td>
                      <td className="border px-2 py-1">{item.category}</td>
                      <td className="border px-2 py-1">{item.period}</td>
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
          onClick={handleAIQuery}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🤖 Запитати у AI
        </button>
      </section>
    </main>
  );
}
