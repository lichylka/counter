import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="md:text-2xl text-md font-bold">
        🧑‍💼 Кабінет користувача: Гість
      </h1>
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="text-sm">
          [Pro акаунт]
        </Badge>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
