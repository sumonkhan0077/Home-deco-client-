// AnimatedSection.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const variants = {
  fadeUp: { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } },
  fadeDown: { initial: { opacity: 0, y: -80 }, animate: { opacity: 1, y: 0 } },
  fadeLeft: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  fadeRight: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
  zoomIn: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -180 },
    animate: { opacity: 1, rotate: 0 },
  },
  flipX: {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
  },
};

export default function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  className = "",
  once = false, // ডিফল্ট true
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-30px" });

  const { initial, animate } = variants[variant] || variants.fadeUp;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration: 0.9,
        delay: delay * 0.9,
        ease: [0.21, 0.47, 0.32, 0.98], // সুন্দর custom ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
