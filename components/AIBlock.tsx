import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function AIBlock() {
  return (
    <Card>
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold">
          🤖 AI-помічник з прибутковості
        </h2>
        <input
          type="text"
          placeholder="Як підвищити рентабельність продукції?"
          className="w-full border rounded-md px-4 py-2"
        />
        <Button>Запитати у AI</Button>
        <div className="text-sm text-gray-600">
          AI: Щоб підвищити рентабельність, варто або оптимізувати виробничі
          витрати, або переглянути ціноутворення.
        </div>
      </CardContent>
    </Card>
  );
}

export default AIBlock;
