import { NextResponse } from "next/server";

export async function GET() {
  // Leemos todas las variables de entorno que nos interesan
  const encryptionKey = process.env.ORDER_ENCRYPTION_KEY;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // Devolvemos un JSON para poder verlo en el navegador
  return NextResponse.json({
    ORDER_ENCRYPTION_KEY: encryptionKey || "NO CARGADA",
    STRIPE_SECRET_KEY: stripeSecretKey ? "Cargada Correctamente" : "NO CARGADA", // No mostramos la clave secreta por seguridad
    NEXT_PUBLIC_SITE_URL: siteUrl || "NO CARGADA",
  });
}
