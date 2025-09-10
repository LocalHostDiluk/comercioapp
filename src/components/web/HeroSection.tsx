// components/custom/HeroSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-white">
      {/* Fondo con superposición oscura para legibilidad */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-background.jpg')" }} // Asegúrate de tener una imagen en /public/hero-background.jpg
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
          El Auténtico Sabor de México
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow">
          Platillos preparados con la tradición y el corazón de nuestra tierra,
          listos para llegar a tu mesa.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/menu">Ver el Menú Ahora</Link>
        </Button>
      </div>
    </section>
  );
};
