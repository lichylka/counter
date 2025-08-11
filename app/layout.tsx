import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "../components/ConvexProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Counter – Фінансове планування",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ConvexClientProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
