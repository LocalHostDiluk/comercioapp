// app/producto/[id]/page.tsx
import { getProductById } from "@/lib/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/web/AddToCartButton";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  // Si el producto no se encuentra en la base de datos, muestra una página 404
  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Columna de la Imagen */}
        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Columna de la Información */}
        <div className="flex flex-col h-full">
          <Badge variant="outline" className="w-fit mb-2">
            {product.category}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            {product.description}
          </p>

          <div className="mt-auto">
            <p className="text-4xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
