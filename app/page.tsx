import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-gray-900 text-white py-4 px-8">
        <nav className="flex justify-between items-center">
          <div className="font-bold">FinPlan</div>
          <ul className="hidden md:flex gap-4">
            <li><Link href="#" className="hover:text-gray-300">Головна</Link></li>
            <li><Link href="#features" className="hover:text-gray-300">Можливості</Link></li>
            <li><Link href="#pricing" className="hover:text-gray-300">Тарифи</Link></li>
            <li><Link href="#about" className="hover:text-gray-300">Про нас</Link></li>
            <li><Link href="#contact" className="hover:text-gray-300">Контакти</Link></li>
          </ul>
          <div className="flex gap-2">
            <Button variant="default" asChild>
              <Link href="#login">Увійти</Link>
            </Button>
            <Button variant="default" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="#register">Зареєструватися</Link>
            </Button>
          </div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Фінансове планування вашого бізнесу — просто як ніколи</h1>
        <p className="text-lg mb-6">Автоматизуйте облік доходів, витрат, інвестицій та звітності</p>
        <Button size="lg">Спробувати безкоштовно</Button>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Що ви отримаєте</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
          <Card>
            <CardContent className="pt-6 text-center">
              <p>📑 Бізнес-план – оцінка ефективності</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* AI Section */}
      <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Зробіть бізнес-план за допомогою штучного інтелекту</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
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
          <Card>
            <CardContent className="pt-6 text-center">
              <p>🌐 UA / EN / PL підтримка</p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button size="lg">Спробувати AI-планувальник</Button>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Гнучкі тарифи для бізнесу будь-якого масштабу</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Free</h3>
              <p className="text-2xl mb-2">0 грн/міс</p>
              <p>1 проект, базові функції</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Pro</h3>
              <p className="text-2xl mb-2">299 грн/міс</p>
              <p>До 5 проектів, PDF, AI</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-bold text-xl mb-2">Business</h3>
              <p className="text-2xl mb-2">999 грн/міс</p>
              <p>Команди, інтеграції, підтримка</p>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button size="lg">Оформити підписку</Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Довіра користувачів</h2>
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
      </section>
      
      {/* Security Section */}
      <section className="py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Безпека та підтримка</h2>
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
      </section>
      
      {/* CTA Section */}
      <section className="py-12 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">Почніть користуватись FinPlan вже сьогодні</h2>
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-full space-y-4 mb-4">
            <Input type="email" placeholder="Email" className="w-full" />
            <Input type="password" placeholder="Пароль" className="w-full" />
            <Button className="w-full" size="lg">Зареєструватися безкоштовно</Button>
          </div>
          <p className="my-2">Або:</p>
          <Button className="w-full bg-[#db4437] hover:bg-[#c53929] mb-2" size="lg">
            Зареєструватись через Google
          </Button>
          <Button className="w-full bg-[#0077b5] hover:bg-[#005885]" size="lg">
            Зареєструватись через LinkedIn
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <ul className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <li><Link href="#" className="hover:text-gray-300">Проєкт</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Підтримка</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Політика конфіденційності</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Умови</Link></li>
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
        <p className="text-center mt-6">© 2025 FinPlan / Counter – лічи тут</p>
      </footer>
    </div>
  );
}
