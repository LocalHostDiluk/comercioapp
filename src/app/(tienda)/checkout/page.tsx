"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(10, "El nombre debe tener al menos 10 caracteres."), // <-- CORREGIDO
  phone: z.string().min(10, "El teléfono debe tener 10 dígitos."),
  paymentMethod: z.enum(["card", "pickup"], {
    message: "Debes seleccionar un método de pago.",
  }),
});

export default function CheckoutPage() {
  const { items } = useCartStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "" },
  });

  useEffect(() => {
    if (isMounted && items.length === 0) {
      router.push("/");
    }
  }, [isMounted, items, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    localStorage.setItem(
      "pendingOrder",
      JSON.stringify({
        customer: { name: values.name, phone: values.phone },
        items: items,
        total: total,
        paymentMethod: values.paymentMethod,
      })
    );

    if (values.paymentMethod === "pickup") {
      // CORRECCIÓN: Eliminamos la llamada a la API de aquí.
      // Ahora solo redirigimos, igual que con Stripe.
      router.push("/orden-confirmada");
    } else if (values.paymentMethod === "card") {
      const response = await fetch("/api/checkout-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        alert("Hubo un error al preparar el pago. Intenta de nuevo.");
        localStorage.removeItem("pendingOrder");
        setIsLoading(false);
        return;
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    }
  }

  if (!isMounted || items.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre y apellido</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Pago</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="card" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pagar con Tarjeta
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="pickup" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pagar al Recoger
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                {isLoading
                  ? "Procesando..."
                  : `Continuar con el Pedido ($${total.toFixed(2)})`}
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
          <div className="space-y-4 border p-4 rounded-lg">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
