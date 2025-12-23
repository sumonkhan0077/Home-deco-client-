// AnimatedSection.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeDown: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  zoomIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -45 },
    animate: { opacity: 1, rotate: 0 },
  },
};

export default function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  once = true, // ডিফল্ট true
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const { initial, animate } = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: delay * 0.08, // সুন্দর custom ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
