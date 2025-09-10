// app/menu/page.tsx
import { Suspense } from "react";
import { getCategories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/web/CategoryCard";
import { MenuPageSkeleton } from "@/components/skeletons/MenuPageSkeleton";

async function CategoriesList() {
  const categories = await getCategories();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

export default function MenuPage() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Nuestro Menú</h1>

      <Suspense fallback={<MenuPageSkeleton />}>
        <CategoriesList />
      </Suspense>
    </main>
  );
}
