// app/api/products/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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
