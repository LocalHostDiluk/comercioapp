// components/skeletons/ProductCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Esqueleto de la Imagen */}
      <Skeleton className="h-48 w-full" />

      {/* Esqueleto del Contenido */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-7 w-1/4" />
        </div>
        <Skeleton className="h-4 w-1/3 pt-2" />
      </CardHeader>

      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>

      {/* Esqueleto del Pie de la Tarjeta */}
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};
