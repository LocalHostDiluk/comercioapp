// components/custom/FadeInSection.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
}

export const FadeInSection = ({ children }: FadeInSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación solo se ejecuta una vez
    threshold: 0.1, // La animación se activa cuando el 10% del elemento es visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
