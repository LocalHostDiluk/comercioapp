import { getAllOrders } from "@/lib/data/orders";
import { DataTable } from "@/components/admin/data-table";
import { columns } from "./columns";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Órdenes</h1>
      <DataTable columns={columns} data={orders} filterKey="customer.name" />
    </div>
  );
}
