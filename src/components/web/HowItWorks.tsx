// components/custom/HowItWorks.tsx
import { ClipboardList, CreditCard, Store } from "lucide-react";

const steps = [
  {
    icon: <ClipboardList className="h-10 w-10 text-orange-500" />,
    title: "1. Elige tu Menú",
    description:
      "Explora nuestros platillos auténticos y añade tus favoritos al carrito de compras.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-orange-500" />,
    title: "2. Paga Fácil y Seguro",
    description:
      "Ingresa tus datos de entrega y realiza el pago de forma segura con tarjeta de crédito o débito.",
  },
  {
    icon: <Store className="h-10 w-10 text-orange-500" />,
    title: "3. Recógelo en Minutos",
    description:
      "Te avisaremos cuando tu pedido esté listo para que pases por él a nuestro local. ¡Caliente y delicioso!",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto py-12 md:py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Pedir es Así de Fácil
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="flex items-center justify-center h-20 w-20 mb-4 bg-white rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
