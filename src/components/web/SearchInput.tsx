// components/custom/SearchInput.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SearchForm = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Buscar platillos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 bg-background"
      />
    </form>
  );
};

export const SearchInput = () => {
  const router = useRouter();
  const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (term: string) => {
    router.push(`/search?q=${term}`);
    setMobileSearchOpen(false); // Cierra el diálogo en móvil después de buscar
  };

  return (
    <>
      {/* Versión para Escritorio */}
      <div className="hidden md:block w-full max-w-sm">
        <SearchForm onSearch={handleSearch} />
      </div>

      {/* Versión para Móvil */}
      <div className="md:hidden">
        <Dialog open={isMobileSearchOpen} onOpenChange={setMobileSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>¿Qué se te antoja hoy?</DialogTitle>
            </DialogHeader>
            <SearchForm onSearch={handleSearch} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
