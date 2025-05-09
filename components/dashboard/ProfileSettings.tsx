import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

export function ProfileSettings() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">⚙️ Налаштування профілю</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>ivan@example.com</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Пароль</p>
            <Button variant="outline" size="sm">
              Змінити
            </Button>
          </div>
          <div>
            <p className="text-sm text-gray-500">Мова інтерфейсу</p>
            <div className="flex gap-2 mt-1">
              <Badge>🇺🇦 UA</Badge>
              <Badge variant="outline">🇬🇧 EN</Badge>
              <Badge variant="outline">🇵🇱 PL</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Двофакторна авторизація</p>
            <Badge className="bg-green-500 hover:bg-green-600">Увімкнено</Badge>
          </div>
        </div>
        <Button variant="destructive" className="mt-6 w-full" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Вийти з акаунту
        </Button>
      </CardContent>
    </Card>
  );
}