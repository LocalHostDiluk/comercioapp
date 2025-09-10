// app/page.tsx
import { Suspense } from "react";
import { HeroSection } from "@/components/web/HeroSection";
import { FeaturedProducts } from "@/components/web/FeaturedProducts";
// 1. Importa el nuevo componente de esqueleto desde su archivo
import { FeaturedProductsSkeleton } from "@/components/skeletons/FeaturedProductsSkeleton";
import { HowItWorks } from "@/components/web/HowItWorks";
import { FadeInSection } from "@/components/web/FadeInSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* 2. La lógica de Suspense ahora es mucho más limpia */}
      <FadeInSection>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </FadeInSection>

      <FadeInSection>
        <HowItWorks />
      </FadeInSection>

      {/* Futuras secciones */}
    </div>
  );
}
