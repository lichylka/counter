"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathnameNext = usePathname();
  const [path, setPath] = useState("");
  useEffect(() => setPath(pathnameNext), [pathnameNext]);

  return (
    <header className="bg-gray-900 text-white py-4 px-8">
      <nav className="flex justify-between items-center">
        <div className="font-bold">
          <Link href="/" className="hover:text-gray-300">
            Lichylka
          </Link>
        </div>
        {/* <ul className="hidden md:flex gap-4">
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
        </ul> */}
        {path == "/" ? (
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
        ) : null}
      </nav>
    </header>
  );
}

export default Header;
