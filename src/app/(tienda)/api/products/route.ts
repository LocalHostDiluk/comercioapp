// src/app/(tienda)/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { z } from "zod";
import { productApiSchema } from "@/lib/validations/productSchema";

// La función GET se mantiene igual, es correcta.
export async function GET() {
  try {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "No active products found" },
        { status: 404 }
      );
    }

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// --- NUEVA Y MEJORADA FUNCIÓN POST ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 2. Validamos contra el esquema de la API, que espera un array.
    const parsedData = productApiSchema.parse(body);

    const docRef = await addDoc(collection(db, "products"), parsedData);

    return NextResponse.json(
      { success: true, productId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
