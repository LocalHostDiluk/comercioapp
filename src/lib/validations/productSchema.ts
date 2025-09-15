// src/lib/validations/productSchema.ts
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres."),
  // aceptamos strings numéricos y los convertimos a number
  price: z.coerce
    .number()
    .refine((val) => val !== undefined && val !== null && !Number.isNaN(val), {
      message: "El precio es requerido y debe ser un número válido.",
    })
    .positive("El precio debe ser mayor que cero."),
  category: z.string().min(1, "Debes seleccionar una categoría."),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  // permitimos dataURLs o URLs cortas (para el preview desde file reader)
  imageUrl: z.string().min(1, "La imagen es requerida."),

  // Input en el formulario: string ("tacos, carne") -> transform -> string[]
  searchKeywords: z
    .string()
    .min(1, "Añade al menos una palabra clave.")
    .transform((val) =>
      val
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
    )
    .refine((arr) => Array.isArray(arr) && arr.length > 0, {
      message: "Debe haber al menos una palabra clave.",
    }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// Tipo para usar en el formulario (antes de la transformación de searchKeywords)
export type ProductFormData = Omit<ProductFormValues, "searchKeywords"> & {
  searchKeywords: string;
};