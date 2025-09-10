// app/search/page.tsx
import { Suspense } from "react";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/web/ProductCard";
import { SearchResultsSkeleton } from "@/components/skeletons/SearchResultsSkeleton"; // 1. Importa el nuevo esqueleto

type SearchPageProps = {
  searchParams: { q: string };
};

// Componente asíncrono que hace la búsqueda real
async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query);

  return (
    <>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-muted-foreground">
          No se encontraron resultados para{" "}
          <span className="font-semibold">{query}</span>. Intenta con otra
          búsqueda.
        </p>
      )}
    </>
  );
}

// Página principal que usa Suspense
export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Resultados para: <span className="text-orange-500">{query}</span>
      </h1>

      {/* 2. Envuelve los resultados en Suspense con el fallback a nuestro esqueleto */}
      <Suspense key={query} fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </main>
  );
}
