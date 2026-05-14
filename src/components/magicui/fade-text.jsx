"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

const DEFAULT_FRAMER_PROPS = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { type: "spring" } },
};

export function FadeText({
  direction = "up",
  className,
  framerProps = DEFAULT_FRAMER_PROPS,
  text,
}) {
  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const animationVariants = useMemo(() => {
    const { hidden, show, ...rest } = framerProps;
    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={animationVariants}>
      <motion.span className={className}>{text}</motion.span>
    </motion.div>
  );
}
