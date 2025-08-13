import { cn } from "@/lib/utils";
import React from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  summary?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
  expandableComponent?: React.ReactNode;
  lastRowClassName?: string;
};

function TableComponent<T extends Record<string, any>>({
  data,
  columns,
  className,
  onRowClick,
  summary,
  expandableComponent,
  lastRowClassName = "",
}: TableProps<T>) {
  const calculateColumnTotal = (key: string) => {
    return data.reduce((sum, row) => {
      const value = row[key];
      return typeof value === "number" ? sum + value : sum;
    }, 0);
  };

  return (
    <table
      className={cn(
        "min-w-full border-collapse border border-gray-300 text-xs",
        className
      )}
    >
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key.toString()}
              className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-700"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {expandableComponent}
        {data.map((row, index) => (
          <tr
            key={index}
            className={`even:bg-gray-50 ${
              onRowClick ? "cursor-pointer hover:bg-gray-100" : ""
            }`}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <td
                key={column.key.toString()}
                className="border border-gray-300 px-4 py-2"
              >
                {column.render ? column.render(row) : (row[column.key] ?? 0)}
              </td>
            ))}
          </tr>
        ))}
        {summary && data.length > 0 && (
          <tr
            className={cn("bg-green-100 font-semibold", lastRowClassName)}
            data-lastrow="true"
          >
            <td className="border border-gray-300 px-4 py-2">Разом</td>
            {columns.slice(1).map((column) => (
              <td
                key={column.key.toString()}
                className="border border-gray-300 px-4 py-2"
              >
                {calculateColumnTotal(column.key.toString())}
              </td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default TableComponent;
