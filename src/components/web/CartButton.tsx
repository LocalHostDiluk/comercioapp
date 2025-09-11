// components/custom/CartButton.tsx
"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export const CartButton = () => {
  const { items } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculamos el número total de artículos en el carrito
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  if (!isMounted) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <Link href="/cart" className="relative">
      <Button variant="outline" className="cursor-pointer" size="icon">
        <ShoppingCart className="h-4 w-4" />
      </Button>
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-1 text-xs"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  );
};
