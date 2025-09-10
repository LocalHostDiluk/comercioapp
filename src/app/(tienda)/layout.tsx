// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/web/Navbar";
import { Footer } from "@/components/web/Footer";
import { getCategories } from "@/lib/data/categories";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mi Taquería Deliciosa",
  description: "Los mejores platillos mexicanos, directo a tu casa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar categories={categories} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
