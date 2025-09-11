"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Pencil, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Formateo de precios en MXN
const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <span className="font-semibold">Producto</span>,
    cell: ({ row }) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: () => <span className="font-semibold">Precio</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      return (
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {formatPrice(amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <span className="font-semibold">Categoría</span>,
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <span className="font-semibold">Estado</span>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge
          variant={isActive ? "secondary" : "destructive"}
          className="px-2 py-1 text-xs"
        >
          {isActive ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-muted rounded-full"
            >
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 rounded-xl shadow-lg"
          >
            <DropdownMenuLabel className="text-sm font-semibold">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <Eye className="h-4 w-4" />
              Ver detalles
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Pencil className="h-4 w-4" />
              Editar producto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
