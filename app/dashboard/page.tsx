import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Edit, Search, Download, Trash2, RefreshCcw, Upload, LogOut } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Верхня панель */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">🧑‍💼 Кабінет користувача: Іван Петренко</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-sm">[Pro акаунт]</Badge>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">2</Badge>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Основний контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ліва колонка */}
        <div className="lg:col-span-2 space-y-8">
          {/* Проекти */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">📁 Ваші проєкти</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Назва проекту</th>
                      <th className="text-left py-2">Статус</th>
                      <th className="text-left py-2">Останнє оновлення</th>
                      <th className="text-left py-2">Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">🌰 Фасування горіхів</td>
                      <td><Badge>Активний</Badge></td>
                      <td>02.05.2025</td>
                      <td className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">🏗️ Виробництво каркасів</td>
                      <td><Badge variant="secondary">Архівований</Badge></td>
                      <td>18.04.2025</td>
                      <td className="flex gap-2">
                        <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><RefreshCcw className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button variant="outline" className="mt-4">
                📎 Створити новий проект [+]
              </Button>
            </CardContent>
          </Card>

          {/* Огляд фінансів */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">📊 Огляд фінансів</h2>
                <Badge variant="outline">✅ Фасування горіхів</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">Доходи</h3>
                    <p className="text-2xl font-bold text-green-600">128,000 грн</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">Витрати</h3>
                    <p className="text-2xl font-bold text-red-600">83,500 грн</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-medium mb-2">Прибуток</h3>
                    <p className="text-2xl font-bold text-blue-600">44,500 грн</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">📈 Повна аналітика</Button>
                <Button variant="outline">📑 Завантажити PDF</Button>
                <Button variant="outline">🧮 Редагувати план</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Права колонка */}
        <div className="space-y-8">
          {/* AI-асистент */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">🤖 AI-асистент</h2>
              <p className="italic mb-4">&quot;Я допоможу проаналізувати ваш план або згенерую новий!&quot;</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">✍️ Створити бізнес-план</Button>
                <Button variant="outline" className="w-full justify-start">🔍 Аналіз прибутковості</Button>
                <Button variant="outline" className="w-full justify-start">💬 Поставити питання</Button>
              </div>
            </CardContent>
          </Card>

          {/* Документи */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">📚 Мої документи</h2>
              <ul className="space-y-2 mb-4">
                <li>📄 Бізнес-план_горіхи.pdf</li>
                <li>📊 Звіт_P&L_березень.xlsx</li>
                <li>📝 Стратегія_2025.docx</li>
              </ul>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Завантажити
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Імпортувати
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Налаштування */}
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
                  <Button variant="outline" size="sm">Змінити</Button>
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
        </div>
      </div>
    </div>
  );
}