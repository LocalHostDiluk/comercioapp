// components/custom/ProductCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addProduct } = useCartStore();

  return (
    <motion.div
      className="flex flex-col h-full"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/producto/${product.id}`}
        className="flex flex-col flex-grow"
      >
        <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg">
          {/* Sección de la Imagen */}
          <div className="relative w-full h-48">
            <Image
              src={product.imageUrl}
              alt={`Imagen de ${product.name}`}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Contenido de la tarjeta */}
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{product.name}</CardTitle>
              {/* Asumimos que tenemos un badge para el precio */}
              <Badge variant="default" className="text-lg">
                ${product.price.toFixed(2)}
              </Badge>
            </div>
            <CardDescription className="pt-2">
              {product.category}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <p className="text-sm text-gray-600">{product.description}</p>
          </CardContent>
        </Card>
      </Link>

      {/* Pie de la tarjeta */}
      <CardFooter className="pt-4">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault(); // Previene que el Link se active
            addProduct(product);
          }}
        >
          Agregar al Carrito
        </Button>
      </CardFooter>
    </motion.div>
  );
};
