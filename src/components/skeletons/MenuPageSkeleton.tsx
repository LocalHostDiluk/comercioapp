// components/skeletons/MenuPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const MenuPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="aspect-video w-full rounded-lg" />
      ))}
    </div>
  );
};
