import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { productSchema } from "@/lib/validations/productSchema";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ Validamos con el schema (transforma keywords a array)
    const parsedData = productSchema.parse(body);

    // ✅ Guardamos en Firestore
    const docRef = await addDoc(collection(db, "products"), parsedData);

    return NextResponse.json(
      { success: true, productId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    if (typeof error === "object" && error !== null && "issues" in error) {
      return new NextResponse(
        JSON.stringify((error as { issues: unknown }).issues),
        { status: 400 }
      );
    }

    console.error("Error creating product:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}
