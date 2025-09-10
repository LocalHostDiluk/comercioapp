// components/skeletons/SearchResultsSkeleton.tsx
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export const SearchResultsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {/* Mostramos 8 esqueletos como placeholder */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};
