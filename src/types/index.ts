// types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Category {
  id: string; 
  name: string;
  slug: string;
  description: string;
  imageUrl: string; 
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  paymentMethod: "card" | "pickup";
  status: "Pagado" | "Pendiente de Pago" | "Entregado" | "Cancelado";
  createdAt: Date; // O un tipo más específico de Firestore Timestamp
}