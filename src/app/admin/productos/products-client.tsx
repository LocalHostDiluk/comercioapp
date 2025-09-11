"use client";

import { columns } from "./columns";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Product } from "@/types";

export default function ProductsClient({ products }: { products: Product[] }) {
  return (
    <div className="min-h-screen bg-background px-6 md:px-12 lg:px-20 py-10">
      {/* Header con título y botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Productos
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Gestiona todos los productos de tu tienda. Aquí puedes ver, editar y
            agregar nuevos.
          </p>
        </div>
        <Button
          className="rounded-xl shadow-sm h-10 px-6"
          onClick={() => console.log("Abrir modal para nuevo producto")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo producto
        </Button>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl border bg-card shadow-sm p-6">
        <DataTable columns={columns} data={products} filterKey="name" />
      </div>
    </div>
  );
}
