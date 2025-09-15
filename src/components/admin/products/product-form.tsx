"use client";

import React, { useState } from "react";
import {
  ProductFormValues,
  productSchema,
  ProductFormData,
} from "@/lib/validations/productSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Category } from "@/types";
import { toast } from "sonner";

interface ProductFormProps {
  categories: Category[];
  onSubmit: (values: ProductFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<ProductFormValues>;
}

type FormErrors = { [key: string]: string | undefined };

export function ProductForm({
  categories,
  onSubmit,
  isLoading,
  defaultValues,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isActive: true,
    isFeatured: false,
    imageUrl: "",
    searchKeywords: "",
    ...defaultValues,
    searchKeywords: Array.isArray(defaultValues?.searchKeywords)
      ? defaultValues.searchKeywords.join(", ")
      : defaultValues?.searchKeywords || "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast.error("La imagen es muy grande. Elige una de menos de 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value, // 👈 aseguramos número
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // ✅ Validación con Zod
    const validation = productSchema.safeParse(formData);

    if (!validation.success) {
      const zodErrors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        zodErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(zodErrors);
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    // ✅ Mandamos datos ya transformados (keywords como array, price como number)
    onSubmit(validation.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Imagen */}
      <div className="space-y-2">
        <Label htmlFor="image">Imagen del producto</Label>
        <Input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        {formData.imageUrl && (
          <div className="mt-2">
            <img
              src={formData.imageUrl}
              alt="Vista previa"
              className="h-20 w-20 rounded-md object-cover"
            />
          </div>
        )}
        {errors.imageUrl && (
          <p className="text-sm text-destructive">{errors.imageUrl}</p>
        )}
      </div>

      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del producto</Label>
        <Input
          id="name"
          name="name"
          placeholder="Tacos al pastor"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Deliciosos tacos con piña y cilantro..."
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <Label htmlFor="price">Precio (MXN)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.50"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price}</p>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category}</p>
        )}
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="searchKeywords">
          Palabras Clave (separadas por coma)
        </Label>
        <Input
          id="searchKeywords"
          name="searchKeywords"
          placeholder="taco, pastor, carne, piña..."
          value={formData.searchKeywords}
          onChange={handleChange}
        />
        {errors.searchKeywords && (
          <p className="text-sm text-destructive">{errors.searchKeywords}</p>
        )}
      </div>

      {/* Switches */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isActive: checked }))
            }
          />
          <Label htmlFor="isActive">Activo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isFeatured: checked }))
            }
          />
          <Label htmlFor="isFeatured">Destacado</Label>
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Guardando..." : "Guardar Producto"}
      </Button>
    </form>
  );
}
