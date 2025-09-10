import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { orderSchema } from "@/lib/validations/orderSchema";

const ENCRYPTION_KEY = process.env.ORDER_ENCRYPTION_KEY;
const IV_LENGTH = 16;

function encrypt(text: string, key: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export async function POST(request: Request) {
  // --- BARRERA DE SEGURIDAD ---
  if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
    console.error(
      "Error Crítico: La variable de entorno ORDER_ENCRYPTION_KEY no está configurada correctamente."
    );
    return new NextResponse("Error de configuración del servidor.", {
      status: 500,
    });
  }
  // --- FIN DE LA BARRERA ---

  try {
    const body = await request.json();
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({ error: validation.error.format() }),
        { status: 400 }
      );
    }

    const { customer, items, total, paymentMethod } = validation.data;

    const encryptedCustomer = {
      name: customer.name,
      phone: encrypt(customer.phone, ENCRYPTION_KEY),
    };

    const orderData = {
      customer: encryptedCustomer,
      items,
      total,
      paymentMethod,
      status: paymentMethod === "card" ? "Pagado" : "Pendiente de Pago",
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    return NextResponse.json({ success: true, orderId: docRef.id });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al crear la orden:", error.message);
    } else {
      console.error("Error al crear la orden:", error);
    }
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
