import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FinancialOverview as FinancialData } from "@/types/dashboard";
import { useRouter } from "next/navigation";

interface FinancialOverviewProps {
  projectName: string;
  projectId: string;
  data: FinancialData;
}

export function FinancialOverview({ projectName, projectId, data }: FinancialOverviewProps) {
  const router = useRouter();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📊 Огляд фінансів</h2>
          <Badge variant="outline">✅ {projectName}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-medium mb-2">Доходи</h3>
              <p className="text-2xl font-bold text-green-600">
                {data.income.toLocaleString()} грн
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-medium mb-2">Витрати</h3>
              <p className="text-2xl font-bold text-red-600">
                {data.expenses.toLocaleString()} грн
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <h3 className="font-medium mb-2">Прибуток</h3>
              <p className="text-2xl font-bold text-blue-600">
                {data.profit.toLocaleString()} грн
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">📈 Повна аналітика</Button>
          <Button variant="outline">📑 Завантажити PDF</Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/project/${projectId}`)}
          >
            🧮 Редагувати план
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}