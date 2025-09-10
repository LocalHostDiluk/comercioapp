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
