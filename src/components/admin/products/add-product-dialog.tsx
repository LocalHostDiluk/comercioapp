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
      // La URL de la API ahora es más limpia
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // --- ¡AQUÍ ESTÁ LA MAGIA! ---
      if (!response.ok) {
        // Si la respuesta no es OK, intentamos leer el cuerpo del error
        const errorData = await response.json();
        // Creamos un mensaje de error detallado a partir de los errores de Zod
        const errorMessage =
          errorData.errors
            ?.map((err: any) => `${err.path.join(".")} - ${err.message}`)
            .join("\n") || "Algo salió mal al crear el producto.";
        throw new Error(errorMessage);
      }

      toast.success("¡Producto añadido con éxito!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      // Mostramos el mensaje de error detallado que construimos
      toast.error("Error al añadir producto", {
        description:
          error instanceof Error ? error.message : "Intenta de nuevo.",
      });
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
