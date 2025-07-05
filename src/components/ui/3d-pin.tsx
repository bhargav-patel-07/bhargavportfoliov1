"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface PinContainerProps {
  title: string;
  href?: string;
  children: React.ReactNode;
}

export function PinContainer({ title, href, children }: PinContainerProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  return (
    <motion.a
      href={href}
      className="relative block rounded-2xl border border-white/10 bg-white/10 backdrop-blur-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105"
      style={{
        perspective: 1000,
        background: "rgba(30, 41, 59, 0.3)",
      }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      <div className="absolute bottom-2 left-2 text-xs text-white/80 font-semibold pointer-events-none">
        {title}
      </div>
    </motion.a>
  );
} 