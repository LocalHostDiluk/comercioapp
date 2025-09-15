// src/app/(admin)/admin/productos/page.tsx

import { getCategories } from "@/lib/data/categories";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddProductDialog } from "@/components/admin/products/add-product-dialog";

// Componente para mostrar la lista de categorías
async function CategoryList() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No has creado ninguna categoría todavía.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/admin/productos/${category.slug}`}
          className="group"
        >
          <Card className="transition-all duration-200 ease-in-out group-hover:border-primary group-hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>Ver productos</CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// Componente Skeleton para la carga
function CategoryListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-[98px] w-full" />
      ))}
    </div>
  );
}

export default async function AdminProductsPage() {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Selecciona una categoría para ver sus productos.
          </p>
        </div>
        <AddProductDialog categories={categories} />
      </div>

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}
