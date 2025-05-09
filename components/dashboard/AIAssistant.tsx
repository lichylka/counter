import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AIAssistant() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">🤖 AI-асистент</h2>
        <p className="italic mb-4">
          &quot;Я допоможу проаналізувати ваш план або згенерую новий!&quot;
        </p>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            ✍️ Створити бізнес-план
          </Button>
          <Button variant="outline" className="w-full justify-start">
            🔍 Аналіз прибутковості
          </Button>
          <Button variant="outline" className="w-full justify-start">
            💬 Поставити питання
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}