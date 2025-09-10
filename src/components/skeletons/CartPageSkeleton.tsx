// components/skeletons/CartPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const CartPageSkeleton = () => (
  <div className="container mx-auto py-12">
    <Skeleton className="h-10 w-1/3 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {/* Esqueleto de un item del carrito */}
        <div className="flex items-center justify-between border p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        {/* Esqueleto de otro item del carrito */}
        <div className="flex items-center justify-between border p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="border p-6 rounded-lg space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    </div>
  </div>
);
