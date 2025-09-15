// src/components/admin/products/add-product-dialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { ProductForm } from "./product-form";
import { Category } from "@/types";
import { ProductFormValues } from "@/lib/validations/productSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddProductDialogProps {
  categories: Category[];
  categorySlug?: string;
}

export function AddProductDialog({
  categories,
  categorySlug,
}: AddProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          searchKeywords: values.searchKeywords, // ✅ ya es string[]
        }),
      });

      if (!response.ok) {
        throw new Error("Algo salió mal al crear el producto.");
      }

      toast.success("¡Producto añadido con éxito!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo añadir el producto. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          <DialogDescription>
            Rellena los campos para añadir un nuevo platillo a tu menú.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          categories={categories}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          defaultValues={{ category: categorySlug }}
        />
      </DialogContent>
    </Dialog>
  );
}
