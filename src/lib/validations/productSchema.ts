// src/lib/validations/productSchema.ts
import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres."),
  price: z.coerce // Usamos coerce para convertir el string del input a número
    .number({ message: "El precio debe ser un número." })
    .positive("El precio debe ser mayor que cero."),
  category: z.string().min(1, "Debes seleccionar una categoría."),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  // La imagen la manejaremos por separado, por ahora no está en el schema
});

export type ProductFormValues = z.infer<typeof productSchema>;
