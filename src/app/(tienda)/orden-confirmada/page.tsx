"use client";

import { useEffect, useState, Suspense, useRef } from "react"; // 1. Importa useRef
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrderConfirmationContent = () => {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Finalizando tu orden...");

  // 2. Creamos nuestra "nota adhesiva" (el lock) para evitar ejecuciones duplicadas.
  const processingRef = useRef(false);

  useEffect(() => {
    const processOrder = async () => {
      // 3. Si ya estamos procesando, no hacemos nada más.
      if (processingRef.current) {
        return;
      }
      // Ponemos la nota "OCUPADO"
      processingRef.current = true;

      const pendingOrderData = localStorage.getItem("pendingOrder");

      if (!pendingOrderData) {
        setStatus("success");
        setMessage("Bienvenido a la página de confirmación.");
        return;
      }

      const pendingOrder = JSON.parse(pendingOrderData);

      if (
        pendingOrder.paymentMethod === "card" &&
        !searchParams.get("session_id")
      ) {
        setStatus("error");
        setMessage("El pago con tarjeta fue cancelado o falló.");
        localStorage.removeItem("pendingOrder");
        return;
      }

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pendingOrder),
        });

        if (!response.ok)
          throw new Error("Error al guardar la orden en la base de datos");

        setStatus("success");
        setMessage("¡Hemos recibido tu orden y la estamos preparando!");
        clearCart();
        localStorage.removeItem("pendingOrder");
      } catch (error) {
        console.error("Fallo al procesar el pedido:", error);
        setStatus("error");
        setMessage(
          "Hubo un problema al registrar tu pedido. Por favor, contáctanos."
        );
      }
    };

    processOrder();
  }, [searchParams, clearCart]);

  if (status === "loading") {
    return (
      <>
        <Loader2 className="h-16 w-16 text-gray-400 animate-spin mb-4" />
        <h1 className="text-3xl font-bold mb-2">Procesando</h1>
        <p className="text-lg text-muted-foreground mb-8">{message}</p>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">¡Oops! Hubo un Error</h1>
        <p className="text-lg text-muted-foreground mb-8">{message}</p>
      </>
    );
  }

  return (
    <>
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">¡Gracias por tu pedido!</h1>
      <p className="text-lg text-muted-foreground mb-8">{message}</p>
    </>
  );
};

export default function OrderConfirmedPage() {
  return (
    <main className="container mx-auto py-12 flex flex-col items-center text-center">
      <Suspense
        fallback={<Loader2 className="h-16 w-16 text-gray-400 animate-spin" />}
      >
        <OrderConfirmationContent />
      </Suspense>
      <Button asChild className="mt-8">
        <Link href="/">Volver a la Página Principal</Link>
      </Button>
    </main>
  );
}
