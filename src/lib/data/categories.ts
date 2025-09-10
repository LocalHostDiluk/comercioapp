// lib/data/categories.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesCollectionRef = collection(db, "categories");
    const querySnapshot = await getDocs(categoriesCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }

    const categories: Category[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Category)
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
