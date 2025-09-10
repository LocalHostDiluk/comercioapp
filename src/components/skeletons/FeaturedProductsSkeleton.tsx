// components/skeletons/FeaturedProductsSkeleton.tsx
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const FeaturedProductsSkeleton = () => {
  return (
    <section className="container mx-auto py-12 md:py-20">
      <h2 className="text-3xl font-bold text-center mb-8">
        Nuestros Platillos Estrella ⭐
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};
