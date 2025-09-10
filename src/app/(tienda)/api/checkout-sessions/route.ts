import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "@/types";

// 1. Lee la clave secreta de las variables de entorno.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(request: Request) {
  // 2. Barrera de seguridad: Verifica que la clave exista ANTES de usarla.
  if (!stripeSecretKey) {
    console.error(
      "Error Crítico: La variable de entorno STRIPE_SECRET_KEY no está definida."
    );
    return new NextResponse("Error de configuración de pagos del servidor.", {
      status: 500,
    });
  }

  try {
    // 3. Inicializa Stripe aquí, de forma segura.
    const stripe = new Stripe(stripeSecretKey);
    const { items }: { items: (Product & { quantity: number })[] } =
      await request.json();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const success_url = `${process.env.NEXT_PUBLIC_SITE_URL}/orden-confirmada?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url,
      cancel_url,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating Stripe Checkout session:", error.message);
    } else {
      console.error("Error creating Stripe Checkout session:", error);
    }
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
