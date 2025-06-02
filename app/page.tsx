"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// const categories = [
//   {
//     title: "Основи бізнес-планування",
//     items: [
//       "Що має містити повний бізнес-план?",
//       "Поясни різницю між P&L, Cash Flow і Балансом.",
//       "Як визначити початкові витрати для мого бізнесу?",
//       "Як розраховується точка беззбитковості?",
//     ],
//   },
//   {
//     title: "Бізнес-план під мету",
//     items: [
//       "Згенеруй бізнес-план для залучення інвестора.",
//       "Підготуй бізнес-план для подання в банк на кредит.",
//       "Напиши короткий бізнес-план для особистого використання.",
//       "Як адаптувати мій план для державної грантової програми?",
//     ],
//   },
//   {
//     title: "Бізнес-план під сферу діяльності",
//     items: [
//       "Створи план для кав'ярні на 20 посадочних місць.",
//       "Розпиши план для онлайн-магазину хендмейду.",
//       "Створи P&L для виробництва меблів на замовлення.",
//       "Згенеруй Cash Flow для сервісу доставки їжі.",
//     ],
//   },
//   {
//     title: "Професійна підтримка та допомога",
//     items: [
//       "Проаналізуй рентабельність проєкту за останній квартал.",
//       "Запропонуй шляхи зниження витрат.",
//       "Порівняй два сценарії розвитку: базовий і агресивний.",
//       "Сформуй рекомендації щодо масштабування бізнесу.",
//     ],
//   },
// ];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-gray-900 text-white py-4 px-8">
        <nav className="flex justify-between items-center">
          <div className="font-bold">Lichylka</div>
          <ul className="hidden md:flex gap-4">
            <li>
              <Link href="#" className="hover:text-gray-300">
                Головна
              </Link>
            </li>
            <li>
              <Link href="#features" className="hover:text-gray-300">
                Можливості
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-gray-300">
                Тарифи
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-gray-300">
                Про нас
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-gray-300">
                Контакти
              </Link>
            </li>
          </ul>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="text-black">
              <Link href="/dashboard">Увійти</Link>
            </Button>
            <Button
              variant="outline"
              className="bg-green-600 hover:bg-green-700"
              asChild
            >
              <Link href="#register">Зареєструватися</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Планування вашого бізнесу — просто як ніколи
        </h1>
        <p className="text-lg mb-6">
          Автоматизуйте планування інвестицій, прибутків, грошового потоку та
          балансу
        </p>
        <Button variant="outline" size="lg">
          Спробувати без реєстрації
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Що ви отримаєте</h2>
        <Card className="max-w-2xl mx-auto mb-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-lg">
          <CardContent className="pt-6 text-center space-y-4">
            <h3 className="text-2xl font-semibold text-blue-800">
              Фінансову модель 
            </h3>
            <div className="text-lg text-gray-600">
              <p>Професійна оцінка ефективності</p>
              <p>Детальний фінансовий аналіз</p>
              <p>Прогнозування розвитку</p>
            </div>
            <Button
              variant="outline"
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 border-blue-600 hover:border-blue-700"
            >
              Спробувати без реєстрації
            </Button>
          </CardContent>
        </Card>
        <h3 className="text-2xl font-semibold text-blue-800 text-center mb-2">
          Основні розділи
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🧾 Інвестиції – формуйте активи</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>📈 P&L звіти – ведіть прибутки та збитки</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>💸 Грошовий потік – контролюйте cash flow</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🧾 Баланс – активи, пасиви, амортизація</p>
            </CardContent>
          </Card>
        </div>{" "}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Зареєструватися і створити бізнес-план
          </Button>
        </div>
      </section>

      {/* AI Section */}
      {/* <section className="pt-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Зробіть бізнес-план за допомогою штучного інтелекту
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🤖 AI-асистент – створює план за запитаннями</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🧠 Аналіз прибутковості</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>📋 Готові шаблони для різних ніш</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>✏️ Редактор бізнес-плану</p>
            </CardContent>
          </Card>
          {/* <Card>
            <CardContent className="pt-6 text-center">
              <p>🌐 UA / EN / PL підтримка</p>
            </CardContent>
          </Card>
        </div>
         <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Спробувати AI-планувальник
          </Button>
        </div> 
        <h2 className="text-3xl font-bold text-center mt-8 mb-6">
          Спробуйте AI-планувальник - оберіть категорію
        </h2>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <button 
                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center group"
                      >
                        <span className="text-blue-500 mr-3 transform group-hover:translate-x-1 transition-transform">→</span>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-xl mx-auto my-4 p-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold mb-6 text-center text-blue-800">
            Типові запити до AI
          </h2>
          {categories.map((category, index) => (
            <div key={index} className="border rounded-lg mb-3 hover:border-blue-200 transition-colors">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left p-4 bg-gray-50 rounded-t-lg text-gray-800 font-medium hover:bg-blue-50 transition-colors"
              >
                <span className="flex items-center">
                  <span className="text-blue-600 mr-2">#{index + 1}</span>
                  {category.title}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
                    openCategory === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {openCategory === index && (
                <ul className="p-4 bg-white rounded-b-lg space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i}>
                      <button 
                        className="w-full text-left p-4 rounded-lg bg-white border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100 transition-all flex items-center group shadow-sm hover:shadow-md"
                      >
                        <span className="text-blue-500 mr-3 text-xl">→</span>
                        <span className="flex-1">{item}</span>
                        <span className="text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity text-sm">
                          Натиснути
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div> 
      </section> */}

      {/* <section id="pricing" className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Гнучкі тарифи для бізнесу будь-якого масштабу
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Безкоштовний</h3>
              <p className="text-2xl mb-2">0 грн/міс</p>
              <p>1 проект, базові функції</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Базовий</h3>
              <p className="text-2xl mb-2">299 грн/міс</p>
              <p>До 5 проектів, PDF, AI</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Бізнес</h3>
              <p className="text-2xl mb-2">999 грн/міс</p>
              <p>Команди, інтеграції, підтримка</p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Оформити підписку
          </Button>
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Довіра користувачів
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="mb-2">&quot;Створив фінмодель за 30 хвилин&quot;</p>
              <p className="font-bold">Олександр, фермер</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="mb-2">&quot;P&L як ніколи зрозумілий&quot;</p>
              <p className="font-bold">Ірина, Львів</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="mb-2">&quot;AI підказав змінити ідею&quot;</p>
              <p className="font-bold">Дмитро, Київ</p>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Security Section */}
      {/* <section className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Безпека та підтримка
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🔐 2FA-аутентифікація</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🔒 HTTPS шифрування</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>👨‍💻 Підтримка 24/7</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p>📚 FAQ та довідник</p>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Почніть користуватись Lichylka вже сьогодні
        </h2>
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-full space-y-4 mb-4">
            <Input type="email" placeholder="Email" className="w-full" />
            <Input type="password" placeholder="Пароль" className="w-full" />
            <Button className="w-full" size="lg" variant={"outline"}>
              Зареєструватися безкоштовно
            </Button>
          </div>
          <p className="my-2">Або:</p>
          <Button
            className="w-full bg-[#db4437] hover:bg-[#c53929] mb-2"
            size="lg"
          >
            Зареєструватись через Google
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <ul className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <li>
              <Link href="#" className="hover:text-gray-300">
                Проєкт
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                Підтримка
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                Політика конфіденційності
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                Умови
              </Link>
            </li>
          </ul>
          <div className="flex gap-4 text-xl">
            <Link href="#" aria-label="Facebook">
              <i className="fa fa-facebook"></i>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </Link>
            <Link href="#" aria-label="Telegram">
              <i className="fa fa-telegram"></i>
            </Link>
          </div>
        </div>
        <p className="text-center mt-6">© 2025 Lichylka – лічи тут</p>
      </footer>
    </div>
  );
}
