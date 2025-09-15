// src/lib/validations/productSchema.ts
import { z } from "zod";

// 1. ESQUEMA BASE: Define la forma final de nuestros datos en la DB y API.
//    Aquí, `searchKeywords` ya es un array de strings.
export const productApiSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  description: z.string().min(10, { message: "La descripción es muy corta." }),
  price: z.coerce
    .number({ message: "El precio debe ser un número." })
    .positive({ message: "El precio debe ser mayor a cero." }),
  category: z.string().min(1, { message: "Debes seleccionar una categoría." }),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  imageUrl: z
    .string()
    .url({ message: "Por favor, introduce una URL válida." })
    .optional()
    .or(z.literal("")),
  searchKeywords: z
    .array(z.string())
    .min(1, { message: "Añade al menos una palabra clave." }),
});

// 2. ESQUEMA PARA EL FORMULARIO: Extiende el esquema base y sobreescribe
//    el campo 'searchKeywords' para que acepte un string y lo transforme.
export const productFormSchema = productApiSchema.extend({
  searchKeywords: z
    .string()
    .min(1, { message: "Añade al menos una palabra clave." })
    .transform((val) =>
      val
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean)
    )
    .refine((arr) => arr.length > 0, {
      message: "Debe haber al menos una palabra clave válida.",
    }),
});

// --- TIPOS ---
// Para el estado interno y los valores por defecto del formulario.
export type ProductFormInput = z.input<typeof productFormSchema>;
// Para los datos ya validados y transformados que se envían desde el formulario.
export type ProductFormValues = z.infer<typeof productFormSchema>;
