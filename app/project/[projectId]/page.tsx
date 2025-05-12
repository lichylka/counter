"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { useInvestmentStore } from "@/store/investmentStore";
import { Todo } from "@/types/todo.types";
import { usePnLStore } from "@/store/pnlStore";

export default function ProjectDashboard() {
  const params = useParams();
  if (!params.projectId) {
    throw new Error("Project ID is not provided");
  }
  const { investments, setInvestments } = useInvestmentStore();
  const { pnls, setPnLs } = usePnLStore();
  const [documents, setDocuments] = useState<string[]>([]);
  const [projectData] = useState({
    name: "Фасування горіхів",
    startDate: "01.05.2025",
    term: 3, // Термін у роках
    salesStartDate: "01.09.2025",
    createdAt: "15.04.2025",
    updatedAt: "08.05.2025",
    status: "Активний",
  });

  // State for table data
  const [tableData, setTableData] = useState({
    investments: [],
    pnl: [],
    cashFlow: [],
    balance: [],
  });

  const [isClient, setIsClient] = useState(false);

  // Генеруємо роки на основі терміну проєкту
  const generateYears = () => {
    const startYear = parseInt(projectData.startDate.split(".")[2]);
    const years = [];

    for (let i = 0; i < projectData.term; i++) {
      years.push((startYear + i).toString());
    }

    return years;
  };

  useEffect(() => {
    // Mark that we're on the client
    setIsClient(true);

    // Generate data only on the client side
    const projectYears = generateYears();

    // Generate consistent random data and set investments and pnl in store
    const generatedInvestments = generateInvestmentData(projectYears);
    const generatedPnL = generatePnLData(projectYears);
    setInvestments(generatedInvestments);
    setPnLs(generatedPnL);

    setTableData({
      investments: generatedInvestments,
      pnl: generatedPnL,
      cashFlow: generateCashFlowData(projectYears),
      balance: generateBalanceData(projectYears),
    });

    // Load documents
    setDocuments(["Бізнес-план.pdf", "CashFlow.xlsx", "Стратегія.docx"]);
  }, [params.projectId, setInvestments, setPnLs]);

  // Generate data functions
  const generateInvestmentData = (years: Todo) => {
    return years.map((year: Todo, index: Todo) => ({
      id: `inv-${year}-${index}`,
      year,
      income: Math.floor(Math.random() * 150000 + 50000),
      expenses: Math.floor(Math.random() * 100000 + 30000),
      balance: Math.floor(Math.random() * 80000 + 20000),
      period: "Порічно", // Додаємо поле period зі значенням за замовчуванням
    }));
  };

  const generatePnLData = (years: Todo) => {
    return years.map((year: Todo, index: Todo) => ({
      id: `inv-${year}-${index}`,
      year,
      income: Math.floor(Math.random() * 150000 + 50000),
      expenses: Math.floor(Math.random() * 100000 + 30000),
      profit: Math.floor(Math.random() * 80000 + 20000),
    }));
  };

  const generateCashFlowData = (years: Todo) => {
    return years.map((year: Todo) => ({
      year,
      inflow: Math.floor(Math.random() * 200000 + 100000),
      outflow: Math.floor(Math.random() * 150000 + 80000),
      netFlow: Math.floor(Math.random() * 100000 + 20000),
    }));
  };

  const generateBalanceData = (years: Todo) => {
    return years.map((year: Todo) => ({
      year,
      assets: Math.floor(Math.random() * 600000 + 400000),
      liabilities: Math.floor(Math.random() * 300000 + 100000),
      equity: Math.floor(Math.random() * 400000 + 200000),
    }));
  };

  const projectYears = generateYears();

  // If we're not on the client yet, render a loading state or skeleton
  if (!isClient) {
    return <div className="p-6">Завантаження...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Хедер */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Проєкт: {projectData.name}</h1>
          <Button variant="ghost">🖊️ Редагувати</Button>
        </div>
        <p className="text-sm text-gray-600">
          Початок: {projectData.startDate} | Термін: {projectData.term} років |
          Початок продажів: {projectData.salesStartDate}
        </p>
        <p className="text-sm text-gray-500">
          📅 Створено: {projectData.createdAt} | 🛠️ Оновлено:{" "}
          {projectData.updatedAt} |
          <Badge variant="secondary" className="ml-2">
            {projectData.status}
          </Badge>
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard">🔙 Назад до кабінету</Link>
          </Button>
          <Button variant="outline">📥 Завантажити PDF</Button>
          <Button variant="outline">📊 Повна аналітика</Button>
        </div>
      </header>

      {/* Основні таблиці */}
      <Card className="p-4">
        <TableSection
          title="Інвестиції та кредити"
          columns={[
            "Період",
            "Інвестдоходи",
            "Інвеститрати",
            "Залишок",
            "Розрахунок",
          ]}
          rows={yearsRows(
            "investments",
            projectYears,
            investments,
            params.projectId as string
          )}
        />
      </Card>

      <Card className="p-4">
        <TableSection
          title="Звіт (P&L)"
          columns={["Період", "Доходи", "Витрати", "Прибуток", "Розрахунок"]}
          rows={yearsRows(
            "pnl",
            projectYears,
            pnls,
            params.projectId as string
          )}
          summary
        />
      </Card>

      <Card className="p-4">
        <TableSection
          title="Грошопотік"
          columns={[
            "Період",
            "Вхідний потік",
            "Вихідний потік",
            "Чистий потік",
            "Розрахунок",
          ]}
          rows={cashFlowRows(projectYears, tableData.cashFlow)}
          summary
        />
      </Card>

      <Card className="p-4">
        <TableSection
          title="Баланс"
          columns={[
            "Період",
            "Активи",
            "Зобов'язання",
            "Капітал",
            "Розрахунок",
          ]}
          rows={balanceRows(projectYears, tableData.balance)}
          summary
        />
      </Card>

      {/* AI-помічник */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">🤖 AI-помічник</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button className="w-full">⚙️ Створити бізнес-план</Button>
          <Button className="w-full">📈 Проаналізувати прибутковість</Button>
          <Button className="w-full">💬 Чат з AI</Button>
        </div>
      </Card>

      {/* Документи */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">📚 Документи</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          {documents.map((doc, idx) => (
            <li key={idx} className="text-sm">
              {doc}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">⬇️ Завантажити</Button>
          <Button variant="outline">📤 Імпортувати</Button>
        </div>
      </Card>

      {/* Футер */}
      <footer className="bg-gray-800 text-white py-4 text-center rounded-lg text-sm">
        © 2025 FinPlan — Всі права захищені
      </footer>
    </div>
  );
}

function TableSection({
  title,
  columns,
  rows,
  summary = false,
}: {
  title: string;
  columns: string[];
  rows: Todo[];
  summary?: boolean;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 border text-left text-sm font-medium text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                {row.map((cell: Todo, i: number) => (
                  <td key={i} className="px-4 py-2 border text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
            {summary && (
              <tr className="font-semibold bg-gray-50">
                <td className="px-4 py-2 border">Разом</td>
                {columns.slice(1).map((_, i) => (
                  <td key={i} className="px-4 py-2 border">
                    ...
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function yearsRows(
  type: string,
  years: string[],
  data: any[] = [],
  projectId: string
) {
  return years.map((year, index) => {
    const rowData = data[index] || {
      id: `inv-${year}-${index}`,
      income: 0,
      expenses: 0,
      balance: 0,
      period: "Порічно",
    };

    const handlePeriodChange = (value: Todo) => {
      const { updateInvestment } = useInvestmentStore.getState();
      updateInvestment(year, "period", value);
    };
    console.log(rowData);
    return [
      year,
      <div key={`income-${year}`} className="flex items-center gap-2">
        {`${rowData.income}`}
        {type === "investments" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link
              href={`/project/${projectId}/investments/${rowData.id}/income`}
            >
              🖊️
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <Link href={`/project/${projectId}/pnl/${rowData.id}/income`}>
              🖊️
            </Link>
          </Button>
        )}
      </div>,
      <div key={`expenses-${year}`} className="flex items-center gap-2">
        {`${rowData.expenses}`}
        {type === "investments" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            asChild
          >
            <Link
              href={`/project/${projectId}/investments/${rowData.id}/expenses`}
            >
              🖊️
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
          >
            <Link href={`/project/${projectId}/pnl/${rowData.id}/income`}>
              🖊️
            </Link>
          </Button>
        )}
      </div>,
      `${rowData.balance}`,
      <Select
        key={`select-${year}`}
        defaultValue={rowData.period}
        onValueChange={handlePeriodChange}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Порічно" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Порічно">Порічно</SelectItem>
          <SelectItem value="Поквартально">Поквартально</SelectItem>
          <SelectItem value="Помісячно">Помісячно</SelectItem>
        </SelectContent>
      </Select>,
    ];
  });
}

function cashFlowRows(years: string[], data: any[] = []) {
  return years.map((year, index) => {
    const rowData = data[index] || { inflow: 0, outflow: 0, netFlow: 0 };

    return [
      year,
      `${rowData.inflow}`,
      `${rowData.outflow}`,
      `${rowData.netFlow}`,
      <Select key={`select-cf-${year}`} defaultValue="yearly">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Порічно" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yearly">Порічно</SelectItem>
          <SelectItem value="quarterly">Поквартально</SelectItem>
          <SelectItem value="monthly">Помісячно</SelectItem>
        </SelectContent>
      </Select>,
    ];
  });
}

function balanceRows(years: string[], data: any[] = []) {
  return years.map((year, index) => {
    const rowData = data[index] || { assets: 0, liabilities: 0, equity: 0 };

    return [
      year,
      `${rowData.assets}`,
      `${rowData.liabilities}`,
      `${rowData.equity}`,
      <Select key={`select-bal-${year}`} defaultValue="yearly">
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Порічно" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yearly">Порічно</SelectItem>
          <SelectItem value="quarterly">Поквартально</SelectItem>
          <SelectItem value="monthly">Помісячно</SelectItem>
        </SelectContent>
      </Select>,
    ];
  });
}
