// app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CartPageSkeleton } from "@/components/skeletons/CartPageSkeleton";
import Link from "next/link";

export default function CartPage() {
  const { items, addProduct, removeProduct, decreaseProductQuantity } =
    useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!isMounted) {
    return <CartPageSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu Carrito está Vacío</h1>
        <p className="text-muted-foreground">
          Parece que aún no has agregado productos.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito de Compras</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border rounded-md p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => decreaseProductQuantity(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => addProduct(item)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeProduct(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mt-6">
              <Link href="/checkout">Proceder al Pago</Link>
            </Button>
          </div>  
        </div>
      </div>
    </div>
  );
}
