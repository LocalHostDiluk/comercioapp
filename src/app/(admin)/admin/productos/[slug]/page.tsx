// src/app/(admin)/admin/productos/[slug]/page.tsx

// 1. Importa los componentes necesarios
import { getCategories } from "@/lib/data/categories";
import { getAdminProductsByCategory } from "@/lib/data/products";
import { columns } from "@/components/admin/products/columns";
import { DataTable } from "@/components/admin/products/data-table";
import { AddProductDialog } from "@/components/admin/products/add-product-dialog"; // <-- NUEVA IMPORTACIÓN

type ProductsByCategoryPageProps = {
  params: { slug: string };
};

export default async function ProductsByCategoryPage({
  params,
}: ProductsByCategoryPageProps) {
  const categoryName = decodeURIComponent(params.slug);
  const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  // 2. Obtenemos tanto los productos como las categorías
  const products = await getAdminProductsByCategory(params.slug);
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Productos en: {title}</h1>
          <p className="text-muted-foreground">
            Gestiona los productos de esta categoría.
          </p>
        </div>
        {/* 3. Reemplazamos el <Button> por nuestro nuevo componente de diálogo */}
        <AddProductDialog categories={categories} categorySlug={params.slug} />
      </div>

      <DataTable columns={columns} data={products} />
    </div>
  );
}
