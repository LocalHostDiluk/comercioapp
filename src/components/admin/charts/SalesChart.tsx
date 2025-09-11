// src/components/admin/charts/SalesChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ... (El CustomTooltip y la interfaz DailySale se quedan igual) ...
interface DailySale {
  name: string;
  total: number;
}

interface SalesChartProps {
  data: DailySale[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-1">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="text-lg font-bold text-primary">
            {new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(payload[0].value!)}
          </div>
          <CardDescription>Ventas de este día</CardDescription>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-semibold">Sin ventas</p>
          <p className="text-sm text-muted-foreground">
            No hay datos de ventas en los últimos 7 días para mostrar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barCategoryGap={1}>
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={"0.1"}
            />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `$${new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value as number)}`
          }
        />
        <Tooltip
          // Cambiamos el cursor para que sea más sutil
          cursor={{ fill: "hsl(var(--accent))", fillOpacity: 0.5, radius: 4 }}
          content={<CustomTooltip />}
        />
        <Bar
          dataKey="total"
          fill="url(#colorTotal)"
          radius={[4, 4, 0, 0]}
          isAnimationActive={true}
          animationDuration={300}
          animationEasing="ease-in-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
