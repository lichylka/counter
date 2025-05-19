"use client";

import { useState } from "react";

type IncomeItem = {
id: number;
name: string;
unit: string;
quantity: number;
price: number;
type: string;
period: string;
};

export default function IncomePage() {
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
// TODO: Запит до API OpenAI
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
<main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
<h1 className="text-3xl font-bold">Доходи проєкту: (назва проекту)</h1>

{/* 🔹 Таблиця періодів */}
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
{Array.from(
new Set(incomeList.map((item) => item.period))
).map((period) => (
<tr key={period}>
<td className="border px-4 py-2">{period}</td>
<td className="border px-4 py-2">
{incomeList
.filter((i) => i.period === period)
.reduce((sum, i) => sum + i.price * i.quantity, 0)}{" "}
грн
</td>
</tr>
))}
</tbody>
</table>
</section>

{/* 🔹 Таблиця доходів */}
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

{/* 🔹 Кнопка додавання вручну */}
<button
onClick={handleAddIncome}
className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
➕ Додати дохід вручну
</button>

{/* 🔹 AI-помічник */}
<section>
<h2 className="text-xl font-semibold mb-2 mt-6">AI-помічник</h2>
<textarea
value={aiPrompt}
onChange={(e) => setAiPrompt(e.target.value)}
placeholder="Опиши джерело доходу..."
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