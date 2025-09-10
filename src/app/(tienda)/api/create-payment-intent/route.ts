// app/api/create-payment-intent/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

// 1. Inicializamos el cliente de Stripe con nuestra clave secreta
// Asegúrate de que la variable de entorno STRIPE_SECRET_KEY esté en tu .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil", // Usa la última versión de la API de Stripe
});

// Tipado para los productos que esperamos recibir del frontend
interface ProductItem {
  name: string;
  price: number;
  quantity: number;
}

// 2. Creamos el manejador para las peticiones POST
export async function POST(request: Request) {
  try {
    const { items }: { items: ProductItem[] } = await request.json();

    // 3. Calculamos el monto total en el servidor para evitar manipulaciones
    // Stripe requiere que el monto esté en la unidad monetaria más pequeña (centavos)
    const totalInCents = Math.round(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100
    );

    // 4. Creamos el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalInCents,
      currency: "mxn", // Moneda mexicana
      automatic_payment_methods: {
        enabled: true, // Stripe decidirá los mejores métodos de pago
      },
      // Opcional: añade metadatos para identificar el pedido en tu dashboard de Stripe
      metadata: {
        orderItems: JSON.stringify(
          items.map((item) => `${item.name} (x${item.quantity})`)
        ),
      },
    });

    // 5. Devolvemos el 'client_secret' al frontend
    // Este secreto es lo que autoriza al frontend a confirmar el pago
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error("Error creating PaymentIntent:", error);
    // Devolvemos un error claro al frontend
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return new NextResponse(`Error interno del servidor: ${errorMessage}`, {
      status: 500,
    });
  }
}
