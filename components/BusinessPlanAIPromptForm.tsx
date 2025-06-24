"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BusinessPlanAIPromptForm() {
  const [productName, setProductName] = useState("");
  const [industry, setIndustry] = useState("Агро");
  const [purpose, setPurpose] = useState("Для інвестора");
  const [focusSection, setFocusSection] = useState("Продукт");
  const [fromYear, setFromYear] = useState(2025);
  const [toYear, setToYear] = useState(2028);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  const handleGenerate = () => {
    const aiPrompt = `Створи бізнес-план для продукту "${productName}" у галузі ${industry}, мета — ${purpose}. Основна увага — ${focusSection}. Планування: ${fromYear}–${toYear} роки.`;
    setPrompt(aiPrompt);
    setShowPrompt(true);
  };

  return (
    <Card className="max-w-3xl w-full mx-auto my-8">
      <CardHeader>
        <CardTitle>🛠️ Налаштування запиту АІ для бізнес-плану</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div>
            <Label htmlFor="productName">Назва продукту</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="industry">Оберіть галузь</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry" className="mt-1">
                <SelectValue placeholder="Оберіть галузь" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Агро">Агро</SelectItem>
                <SelectItem value="Е-комерція">Е-комерція</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Кафе">Кафе</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="purpose">Мета плану</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger id="purpose" className="mt-1">
                <SelectValue placeholder="Оберіть мету" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Для інвестора">Для інвестора</SelectItem>
                <SelectItem value="Для банку">Для банку</SelectItem>
                <SelectItem value="Для особистого планування">
                  Для особистого планування
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="focusSection">Основний розділ</Label>
            <Select value={focusSection} onValueChange={setFocusSection}>
              <SelectTrigger id="focusSection" className="mt-1">
                <SelectValue placeholder="Оберіть розділ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Продукт">Продукт</SelectItem>
                <SelectItem value="Маркетинг">Маркетинг</SelectItem>
                <SelectItem value="Фінанси">Фінанси</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="fromYear">Період планування: з</Label>
              <Input
                id="fromYear"
                type="number"
                min={2000}
                max={2100}
                value={fromYear}
                onChange={(e) => setFromYear(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="toYear">по</Label>
              <Input
                id="toYear"
                type="number"
                min={2000}
                max={2100}
                value={toYear}
                onChange={(e) => setToYear(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-2">
            🧠 Сформувати запит
          </Button>
        </form>
        {showPrompt && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">🔍 Згенерований AI-запит:</h3>
            <Textarea
              value={prompt}
              readOnly
              rows={4}
              className="w-full font-mono bg-muted border rounded"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
