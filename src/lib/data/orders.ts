import { db } from "@/lib/firebase"; // o tu cliente de Firestore/Mongo
import { collection, getDocs } from "firebase/firestore"; // si usas Firestore
import { Order } from "@/types";

export async function getAllOrders(): Promise<Order[]> {
  const snapshot = await getDocs(collection(db, "orders"));

  const orders: Order[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      // 🔑 Normalizamos createdAt
      createdAt: data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : new Date(data.createdAt.seconds * 1000).toISOString(),
      // 🔑 Normalizamos customer (por si viene con métodos internos)
      customer: data.customer ? { ...data.customer } : null,
    } as Order;
  });

  return orders;
}
