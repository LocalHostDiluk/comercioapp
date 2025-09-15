// src/components/admin/products/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Esta es la definición de nuestras columnas.
// Cada objeto representa una columna en la tabla.
export const columns: ColumnDef<Product>[] = [
  // --- Columna: Nombre del Producto ---
  {
    accessorKey: "name",
    header: ({ column }) => {
      // Hacemos el encabezado clickeable para ordenar
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },

  // --- Columna: Estado (Activo/Inactivo) ---
  {
    accessorKey: "isActive",
    header: "Estado",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge variant={isActive ? "default" : "outline"}>
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },

  // --- Columna: Precio ---
  {
    accessorKey: "price",
    header: () => <div className="text-right">Precio</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  // --- Columna: Acciones (Editar/Eliminar) ---
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copiar ID del producto
            </DropdownMenuItem>
            <DropdownMenuItem>Editar producto</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
