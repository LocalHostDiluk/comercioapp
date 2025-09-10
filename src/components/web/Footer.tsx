// components/custom/Footer.tsx
import Link from "next/link";
import { Instagram, Facebook, Tally2 } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-neutral-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-8">
        {/* --- INICIO: Layout para Escritorio (Oculto en móvil) --- */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Logo y Descripción */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl text-white mb-4">
              🌮 Mi Taquería
            </h3>
            <p className="text-neutral-400 text-sm">
              El auténtico sabor de México, directo a tu mesa.
            </p>
          </div>
          {/* Columna 2: Navegación */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-neutral-200 mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/menu/tacos"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Menú
                </Link>
              </li>
            </ul>
          </div>
          {/* Columna 3: Contacto y Horarios */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-neutral-200 mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-neutral-400">📍 Calle Ficticia 123</li>
              <li className="text-neutral-400">📞 (555) 123-4567</li>
              <li className="text-neutral-400">⏰ Mar-Dom: 12pm - 10pm</li>
            </ul>
          </div>
          {/* Columna 4: Redes Sociales */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold text-neutral-200 mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Tally2 size={24} />
              </a>
            </div>
          </div>
        </div>
        {/* --- FIN: Layout para Escritorio --- */}

        {/* --- INICIO: Layout para Móvil (Oculto en escritorio) --- */}
        <div className="block md:hidden text-center mb-10">
          <h3 className="font-bold text-xl text-white mb-4">🌮 Mi Taquería</h3>
          <nav className="flex justify-center gap-x-6 mb-6">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/menu/tacos"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Menú
            </Link>
          </nav>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Tally2 size={24} />
            </a>
          </div>
        </div>
        {/* --- FIN: Layout para Móvil --- */}

        {/* --- Barra Inferior con Copyright (Compartida) --- */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-neutral-400 text-sm">
            © {currentYear} Mi Taquería. Todos los derechos reservados.
          </p>
          <p className="mt-4 sm:mt-0 text-sm text-neutral-500">
            Diseñado con ❤️ en Durango.
          </p>
        </div>
      </div>
    </footer>
  );
};
