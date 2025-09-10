// lib/data.ts
import {
  collection,
  getDocs,
  query as firestoreQuery,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "@/types";

export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    ); // Aseguramos el tipo de dato

    return products;
  } catch (error) {
    console.error("Error fetching active products:", error);
    // En una app real, podrías registrar este error en un servicio externo
    return [];
  }
};

export const getProductsByCategory = async (
  categorySlug: string
): Promise<Product[]> => {
  try {
    const productsCollectionRef = collection(db, "products");

    const q = firestoreQuery(
      productsCollectionRef,
      where("isActive", "==", true),
      where("category", "==", categorySlug)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );

    return products;
  } catch (error) {
    console.error(
      `Error fetching products for category ${categorySlug}:`,
      error
    );
    return [];
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const productsCollectionRef = collection(db, "products");
    // Consulta con dos condiciones: activo Y destacado
    const q = query(
      productsCollectionRef,
      where("isActive", "==", true),
      where("isFeatured", "==", true)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );

    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!query) return [];

  // Convertimos el string de búsqueda en un array de keywords en minúsculas
  const keywords = query
    .toLowerCase()
    .split(" ")
    .filter((k) => k);

  try {
    const productsCollectionRef = collection(db, "products");
    // Buscamos documentos cuyo array 'searchKeywords' contenga CUALQUIERA de nuestras keywords
    const q = firestoreQuery(
      productsCollectionRef,
      where("searchKeywords", "array-contains-any", keywords)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return [];

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );

    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // Creamos una referencia directa al documento del producto usando su ID
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      // Si el documento existe, devolvemos sus datos junto con el ID
      return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
      // Si no se encuentra el producto, devolvemos null
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsCollectionRef = collection(db, "products");
    const querySnapshot = await getDocs(productsCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }

    const products: Product[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );

    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
