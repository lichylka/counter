import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EditValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  periodName: string;
}

interface TableRow {
  name: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
}

export default function EditValueModal({
  isOpen,
  onClose,

  periodName,
}: EditValueModalProps) {
  const [rows] = useState<TableRow[]>([
    { name: "Продукт", unit: "шт", quantity: 2, price: 100, total: 200 },
  ]);

  const [, setShowAddRowModal] = useState(false);

  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + row.total, 0);
  };

  const handleAddRow = () => {
    setShowAddRowModal(true);
  };

  // const handleSaveNewRow = (
  //   newRow: Omit<typeof api.expenses.addExpense._args, "period" | "projectId">
  // ) => {
  //   setRows([...rows, newRow] as any);
  //   setShowAddRowModal(false);
  // };

  // const handleSave = () => {
  //   onSave(calculateTotal().toString());
  //   onClose();
  // };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl p-0">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                {periodName}: Додати дохід / витрату
              </h2>

              <table className="w-full mb-4 border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Назва</th>
                    <th className="p-2 text-left">Од. виміру</th>
                    <th className="p-2 text-left">Кількість</th>
                    <th className="p-2 text-left">Ціна за од.</th>
                    <th className="p-2 text-left">Сума</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2">{row.name}</td>
                      <td className="p-2">{row.unit}</td>
                      <td className="p-2">{row.quantity}</td>
                      <td className="p-2">{row.price}</td>
                      <td className="p-2">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={4} className="p-2 text-right">
                      Всього
                    </td>
                    <td className="p-2">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="mb-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleAddRow}
                >
                  ➕ Додати рядок-запис
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={onClose}
                >
                  ✖ Скасувати
                </button>
                <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                  💾 Зберегти
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
