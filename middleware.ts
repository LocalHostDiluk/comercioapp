import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 1. Cliente Redis de Upstash
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// 2. Configurar el Rate Limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "60 s"), // 10 requests cada 60 seg
});

// 3. Middleware
export async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Has excedido el límite de peticiones.", {
      status: 429,
    });
  }

  return NextResponse.next();
}

// 4. Aplica solo en estas rutas
export const config = {
  matcher: ["/api/orders", "/api/checkout-sessions"],
};
