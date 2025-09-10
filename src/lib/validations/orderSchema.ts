// lib/validations/orderSchema.ts
import * as z from "zod";

// Esquema para un solo item en el carrito
const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
});

// Esquema principal para la orden
export const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(10, "El nombre es requerido."),
    phone: z.string().min(10, "El teléfono es requerido."),
  }),
  items: z.array(cartItemSchema).nonempty("El carrito no puede estar vacío."),
  total: z.number().positive("El total debe ser un número positivo."),
  paymentMethod: z.enum(["card", "pickup"], {
    message: "Debes seleccionar un método de pago.",
  }),
});
