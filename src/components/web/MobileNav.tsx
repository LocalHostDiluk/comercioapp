// components/custom/MobileNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Instagram,
  Facebook,
  Tally2,
  Home,
  Utensils,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/types";

interface MobileNavProps {
  // Ya no necesitamos las categorías aquí, pero lo mantenemos por si lo usas en otro lado
  categories: Category[];
}

export const MobileNav = ({ categories }: MobileNavProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  // Simplificamos los enlaces
  const navLinks = [
    { href: "/", label: "Inicio", icon: <Home className="h-5 w-5" /> },
    { href: "/menu", label: "Menú", icon: <Utensils className="h-5 w-5" /> },
  ];

  return (
    <div className="flex md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader className="text-left">
            <SheetTitle>
              <Link href="/" onClick={() => setSheetOpen(false)}>
                🌮 Mi Taquería
              </Link>
            </SheetTitle>
            <SheetDescription>El auténtico sabor de México.</SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />
          <div className="flex-1">
            <nav className="grid gap-2 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === link.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <Separator className="my-4" />
          <Button
            asChild
            size="lg"
            className="w-full"
            onClick={() => setSheetOpen(false)}
          >
            <Link href="/menu">Ordenar Ahora</Link>
          </Button>
          <div className="mt-auto pt-6">
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Tally2 size={24} />
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
