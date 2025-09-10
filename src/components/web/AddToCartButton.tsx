// components/custom/AddToCartButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addProduct } = useCartStore();

  return (
    <Button
      size="lg"
      className="w-full mt-6"
      onClick={() => addProduct(product)}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Agregar al Carrito
    </Button>
  );
};
