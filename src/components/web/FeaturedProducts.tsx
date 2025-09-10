// components/custom/FeaturedProducts.tsx
import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "./ProductCard";

export const FeaturedProducts = async () => {
  const featuredProducts = await getFeaturedProducts();

  if (featuredProducts.length === 0) {
    return null; // No mostrar nada si no hay productos destacados
  }

  return (
    <section className="container mx-auto py-12 md:py-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Nuestros Platillos Estrella ⭐
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
