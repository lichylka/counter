"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useInvestmentStore } from "@/store/investmentStore";
import EditValueModal from "@/components/investments/EditValueModal";
import { Todo } from "@/types/todo.types";
import { usePnLStore } from "@/store/pnlStore";

export default function InvestmentsDetailPage() {
  const params = useParams();
  const { projectId, pnlId, type } = params;
  const pageType = type == "income" ? "доходи" : "витрати";
  const { pnls } = usePnLStore();

  // Find the specific investment data
  const pnl = pnls.find((inv: Todo) => inv.id === pnlId);

  // Get period data structure based on investment period
  const getPeriodData = () => {
    switch (pnl?.period || "Порічно") {
      case "Помісячно":
        return [
          { name: "Січень", value: "0", editable: true },
          { name: "Лютий", value: "0", editable: true },
          { name: "Березень", value: "0", editable: true },
          { name: "Q1 Підсумок", value: "0", editable: false },
          { name: "Квітень", value: "0", editable: true },
          { name: "Травень", value: "0", editable: true },
          { name: "Червень", value: "0", editable: true },
          { name: "Q2 Підсумок", value: "0", editable: false },
          { name: "Липень", value: "0", editable: true },
          { name: "Серпень", value: "0", editable: true },
          { name: "Вересень", value: "0", editable: true },
          { name: "Q3 Підсумок", value: "0", editable: false },
          { name: "Жовтень", value: "0", editable: true },
          { name: "Листопад", value: "0", editable: true },
          { name: "Грудень", value: "0", editable: true },
          { name: "Q4 Підсумок", value: "0", editable: false },
          { name: "ЗА РІК", value: "0", editable: false },
        ];
      case "Поквартально":
        return [
          { name: "I квартал", value: "0", editable: true },
          { name: "II квартал", value: "0", editable: true },
          { name: "III квартал", value: "0", editable: true },
          { name: "IV квартал", value: "0", editable: true },
          { name: "ЗА РІК", value: "0", editable: false },
        ];
      case "Порічно":
      default:
        return [
          { name: `${pnl?.year || ""} рік`, value: "0", editable: true },
          { name: "ЗА РІК", value: "0", editable: false },
        ];
    }
  };

  // Calculate totals based on period type
  const calculateTotals = (periodData: Todo) => {
    switch (pnl?.period || "Порічно") {
      case "Помісячно":
        // ... existing code for monthly calculations ...
        return {
          yearTotal: periodData
            .slice(0, -1)
            .reduce(
              (sum: Todo, m: Todo) =>
                !m.name.includes("Підсумок")
                  ? sum + (Number(m.value) || 0)
                  : sum,
              0
            ),
        };
      case "Поквартально":
        return {
          yearTotal: periodData
            .slice(0, -1)
            .reduce((sum: Todo, m: Todo) => sum + (Number(m.value) || 0), 0),
        };
      case "Порічно":
      default:
        return {
          yearTotal: Number(periodData[0].value) || 0,
        };
    }
  };

  const [periodData, setPeriodData] = React.useState({
    year: pnl?.year || "",
    period: pnl?.period || "Порічно",
    periods: getPeriodData(),
  });

  // Function to handle editing of values
  const [editModalState, setEditModalState] = React.useState({
    isOpen: false,
    index: -1,
    value: "",
    periodName: "",
  });

  const handleEdit = (index: number) => {
    setEditModalState({
      isOpen: true,
      index,
      value: periodData.periods[index].value,
      periodName: periodData.periods[index].name,
    });
  };

  const handleSaveEdit = (newValue: string) => {
    const updatedPeriods = [...periodData.periods];
    updatedPeriods[editModalState.index] = {
      ...updatedPeriods[editModalState.index],
      value: newValue,
    };

    // Update the total
    const totals = calculateTotals(updatedPeriods);
    updatedPeriods[updatedPeriods.length - 1].value =
      totals.yearTotal.toString();

    setPeriodData({ ...periodData, periods: updatedPeriods });
  };

  const handleCloseModal = () => {
    setEditModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Add the missing handleSave function
  const handleSave = () => {
    // Update the investment in the store
    if (pnl && type) {
      const { updateInvestment } = useInvestmentStore.getState();
      const fieldToUpdate = type === "income" ? "income" : "expenses";
      const totalValue = Number(
        periodData.periods[periodData.periods.length - 1].value
      );

      updateInvestment(pnl.year, fieldToUpdate, totalValue);
    }

    // You might want to add navigation back to the project page or show a success message
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {pageType} {periodData.year} року
          </h1>
          <p className="text-gray-600">{periodData.period}</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/project/${projectId}`}>🔙 Назад до проєкту</Link>
        </Button>
      </header>

      <Card>
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Період
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Сума
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {periodData.periods.map((period, index) => (
                  <tr
                    key={index}
                    className={`${
                      period.editable ? "" : "font-semibold bg-gray-50"
                    } hover:bg-gray-50`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {period.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {period.value}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {period.editable && (
                        <Button
                          variant="link"
                          className="text-purple-600 p-0 h-auto"
                          onClick={() => handleEdit(index)}
                        >
                          редагувати
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline">Експорт в Excel</Button>
        <Button onClick={handleSave}>Зберегти зміни</Button>
      </div>

      <EditValueModal
        isOpen={editModalState.isOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        initialValue={editModalState.value}
        periodName={editModalState.periodName}
      />
    </div>
  );
}
