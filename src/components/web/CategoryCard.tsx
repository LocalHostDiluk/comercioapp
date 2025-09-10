// components/custom/CategoryCard.tsx
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={`/menu/${category.slug}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      {/* Superposición oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {/* Contenido */}
      <div className="relative flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold text-white drop-shadow-md">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};
