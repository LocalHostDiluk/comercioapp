// components/custom/Navbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./MobileNav";
import { CartButton } from "./CartButton";
import { Category } from "@/types";
import { SearchInput } from "./SearchInput";

interface NavbarProps {
  categories: Category[];
}

export const Navbar = ({ categories }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">🌮 Mi Taquería</span>
          </Link>
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {/* --- INICIO DE LA CORRECCIÓN --- */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/">Inicio</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/menu">Menú</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* --- FIN DE LA CORRECCIÓN --- */}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SearchInput />
          <CartButton/>
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
};
