import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface EditValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue: string;
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
  onSave,
  periodName,
}: EditValueModalProps) {
  const [rows, setRows] = useState<TableRow[]>([
    { name: "Продукт", unit: "шт", quantity: 2, price: 100, total: 200 }
  ]);
  
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  
  const calculateTotal = () => {
    return rows.reduce((sum, row) => sum + row.total, 0);
  };
  
  const handleAddRow = () => {
    setShowAddRowModal(true);
  };
  
  const handleSaveNewRow = (newRow: TableRow) => {
    setRows([...rows, newRow]);
    setShowAddRowModal(false);
  };
  
  const handleSave = () => {
    onSave(calculateTotal().toString());
    onClose();
  };

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
                    <td colSpan={4} className="p-2 text-right">Всього</td>
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
                <button 
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSave}
                >
                  💾 Зберегти
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {showAddRowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6">
            <h2 className="text-xl font-semibold mb-4">Додати рядок-запис</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <select className="border rounded p-2">
                <option>Категорія</option>
                <option>Маркетинг</option>
              </select>
              <select className="border rounded p-2">
                <option>Підкатегорія</option>
              </select>
              <select className="border rounded p-2">
                <option>Тип</option>
              </select>
              <select className="border rounded p-2">
                <option>Підтип</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <input type="text" placeholder="Назва" className="border rounded p-2" />
              <select className="border rounded p-2">
                <option>Одиниця</option>
                <option>шт</option>
                <option>кг</option>
              </select>
              <input type="number" placeholder="Кількість" className="border rounded p-2" />
              <input type="number" placeholder="Ціна" className="border rounded p-2" />
              <select className="border rounded p-2">
                <option>Вид</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  // Тут має бути логіка додавання нового рядка
                  const newRow = {
                    name: "Новий продукт",
                    unit: "шт",
                    quantity: 1,
                    price: 100,
                    total: 100
                  };
                  handleSaveNewRow(newRow);
                }}
              >
                ➕ Додати новий рядок
              </button>
              <button 
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowAddRowModal(false)}
              >
                ✖ Скасувати
              </button>
              <button 
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                onClick={() => {
                  // Тут має бути логіка збереження рядка
                  const newRow = {
                    name: "Новий продукт",
                    unit: "шт",
                    quantity: 1,
                    price: 100,
                    total: 100
                  };
                  handleSaveNewRow(newRow);
                }}
              >
                💾 Зберегти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}