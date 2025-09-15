// src/app/(admin)/layout.tsx

import { ReactNode } from "react";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import "../../globals.css";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Panel de Administración",
};

// --- SIMULACIÓN DE AUTENTICACIÓN ---
// En el futuro, esta función revisará una cookie de sesión de Firebase.
// Por ahora, simplemente decidimos si el usuario está logueado o no.
const checkAuth = async () => {
  // CAMBIA ESTE VALOR a `false` para ver cómo te redirige.
  return true;
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isUserAuthenticated = await checkAuth();

  if (!isUserAuthenticated) {
    // Si no está autenticado, podríamos redirigirlo a una página de login.
    // Por ahora, solo mostraremos un mensaje claro.
    return (
      <html lang="es">
        <body>
          <div className="flex h-screen w-full items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Acceso Denegado</h1>
              <p className="text-muted-foreground">
                Necesitas iniciar sesión para ver esta página.
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
