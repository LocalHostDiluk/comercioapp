// app/menu/[slug]/page.tsx
import { Suspense } from "react";
import { ProductCard } from "@/components/web/ProductCard";
import { getProductsByCategory } from "@/lib/data/products";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";

// 1. La definición de tipos correcta para las props de la página.
type CategoryPageProps = {
  params: { slug: string };
};

// Componente que carga y muestra la lista de productos.
async function ProductList({ slug }: { slug: string }) {
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <p className="col-span-full text-center">
        No hay productos disponibles en esta categoría.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Componente para el esqueleto de carga.
function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// 2. La firma de la función de la página que recibe 'params' correctamente.
export default async function CategoryPage({ params }: CategoryPageProps) {
  // 3. Ahora que 'params' ha sido recibido oficialmente, podemos usarlo.
  const { slug } = params;
  const title =
    decodeURIComponent(slug).charAt(0).toUpperCase() +
    decodeURIComponent(slug).slice(1);

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-2">
        Nuestro Menú de <span className="text-orange-500">{title}</span>
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-8">
        Disfruta de nuestra selección especial de {title.toLowerCase()}.
      </p>

      <Suspense key={slug} fallback={<ProductListSkeleton />}>
        <ProductList slug={slug} />
      </Suspense>
    </main>
  );
}
