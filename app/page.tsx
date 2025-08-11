"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessPlanAIPromptForm from "@/components/BusinessPlanAIPromptForm";
import { useRef } from "react";
import IdeasForm from "@/components/IdeasForm";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          AI-запит + фінмодель для твого бізнесу — за 5 хвилин
        </h1>
        <p className="text-lg mb-6">
          Введи продукт, обери свої налаштування — і отримай не просто шаблон, а
          готову модель.
        </p>
        <Link href="/dashboard">
          <Button variant="outline" size="lg">
            Спробувати без реєстрації
          </Button>
        </Link>
      </section>
      {/*AI prompt generator */}
      <h2 className="text-2xl font-bold mt-8 text-center">
        Внеси дані — і отримай запит
      </h2>
      <BusinessPlanAIPromptForm ref={formRef} />
      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-2 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Отримай результат одразу — AI-запит
        </h2>
        <h3 className="text-base text-muted-foreground mb-4 text-center">
          Вже на першому кроці — ти отримуєш готовий запит для генерації
          бізнес-плану
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="text-md">
              ✅ Персоналізований AI-запит — сформований на основі продукту,
              галузі та цілі
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-md">
              ✅ Готовий формат — для вставки в ChatGPT або інші AI-помічники
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-md">
              ✅ Адаптація під контекст — запит враховує специфіку галузі, мету
              планування і період
            </CardContent>
          </Card>
        </div>
        <Button
          className="mt-4 cursor-pointer"
          variant={"outline"}
          onClick={() => {
            if (formRef.current)
              formRef.current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Спробувати запит безкоштовно
        </Button>
        <h2 className="text-2xl font-bold mt-10 mb-2 text-center">
          Фінанси твого бізнесу — на одному екрані
        </h2>
        <h3 className="text-base text-muted-foreground mb-4 text-center">
          Створюй персоналізований фінплан з можливістю збереження і редагування
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent>
              💸 Операційні доходи — прогноз на основі типового місяця
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              📊 Класифіковані витрати (постійні, прямі та накладні)
            </CardContent>
          </Card>
          <Card>
            <CardContent>📈 Звіт про прибутки та збитки (P&amp;L)</CardContent>
          </Card>
          <Card>
            <CardContent>🔄 Грошові потоки по періодах (Cash Flow)</CardContent>
          </Card>
          <Card>
            <CardContent>📆 Прогноз — по місяцях, кварталах, роках</CardContent>
          </Card>
          <Card>
            <CardContent>
              📁 Проєкт користувача — збереження, редагування
            </CardContent>
          </Card>
        </div>
        <h3 className="text-base text-muted-foreground mt-8 text-center">
          AI-запит — це старт. Але справжній план — з вашими даними.
        </h3>
        <Button className="mt-4 cursor-pointer" variant={"outline"}>
          <Link href="/dashboard">Почати свій проект</Link>
        </Button>
      </section>

      <section id="calculators" className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-2">
          <h2 className="text-2xl font-bold mb-2 text-center">
            Спробуйте калькулятори прямо зараз — без реєстрації
          </h2>
          <p className="text-base text-muted-foreground mb-8 text-center">
            Найпопулярніші розрахунки у відкритому доступ готові для
            завантаження
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mb-4">
            <Card>
              <CardHeader>
                <CardTitle>☀️ Калькулятор окупності домашньої СЕС</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  30 секунд — і ви знаєте прибуток вашої сонячної станції.
                </p>
                <Button asChild variant={"outline"} className="w-full">
                  <Link href="https://drive.google.com/uc?export=download&id=1eOcM6hb1O5gxs4agGiTxPyjN4-lvCsCr">
                    Завантажити
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>☀️ Калькулятор стартапу SaaS-проєкту</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Показники юніт-економіки - доступно і швидко.
                </p>
                <Button asChild variant={"outline"} className="w-full">
                  <Link href="https://drive.google.com/uc?export=download&id=1HcQJCmqLrZbWeGRc4VGbiynlqVtZcHS4">
                    Завантажити
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  🌾 Агрокалькулятор змінних витрат на 1 га/поле
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Розрахуйте собівартість культури на полі.
                </p>
                <Button asChild variant={"outline"} className="w-full">
                  <Link href="https://drive.google.com/uc?export=download&id=1PsGLkHSDMHewt9ae40ejOWBc818HLqkv">
                    Завантажити
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  📈 Калькулятор прибутковості магазину / кафе
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Дізнайтеся, коли ваш бізнес вийде у плюс.
                </p>
                <Button asChild variant={"outline"} className="w-full">
                  <Link href="https://drive.google.com/uc?export=download&id=10wW6unLXL0l1nYEdN9ae1PC3X8ULHKie">
                    Завантажити
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <IdeasForm />
    </div>
  );
}
