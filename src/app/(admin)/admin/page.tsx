// src/app/(admin)/page.tsx

import { getAllOrders } from "@/lib/data/orders";
import { getAllProducts } from "@/lib/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart } from "lucide-react";
import { SalesChart } from "@/components/admin/charts/SalesChart"; // <-- 1. Importamos la gráfica
import { Order } from "@/types"; // <-- Importamos el tipo Order

// --- Función para procesar los datos para la gráfica ---
const processSalesDataForChart = (orders: Order[]) => {
  const salesByDay: { [key: string]: number } = {};
  const today = new Date();

  // 1. Filtramos las órdenes de los últimos 7 días
  const last7DaysOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const diffTime = Math.abs(today.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && order.status === "Pagado";
  });

  // 2. Agrupamos y sumamos las ventas por día
  for (const order of last7DaysOrders) {
    const date = new Date(order.createdAt).toLocaleDateString("es-MX", {
      weekday: "short",
    });
    salesByDay[date] = (salesByDay[date] || 0) + order.total;
  }

  // 3. Formateamos los datos para que Recharts los entienda
  return Object.keys(salesByDay).map((dayName) => ({
    name: dayName.charAt(0).toUpperCase() + dayName.slice(1), // ej. "mar."
    total: salesByDay[dayName],
  }));
};

export default async function AdminDashboardPage() {
  const orders = await getAllOrders();
  const products = await getAllProducts();

  const totalRevenue = orders
    .filter((order) => order.status === "Pagado")
    .reduce((acc, order) => acc + order.total, 0);

  const totalSales = orders.length;
  const activeProducts = products.filter((product) => product.isActive).length;

  // --- 2. LLAMAMOS A NUESTRA NUEVA FUNCIÓN ---
  const chartData = processSalesDataForChart(orders);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Las tarjetas de métricas se quedan igual */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de Ingresos Totales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("es-MX", {
                style: "currency",
                currency: "MXN",
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Calculado de órdenes pagadas.
            </p>
          </CardContent>
        </Card>

        {/* Card de Ventas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              Total de órdenes registradas.
            </p>
          </CardContent>
        </Card>

        {/* Card de Productos Activos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Productos Activos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProducts}</div>
            <p className="text-xs text-muted-foreground">
              Productos visibles en la tienda.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- 3. RENDERIZAMOS LA GRÁFICA --- */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Ventas de la Última Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
