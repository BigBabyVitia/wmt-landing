"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface AnimatedTitleFMProps {
  /** Each entry renders as its own animated line. */
  lines: string[];
  /** When true, the lines reveal. Re-mount (or flip) to replay. */
  open?: boolean;
  className?: string;
  lineClassName?: string;
  /** Seconds before the first line starts revealing. */
  delay?: number;
  /** Seconds between consecutive lines. */
  stagger?: number;
}

/**
 * Masked line-by-line reveal for a title — each line slides up from behind a
 * clip mask with a blur→sharp transition, matching the GlowHorizon easing/feel.
 */
export function AnimatedTitleFM({
  lines,
  open = true,
  className,
  lineClassName,
  delay = 0.25,
  stagger = 0.16,
}: AnimatedTitleFMProps) {
  return (
    <span className={"block " + (className ?? "")}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={"block will-change-transform " + (lineClassName ?? "")}
            initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
            animate={open ? { y: "0%", opacity: 1, filter: "blur(0px)" } : { y: "110%", opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default AnimatedTitleFM;
