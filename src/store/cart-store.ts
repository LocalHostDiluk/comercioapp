// store/cart-store.ts
import { create } from "zustand";
import { Product } from "@/types";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

// Definimos la forma de un item en el carrito (producto + cantidad)
interface CartItem extends Product {
  quantity: number;
}

// Definimos la forma del estado de nuestro store
interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  decreaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

// Creamos el hook/store con Zustand
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addProduct: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return { items: updatedItems };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        });
        toast.success(`"${product.name}" añadido al carrito.`);
      },
      decreaseProductQuantity: (productId) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === productId
          );
          if (existingItem?.quantity === 1) {
            return {
              items: state.items.filter((item) => item.id !== productId),
            };
          }
          const updatedItems = state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          toast.info(`Cantidad de "${existingItem?.name}" actualizada.`);
          return { items: updatedItems };
        }),
      removeProduct: (productId) =>
        set((state) => {
          const removedItem = state.items.find((item) => item.id === productId);
          toast.error(
            `"${removedItem?.name ?? "Producto"}" eliminado del carrito.`
          );
          return {
            items: state.items.filter((item) => item.id !== productId),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Dale un nombre a la clave en localStorage
    }
  )
);
