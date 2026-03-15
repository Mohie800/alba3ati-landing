"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { roles, features, gameSteps, aboutHighlights } from "@/lib/data";
import { Icon } from "@/components/icons";

/* ==========================================================================
   CSS-IN-JS STYLES — Geometric patterns, keyframes, backgrounds
   ========================================================================== */

const patternStyles = `
  /* ---- Keyframes ---- */
  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spinReverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-18px) rotate(5deg); }
  }
  @keyframes floatDown {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(12px) rotate(-4deg); }
  }
  @keyframes dashOffset {
    to { stroke-dashoffset: 0; }
  }

  /* ---- Diamond Pattern Overlay ---- */
  .pattern-diamonds {
    background-image:
      linear-gradient(45deg, transparent 40%, rgba(199,91,57,0.08) 40%, rgba(199,91,57,0.08) 60%, transparent 60%),
      linear-gradient(-45deg, transparent 40%, rgba(199,91,57,0.08) 40%, rgba(199,91,57,0.08) 60%, transparent 60%);
    background-size: 60px 60px;
  }

  /* ---- Star Pattern (8-pointed) ---- */
  .pattern-stars {
    background-image:
      linear-gradient(45deg, rgba(232,213,183,0.06) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(232,213,183,0.06) 25%, transparent 25%),
      linear-gradient(135deg, rgba(232,213,183,0.06) 25%, transparent 25%),
      linear-gradient(-135deg, rgba(232,213,183,0.06) 25%, transparent 25%);
    background-size: 40px 40px;
    background-position: 0 0, 0 20px, 20px -20px, 20px 0;
  }

  /* ---- Triangle Tessellation ---- */
  .pattern-triangles {
    background-image:
      linear-gradient(60deg, rgba(232,213,183,0.05) 25%, transparent 25.5%, transparent 75%, rgba(232,213,183,0.05) 75%),
      linear-gradient(120deg, rgba(232,213,183,0.05) 25%, transparent 25.5%, transparent 75%, rgba(232,213,183,0.05) 75%);
    background-size: 50px 87px;
    background-position: 0 0, 0 0;
  }

  /* ---- Chevron Pattern ---- */
  .pattern-chevrons {
    background-image:
      linear-gradient(135deg, rgba(26,26,46,0.04) 25%, transparent 25%),
      linear-gradient(225deg, rgba(26,26,46,0.04) 25%, transparent 25%),
      linear-gradient(315deg, rgba(26,26,46,0.04) 25%, transparent 25%),
      linear-gradient(45deg, rgba(26,26,46,0.04) 25%, transparent 25%);
    background-size: 40px 40px;
    background-position: 0 0, 0 0, 0 0, 0 0;
  }

  /* ---- Hexagon Grid ---- */
  .pattern-hexagons {
    background-color: transparent;
    background-image:
      radial-gradient(circle, rgba(232,213,183,0.08) 1px, transparent 1px);
    background-size: 30px 52px;
    background-position: 0 0, 15px 26px;
  }

  /* ---- Zigzag border ---- */
  .zigzag-top {
    position: relative;
  }
  .zigzag-top::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background:
      linear-gradient(135deg, var(--terracotta) 33.33%, transparent 33.33%) 0 0,
      linear-gradient(225deg, var(--terracotta) 33.33%, transparent 33.33%) 0 0;
    background-size: 20px 20px;
    background-repeat: repeat-x;
  }

  /* ---- Geometric border frame ---- */
  .geo-border-frame {
    border: 3px solid rgba(232,213,183,0.25);
    outline: 1px solid rgba(232,213,183,0.1);
    outline-offset: 6px;
  }

  /* ---- Role card hexagonal clip ---- */
  .hex-clip {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  /* ---- Diamond shape ---- */
  .diamond-shape {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }

  /* ---- Card flip ---- */
  .card-flip-container {
    perspective: 1000px;
  }
  .card-flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }
  .card-flip-container:hover .card-flip-inner,
  .card-flip-container.flipped .card-flip-inner {
    transform: rotateY(180deg);
  }
  .card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
  }

  /* ---- Geometric button ---- */
  .geo-btn {
    position: relative;
    clip-path: polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%);
    transition: all 0.3s ease;
  }
  .geo-btn:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }

  /* ---- Mandala ring ---- */
  .mandala-ring {
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid;
  }

  /* ---- Scrollbar for this page ---- */
  .geo-page::-webkit-scrollbar {
    width: 8px;
  }
  .geo-page::-webkit-scrollbar-track {
    background: var(--indigo);
  }
  .geo-page::-webkit-scrollbar-thumb {
    background: var(--terracotta);
    border-radius: 4px;
  }

  /* ---- Feature card geometric container ---- */
  .geo-feature-card {
    position: relative;
    background: rgba(232,213,183,0.05);
    border: 2px solid rgba(232,213,183,0.15);
    transition: all 0.3s ease;
  }
  .geo-feature-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(199,91,57,0.3), rgba(232,213,183,0.1), rgba(199,91,57,0.3));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .geo-feature-card:hover {
    border-color: rgba(199,91,57,0.5);
    transform: translateY(-4px);
    background: rgba(232,213,183,0.08);
  }
  .geo-feature-card:hover::before {
    opacity: 1;
  }

  /* ---- Section zigzag dividers ---- */
  .zigzag-divider-sand {
    width: 100%;
    height: 30px;
    background:
      linear-gradient(135deg, var(--sand) 25%, transparent 25%) -14px 0,
      linear-gradient(225deg, var(--sand) 25%, transparent 25%) -14px 0,
      linear-gradient(315deg, var(--sand) 25%, transparent 25%),
      linear-gradient(45deg, var(--sand) 25%, transparent 25%);
    background-size: 28px 30px;
    background-color: var(--indigo);
  }
  .zigzag-divider-indigo {
    width: 100%;
    height: 30px;
    background:
      linear-gradient(135deg, var(--indigo) 25%, transparent 25%) -14px 0,
      linear-gradient(225deg, var(--indigo) 25%, transparent 25%) -14px 0,
      linear-gradient(315deg, var(--indigo) 25%, transparent 25%),
      linear-gradient(45deg, var(--indigo) 25%, transparent 25%);
    background-size: 28px 30px;
    background-color: var(--terracotta);
  }
  .zigzag-divider-terracotta {
    width: 100%;
    height: 30px;
    background:
      linear-gradient(135deg, var(--terracotta) 25%, transparent 25%) -14px 0,
      linear-gradient(225deg, var(--terracotta) 25%, transparent 25%) -14px 0,
      linear-gradient(315deg, var(--terracotta) 25%, transparent 25%),
      linear-gradient(45deg, var(--terracotta) 25%, transparent 25%);
    background-size: 28px 30px;
    background-color: var(--sand);
  }
  .zigzag-divider-sand-to-indigo {
    width: 100%;
    height: 30px;
    background:
      linear-gradient(135deg, var(--sand) 25%, transparent 25%) -14px 0,
      linear-gradient(225deg, var(--sand) 25%, transparent 25%) -14px 0,
      linear-gradient(315deg, var(--sand) 25%, transparent 25%),
      linear-gradient(45deg, var(--sand) 25%, transparent 25%);
    background-size: 28px 30px;
    background-color: var(--indigo);
  }

  /* ---- Geometric floating accents ---- */
  .float-accent {
    position: absolute;
    pointer-events: none;
    opacity: 0.15;
  }

  /* ---- Timeline connector ---- */
  .timeline-connector {
    position: relative;
  }
  .timeline-connector::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 3px;
    height: 24px;
    background: repeating-linear-gradient(
      to bottom,
      var(--terracotta) 0px,
      var(--terracotta) 4px,
      transparent 4px,
      transparent 8px
    );
    transform: translateX(-50%);
  }
`;

/* ==========================================================================
   GEOMETRIC SVG PATTERNS — Mandala, star decorations
   ========================================================================== */

function MandalaPattern({ size = 500 }: { size?: number }) {
  const rings = [
    { r: size * 0.45, segments: 16, color: "rgba(232,213,183,0.12)" },
    { r: size * 0.38, segments: 12, color: "rgba(199,91,57,0.15)" },
    { r: size * 0.3, segments: 8, color: "rgba(232,213,183,0.1)" },
    { r: size * 0.22, segments: 16, color: "rgba(199,91,57,0.12)" },
    { r: size * 0.14, segments: 8, color: "rgba(232,213,183,0.15)" },
  ];
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: 1 }}
    >
      {rings.map((ring, ri) => {
        const points: string[] = [];
        for (let i = 0; i < ring.segments; i++) {
          const angle = (i * 2 * Math.PI) / ring.segments - Math.PI / 2;
          const x = cx + ring.r * Math.cos(angle);
          const y = cy + ring.r * Math.sin(angle);
          points.push(`${x},${y}`);
        }
        return (
          <g key={ri}>
            {/* Ring circle */}
            <circle
              cx={cx}
              cy={cy}
              r={ring.r}
              fill="none"
              stroke={ring.color}
              strokeWidth={1.5}
            />
            {/* Connecting lines to create star pattern */}
            {points.map((point, pi) => {
              const nextIdx =
                (pi + Math.floor(ring.segments / 3)) % ring.segments;
              return (
                <line
                  key={pi}
                  x1={point.split(",")[0]}
                  y1={point.split(",")[1]}
                  x2={points[nextIdx].split(",")[0]}
                  y2={points[nextIdx].split(",")[1]}
                  stroke={ring.color}
                  strokeWidth={1}
                />
              );
            })}
            {/* Small diamonds at vertices */}
            {points.map((point, pi) => {
              const px = parseFloat(point.split(",")[0]);
              const py = parseFloat(point.split(",")[1]);
              return (
                <rect
                  key={`d-${pi}`}
                  x={px - 3}
                  y={py - 3}
                  width={6}
                  height={6}
                  fill={ring.color}
                  transform={`rotate(45 ${px} ${py})`}
                />
              );
            })}
          </g>
        );
      })}
      {/* Central star */}
      <polygon
        points={Array.from({ length: 8 }, (_, i) => {
          const r = i % 2 === 0 ? size * 0.08 : size * 0.04;
          const angle = (i * Math.PI) / 4 - Math.PI / 2;
          return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(" ")}
        fill="rgba(199,91,57,0.25)"
        stroke="rgba(232,213,183,0.2)"
        strokeWidth={1}
      />
    </svg>
  );
}

function EightPointStar({
  size = 40,
  color = "rgba(232,213,183,0.2)",
}: {
  size?: number;
  color?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size * 0.48;
  const inner = outer * 0.42;
  const points = Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points} fill={color} />
    </svg>
  );
}

function GeometricBorderSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
    >
      {/* Corner diamonds */}
      {[
        [30, 30],
        [1410, 30],
        [30, 870],
        [1410, 870],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 8}
          y={y - 8}
          width={16}
          height={16}
          fill="none"
          stroke="rgba(232,213,183,0.3)"
          strokeWidth={1.5}
          transform={`rotate(45 ${x} ${y})`}
        />
      ))}
      {/* Border lines with dashes */}
      <rect
        x={20}
        y={20}
        width={1400}
        height={860}
        fill="none"
        stroke="rgba(232,213,183,0.15)"
        strokeWidth={1}
        strokeDasharray="8 4"
      />
      <rect
        x={14}
        y={14}
        width={1412}
        height={872}
        fill="none"
        stroke="rgba(199,91,57,0.1)"
        strokeWidth={0.5}
      />
    </svg>
  );
}

/* ==========================================================================
   FLOATING GEOMETRIC ACCENTS
   ========================================================================== */

function FloatingAccents() {
  const shapes = [
    { top: "10%", left: "5%", size: 24, rotation: 45, duration: 6 },
    { top: "20%", right: "8%", size: 18, rotation: 0, duration: 8 },
    { top: "60%", left: "3%", size: 30, rotation: 30, duration: 7 },
    { top: "75%", right: "5%", size: 22, rotation: 60, duration: 9 },
    { top: "40%", left: "7%", size: 16, rotation: 15, duration: 5 },
    { top: "85%", left: "10%", size: 20, rotation: 90, duration: 7.5 },
  ];

  return (
    <>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[1] hidden lg:block"
          style={{
            top: s.top,
            left: s.left,
            right: (s as { right?: string }).right,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [s.rotation, s.rotation + 20, s.rotation],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <EightPointStar size={s.size} color="rgba(199,91,57,0.12)" />
        </motion.div>
      ))}
    </>
  );
}

/* ==========================================================================
   SHARED CONSTANTS
   ========================================================================== */
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.alba3ati.app";
const LAUNCH_TARGET = new Date("2026-03-16T22:00:00+02:00").getTime();
const isLaunched = () => Date.now() >= LAUNCH_TARGET;

/* ==========================================================================
   SECTION COMPONENTS
   ========================================================================== */

/* ---- HERO ---- */
/* ---- COMING SOON MODAL ---- */
function ComingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, var(--indigo), var(--indigo-dark, #1a1040))",
              border: "2px solid var(--terracotta)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(199,91,57,0.15)",
            }}
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative bar */}
            <div
              className="h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--terracotta), var(--sand), var(--terracotta))",
              }}
            />

            <div className="p-8 text-center" dir="rtl">
              {/* Icon */}
              <motion.div
                className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(199,91,57,0.15)" }}
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.15, type: "spring" }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                    fill="var(--sand)"
                  />
                </svg>
              </motion.div>

              {/* Text */}
              <h3
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  color: "var(--sand-light)",
                }}
              >
                قريبًا على App Store
              </h3>
              <p
                className="text-base mb-8 leading-relaxed"
                style={{ color: "var(--sand)", opacity: 0.7 }}
              >
                نشتغل على نسخة iOS — تابعنا عشان تعرف أول ما تنزل!
              </p>

              {/* Close button */}
              <button
                onClick={onClose}
                className="geo-btn px-8 py-3 text-base font-bold"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  background: "var(--terracotta)",
                  color: "var(--sand-light)",
                }}
              >
                تمام
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GooglePlayComingSoonModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, var(--indigo), var(--indigo-dark, #1a1040))",
              border: "2px solid var(--terracotta)",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(199,91,57,0.15)",
            }}
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-1.5 w-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--terracotta), var(--sand), var(--terracotta))",
              }}
            />

            <div className="p-8 text-center" dir="rtl">
              <motion.div
                className="mx-auto mb-5 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(199,91,57,0.15)" }}
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ delay: 0.15, type: "spring" }}
              >
                <Icon name="googlePlay" size={36} color="var(--sand)" />
              </motion.div>

              <h3
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  color: "var(--sand-light)",
                }}
              >
                قريبًا على Google Play
              </h3>
              <p
                className="text-base mb-8 leading-relaxed"
                style={{ color: "var(--sand)", opacity: 0.7 }}
              >
                نسخة Android في الطريق — العد التنازلي شغال!
              </p>

              <button
                onClick={onClose}
                className="geo-btn px-8 py-3 text-base font-bold"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  background: "var(--terracotta)",
                  color: "var(--sand-light)",
                }}
              >
                تمام
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSection() {
  const [iosModal, setIosModal] = useState(false);
  const [gpModal, setGpModal] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mandalaScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--indigo)" }}
    >
      {/* Geometric border frame */}
      <GeometricBorderSVG />

      {/* Background star pattern */}
      {/* <div className="absolute inset-0 pattern-stars" /> */}

      {/* Mandala */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ rotate: mandalaRotate, scale: mandalaScale }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MandalaPattern size={700} />
        </motion.div>
      </motion.div>

      {/* Secondary rotating ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0.1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500">
          <circle
            cx="250"
            cy="250"
            r="240"
            fill="none"
            stroke="var(--sand)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
          />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 12;
            const x = 250 + 240 * Math.cos(angle);
            const y = 250 + 240 * Math.sin(angle);
            return (
              <rect
                key={i}
                x={x - 4}
                y={y - 4}
                width={8}
                height={8}
                fill="var(--terracotta)"
                opacity={0.3}
                transform={`rotate(45 ${x} ${y})`}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ y: textY, opacity }}
      >
        {/* Mascot */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: "spring",
            bounce: 0.3,
          }}
        >
          <Image
            src="/icon1.png"
            alt="البعاتي"
            width={180}
            height={180}
            className="drop-shadow-[0_0_40px_rgba(199,91,57,0.4)]"
            priority
          />
        </motion.div>

        {/* Title */}
        {/* <motion.h1
          className="text-7xl sm:text-8xl md:text-9xl font-bold mb-6 tracking-tight"
          style={{
            fontFamily: "var(--font-reem-kufi)",
            color: "var(--sand)",
            textShadow: "0 4px 30px rgba(199,91,57,0.3)",
          }}
          initial={{ scale: 1.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          البعاتي
        </motion.h1> */}

        {/* Geometric line decoration */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div
            className="h-[2px] flex-1 max-w-[80px]"
            style={{
              background:
                "linear-gradient(to left, var(--terracotta), transparent)",
            }}
          />
          <div
            className="w-3 h-3 rotate-45 border-2"
            style={{ borderColor: "var(--terracotta)" }}
          />
          <div
            className="h-[2px] flex-1 max-w-[80px]"
            style={{
              background:
                "linear-gradient(to right, var(--terracotta), transparent)",
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mb-4"
          style={{
            fontFamily: "var(--font-reem-kufi)",
            color: "var(--sand)",
            opacity: 0.85,
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 0.85 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          لعبة الذكاء والخداع السودانية
        </motion.p>

        <motion.p
          className="text-base sm:text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--sand)", opacity: 0.6 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          اكتشف الخائن بين الأهالي قبل أن يقضي على القرية
        </motion.p>

        {/* CTA Buttons — Geometric badge style */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <button
            onClick={() => setIosModal(true)}
            className="geo-btn px-10 py-4 text-lg font-bold flex items-center gap-2"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              background: "var(--terracotta)",
              color: "var(--sand-light)",
            }}
          >
            <Icon name="apple" size={20} color="var(--sand-light)" />
            حمّل على iOS
          </button>
          <button
            onClick={() => {
              if (isLaunched()) {
                window.open(GOOGLE_PLAY_URL, "_blank", "noopener,noreferrer");
              } else {
                setGpModal(true);
              }
            }}
            className="geo-btn px-10 py-4 text-lg font-bold flex items-center gap-2"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              background: "rgba(232,213,183,0.1)",
              color: "var(--sand)",
              border: "2px solid var(--sand)",
              clipPath:
                "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
            }}
          >
            <Icon name="googlePlay" size={20} color="var(--sand)" />
            حمّل على Android
          </button>
        </motion.div>
        <ComingSoonModal open={iosModal} onClose={() => setIosModal(false)} />
        <GooglePlayComingSoonModal
          open={gpModal}
          onClose={() => setGpModal(false)}
        />
      </motion.div>

      {/* Geometric village silhouette */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          {/* Geometric buildings made of triangles and rectangles */}
          <g fill="rgba(232,213,183,0.08)">
            {/* Building shapes */}
            <polygon points="0,120 0,80 40,80 40,120" />
            <polygon points="40,120 40,60 60,40 80,60 80,120" />
            <polygon points="80,120 80,75 120,75 120,120" />
            <polygon points="140,120 140,55 160,35 180,55 180,120" />
            <polygon points="200,120 200,70 250,70 250,120" />
            <polygon points="250,120 250,50 270,30 290,50 290,120" />
            <polygon points="320,120 320,65 360,65 360,120" />
            <polygon points="380,120 380,45 400,25 420,45 420,120" />
            <polygon points="440,120 440,80 480,80 480,120" />
            <polygon points="500,120 500,55 530,35 560,55 560,120" />
            <polygon points="580,120 580,70 620,70 620,120" />
            <polygon points="640,120 640,50 660,30 680,50 680,120" />
            <polygon points="700,120 700,85 740,85 740,120" />
            <polygon points="760,120 760,60 780,40 800,60 800,120" />
            <polygon points="820,120 820,70 860,70 860,120" />
            <polygon points="880,120 880,55 900,35 920,55 920,120" />
            <polygon points="940,120 940,75 980,75 980,120" />
            <polygon points="1000,120 1000,50 1020,30 1040,50 1040,120" />
            <polygon points="1060,120 1060,80 1100,80 1100,120" />
            <polygon points="1120,120 1120,60 1140,40 1160,60 1160,120" />
            <polygon points="1180,120 1180,70 1220,70 1220,120" />
            <polygon points="1240,120 1240,55 1260,35 1280,55 1280,120" />
            <polygon points="1300,120 1300,85 1340,85 1340,120" />
            <polygon points="1360,120 1360,65 1380,45 1400,65 1400,120" />
            <polygon points="1400,120 1400,80 1440,80 1440,120" />
          </g>
          {/* Baseline */}
          <rect
            x="0"
            y="115"
            width="1440"
            height="5"
            fill="var(--terracotta)"
            opacity="0.15"
          />
        </svg>
      </div>
    </section>
  );
}

/* ---- COUNTDOWN ---- */
function CountdownSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const calcRemaining = () => {
    const diff = Math.max(0, LAUNCH_TARGET - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: diff === 0,
    };
  };

  const [time, setTime] = useState(calcRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(calcRemaining()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const units = [
    { label: "ثانية", value: time.seconds },
    { label: "دقيقة", value: time.minutes },
    { label: "ساعة", value: time.hours },
    { label: "يوم", value: time.days },
  ];

  return (
    <>
      {/* Zigzag divider */}
      <div
        style={{
          width: "100%",
          height: "30px",
          background: `
            linear-gradient(135deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(225deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(315deg, var(--indigo) 25%, transparent 25%),
            linear-gradient(45deg, var(--indigo) 25%, transparent 25%)
          `,
          backgroundSize: "28px 30px",
          backgroundColor: "var(--terracotta)",
        }}
      />
      <section
        ref={ref}
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: "var(--terracotta)" }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 pattern-diamonds"
          style={{ opacity: 0.4 }}
        />

        {/* Rotating star decoration */}
        <motion.div
          className="absolute -right-16 -top-16 opacity-[0.07] hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <EightPointStar size={200} color="var(--sand)" />
        </motion.div>
        <motion.div
          className="absolute -left-12 -bottom-12 opacity-[0.07] hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <EightPointStar size={160} color="var(--sand)" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Android icon */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-2xl"
              style={{
                background: "rgba(232,213,183,0.15)",
                border: "2px solid rgba(232,213,183,0.3)",
              }}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.523 2.237a.625.625 0 0 0-1.078.636l1.046 1.774A7.477 7.477 0 0 0 12 2.75a7.477 7.477 0 0 0-5.49 1.897l1.045-1.774a.625.625 0 0 0-1.078-.636L5.16 4.724A7.5 7.5 0 0 0 4.5 10.25h15a7.5 7.5 0 0 0-.66-5.526l-1.317-2.487zM8.75 7.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm6.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM5 11.75a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h.5v2.25a1.25 1.25 0 1 0 2.5 0v-2.25h3v2.25a1.25 1.25 0 1 0 2.5 0v-2.25h3v2.25a1.25 1.25 0 1 0 2.5 0v-2.25h.5a1 1 0 0 0 1-1v-4.5a1 1 0 0 0-1-1H5z"
                  fill="var(--sand-light)"
                />
              </svg>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--sand-light)",
              textShadow: "0 2px 15px rgba(0,0,0,0.2)",
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            إطلاق نسخة Android
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg mb-8"
            style={{ color: "var(--sand)", opacity: 0.85 }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 0.85 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            العد التنازلي لإطلاق اللعبة على متجر Google Play
          </motion.p>

          {/* Countdown boxes */}
          {time.done ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="geo-btn inline-flex items-center gap-2 px-12 py-5 text-xl font-bold no-underline"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  background: "var(--sand)",
                  color: "var(--indigo)",
                }}
              >
                <Icon name="googlePlay" size={22} color="var(--indigo)" />
                حمّل الآن من Google Play
              </a>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center justify-center gap-3 sm:gap-5"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {units.map((unit, i) => (
                <motion.div
                  key={unit.label}
                  className="flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    type: "spring",
                    bounce: 0.3,
                  }}
                >
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mb-2"
                    style={{
                      background: "rgba(26,26,46,0.4)",
                      border: "2px solid rgba(232,213,183,0.25)",
                      clipPath:
                        "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                    }}
                  >
                    <span
                      className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums"
                      style={{
                        fontFamily: "var(--font-reem-kufi)",
                        color: "var(--sand-light)",
                      }}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: "var(--font-reem-kufi)",
                      color: "var(--sand)",
                      opacity: 0.7,
                    }}
                  >
                    {unit.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Geometric divider */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "100%", opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div
              className="h-[2px] flex-1 max-w-[60px]"
              style={{
                background:
                  "linear-gradient(to left, var(--sand), transparent)",
              }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--sand)" }}
            />
            <div
              className="h-[2px] flex-1 max-w-[60px]"
              style={{
                background:
                  "linear-gradient(to right, var(--sand), transparent)",
              }}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ---- ABOUT ---- */
function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <div className="zigzag-divider-indigo" />
      <section
        ref={ref}
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ background: "var(--terracotta)" }}
      >
        {/* Diamond pattern overlay */}
        <div className="absolute inset-0 pattern-diamonds" />

        {/* Decorative corner stars */}
        <div className="absolute top-8 right-8 opacity-20">
          <EightPointStar size={60} color="var(--sand)" />
        </div>
        <div className="absolute bottom-8 left-8 opacity-20">
          <EightPointStar size={40} color="var(--sand)" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                color: "var(--sand-light)",
              }}
            >
              عن اللعبة
            </h2>

            {/* Geometric divider */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--sand)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--sand)" }}
              />
              <div
                className="h-[2px] w-8"
                style={{ background: "var(--sand)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--sand)" }}
              />
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--sand)" }}
              />
            </div>

            <p
              className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--sand-light)", opacity: 0.9 }}
            >
              البعاتي لعبة جماعية مستوحاة من التراث السوداني، تجمع بين الذكاء
              والخداع والمحادثة الصوتية المباشرة. في كل جولة، يتخفى البعاتي بين
              الأهالي ويحاول القضاء عليهم واحداً تلو الآخر، بينما يحاول الأهالي
              كشف هويته قبل فوات الأوان.
            </p>
          </motion.div>

          {/* Highlight hexagonal badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {aboutHighlights.map((h, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ scale: 0, rotate: -30 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {/* Hexagonal frame */}
                <div
                  className="hex-clip w-28 h-28 flex items-center justify-center mb-4"
                  style={{ background: "rgba(232,213,183,0.15)" }}
                >
                  <div
                    className="hex-clip w-24 h-24 flex items-center justify-center"
                    style={{ background: "rgba(26,26,46,0.4)" }}
                  >
                    <Icon name={h.icon} size={40} color="var(--sand)" />
                  </div>
                </div>
                <span
                  className="text-lg font-bold"
                  style={{
                    fontFamily: "var(--font-reem-kufi)",
                    color: "var(--sand-light)",
                  }}
                >
                  {h.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- ROLES ---- */
function RolesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const angleOffsets = [-15, 10, -8, 12, -5];

  return (
    <>
      <div
        className="zigzag-divider-terracotta"
        style={{ background: "var(--terracotta)" }}
      >
        <div
          style={{
            width: "100%",
            height: "30px",
            background: `
              linear-gradient(135deg, var(--terracotta) 25%, transparent 25%) -14px 0,
              linear-gradient(225deg, var(--terracotta) 25%, transparent 25%) -14px 0,
              linear-gradient(315deg, var(--terracotta) 25%, transparent 25%),
              linear-gradient(45deg, var(--terracotta) 25%, transparent 25%)
            `,
            backgroundSize: "28px 30px",
            backgroundColor: "var(--indigo)",
          }}
        />
      </div>
      <section
        ref={ref}
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ background: "var(--indigo)" }}
      >
        {/* Star pattern overlay */}
        <div className="absolute inset-0 pattern-stars" />
        <div className="absolute inset-0 pattern-hexagons" />

        {/* Decorative rotating stars */}
        <motion.div
          className="absolute top-12 left-12 opacity-10 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <EightPointStar size={80} color="var(--terracotta)" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 right-12 opacity-10 hidden lg:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <EightPointStar size={60} color="var(--sand)" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                color: "var(--sand)",
              }}
            >
              شخصيات اللعبة
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-8"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
            <p
              className="text-base"
              style={{ color: "var(--sand)", opacity: 0.6 }}
            >
              اضغط على الشخصية لمعرفة المزيد
            </p>
          </motion.div>

          {/* Role cards in a centered flex layout */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {roles.map((role, i) => (
              <motion.div
                key={role.id}
                className="card-flip-container cursor-pointer"
                style={{ width: "180px", height: "240px" }}
                initial={{
                  opacity: 0,
                  rotate: angleOffsets[i],
                  scale: 0.6,
                }}
                animate={isInView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150,
                }}
                onClick={() => toggleFlip(role.id)}
              >
                <div
                  className={`card-flip-inner ${flippedCards.has(role.id) ? "" : ""}`}
                  style={{
                    transform: flippedCards.has(role.id)
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="card-face flex flex-col items-center justify-center p-4 rounded-none"
                    style={{
                      background: "var(--indigo-light)",
                      border: `3px solid ${role.color}`,
                      clipPath:
                        "polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)",
                    }}
                  >
                    {/* Geometric frame decoration */}
                    <div
                      className="w-16 h-16 flex items-center justify-center mb-3"
                      style={{
                        background: `${role.color}15`,
                        border: `2px solid ${role.color}40`,
                        clipPath:
                          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      }}
                    >
                      <EightPointStar size={28} color={role.color} />
                    </div>
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{
                        fontFamily: "var(--font-reem-kufi)",
                        color: role.color,
                      }}
                    >
                      {role.name}
                    </h3>
                    <span
                      className="text-xs px-3 py-0.5"
                      style={{
                        color: "var(--sand)",
                        opacity: 0.6,
                        background: `${role.color}10`,
                      }}
                    >
                      {role.team}
                    </span>
                  </div>

                  {/* Back */}
                  <div
                    className="card-face card-back flex flex-col items-center justify-center p-5 text-center"
                    style={{
                      background: role.color,
                      clipPath:
                        "polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)",
                    }}
                  >
                    {/* Pattern overlay on back */}
                    <div
                      className="absolute inset-0 pattern-diamonds"
                      style={{ opacity: 0.15 }}
                    />
                    <h3
                      className="text-lg font-bold mb-3 relative z-10"
                      style={{
                        fontFamily: "var(--font-reem-kufi)",
                        color: "var(--indigo)",
                      }}
                    >
                      {role.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed relative z-10"
                      style={{ color: "var(--indigo)" }}
                    >
                      {role.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- HOW TO PLAY ---- */
function HowToPlaySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "30px",
          background: `
            linear-gradient(135deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(225deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(315deg, var(--indigo) 25%, transparent 25%),
            linear-gradient(45deg, var(--indigo) 25%, transparent 25%)
          `,
          backgroundSize: "28px 30px",
          backgroundColor: "var(--sand)",
        }}
      />
      <section
        ref={ref}
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ background: "var(--sand)" }}
      >
        {/* Chevron pattern overlay */}
        <div className="absolute inset-0 pattern-chevrons" />

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <EightPointStar size={50} color="var(--indigo)" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <EightPointStar size={35} color="var(--terracotta)" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                color: "var(--indigo)",
              }}
            >
              كيف تلعب؟
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-8"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
          </motion.div>

          {/* Timeline as stacking geometric blocks */}
          <div className="flex flex-col items-center gap-0">
            {gameSteps.map((step, i) => {
              const isLast = i === gameSteps.length - 1;
              return (
                <motion.div
                  key={step.step}
                  className="relative w-full max-w-lg"
                  initial={{ y: 60, opacity: 0, scale: 0.9 }}
                  animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.15 + i * 0.12,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120,
                  }}
                >
                  {/* Block */}
                  <div
                    className="relative p-6 mb-0"
                    style={{
                      background:
                        i % 2 === 0 ? "var(--indigo)" : "var(--terracotta)",
                      clipPath:
                        i % 2 === 0
                          ? "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)"
                          : "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Step number in diamond */}
                      <div
                        className="flex-shrink-0 w-12 h-12 flex items-center justify-center rotate-45"
                        style={{
                          background:
                            i % 2 === 0 ? "var(--terracotta)" : "var(--sand)",
                        }}
                      >
                        <span
                          className="text-lg font-bold -rotate-45"
                          style={{
                            fontFamily: "var(--font-reem-kufi)",
                            color:
                              i % 2 === 0
                                ? "var(--sand-light)"
                                : "var(--indigo)",
                          }}
                        >
                          {step.step}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon
                            name={step.icon}
                            size={24}
                            color="var(--sand)"
                          />
                          <h3
                            className="text-lg font-bold"
                            style={{
                              fontFamily: "var(--font-reem-kufi)",
                              color: "var(--sand-light)",
                            }}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p
                          className="text-sm"
                          style={{
                            color: "var(--sand)",
                            opacity: 0.75,
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connector triangle */}
                  {!isLast && (
                    <div className="flex justify-center">
                      <div
                        className="w-0 h-0"
                        style={{
                          borderLeft: "12px solid transparent",
                          borderRight: "12px solid transparent",
                          borderTop: `16px solid ${i % 2 === 0 ? "var(--indigo)" : "var(--terracotta)"}`,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- FEATURES ---- */
function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "30px",
          background: `
            linear-gradient(135deg, var(--sand) 25%, transparent 25%) -14px 0,
            linear-gradient(225deg, var(--sand) 25%, transparent 25%) -14px 0,
            linear-gradient(315deg, var(--sand) 25%, transparent 25%),
            linear-gradient(45deg, var(--sand) 25%, transparent 25%)
          `,
          backgroundSize: "28px 30px",
          backgroundColor: "var(--indigo)",
        }}
      />
      <section
        ref={ref}
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ background: "var(--indigo)" }}
      >
        {/* Triangle tessellation */}
        <div className="absolute inset-0 pattern-triangles" />
        <div className="absolute inset-0 pattern-hexagons" />

        {/* Decorative rotating stars */}
        <motion.div
          className="absolute top-16 right-16 opacity-10 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <EightPointStar size={70} color="var(--sand)" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Section header */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                color: "var(--sand)",
              }}
            >
              مميزات اللعبة
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-8"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "var(--terracotta)" }}
              />
              <div
                className="h-[2px] w-12"
                style={{ background: "var(--terracotta)" }}
              />
            </div>
          </motion.div>

          {/* 2x3 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="geo-feature-card p-6 relative group"
                style={{
                  clipPath:
                    "polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%)",
                }}
                initial={{
                  y: 40,
                  opacity: 0,
                  clipPath:
                    "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                }}
                animate={
                  isInView
                    ? {
                        y: 0,
                        opacity: 1,
                        clipPath:
                          "polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%)",
                      }
                    : {}
                }
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Pattern overlay on hover */}
                <div className="absolute inset-0 pattern-diamonds opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon in diamond frame */}
                <div className="relative z-10 flex items-center gap-4 mb-3">
                  <div
                    className="w-14 h-14 flex items-center justify-center flex-shrink-0 rotate-45"
                    style={{
                      background: "rgba(199,91,57,0.15)",
                      border: "2px solid rgba(199,91,57,0.3)",
                    }}
                  >
                    <span className="-rotate-45">
                      <Icon name={feature.icon} size={24} color="var(--sand)" />
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-reem-kufi)",
                      color: "var(--sand)",
                    }}
                  >
                    {feature.title}
                  </h3>
                </div>
                <p
                  className="relative z-10 text-sm leading-relaxed pr-[4.5rem]"
                  style={{ color: "var(--sand)", opacity: 0.65 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- DOWNLOAD CTA ---- */
function DownloadSection() {
  const [iosModal, setIosModal] = useState(false);
  const [gpModal, setGpModal] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "30px",
          background: `
            linear-gradient(135deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(225deg, var(--indigo) 25%, transparent 25%) -14px 0,
            linear-gradient(315deg, var(--indigo) 25%, transparent 25%),
            linear-gradient(45deg, var(--indigo) 25%, transparent 25%)
          `,
          backgroundSize: "28px 30px",
          backgroundColor: "var(--terracotta)",
        }}
      />
      <section
        ref={ref}
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 50%, var(--indigo) 50%, var(--indigo) 100%)",
        }}
      >
        {/* Pattern overlays for both halves */}
        <div
          className="absolute inset-0 pattern-diamonds"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0 pattern-stars" />

        {/* Geometric border between the halves — diagonal line decoration */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="var(--sand)"
            strokeWidth="0.3"
            strokeDasharray="2 2"
          />
          <line
            x1="2"
            y1="100"
            x2="102"
            y2="0"
            stroke="var(--sand)"
            strokeWidth="0.15"
          />
          <line
            x1="-2"
            y1="100"
            x2="98"
            y2="0"
            stroke="var(--sand)"
            strokeWidth="0.15"
          />
        </svg>

        {/* Large decorative mandala */}
        <motion.div
          className="absolute -left-32 -bottom-32 opacity-[0.06] hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          <MandalaPattern size={400} />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/icon1.png"
              alt="البعاتي"
              width={120}
              height={120}
              className="drop-shadow-[0_0_30px_rgba(232,213,183,0.3)]"
            />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              color: "var(--sand-light)",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            جاهز تكشف البعاتي؟
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl mb-10"
            style={{ color: "var(--sand)", opacity: 0.8 }}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 0.8 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            حمّل اللعبة الآن وابدأ المغامرة مع أصدقائك
          </motion.p>

          {/* Geometric divider */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-10"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "100%", opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div
              className="h-[2px] flex-1 max-w-[60px]"
              style={{
                background:
                  "linear-gradient(to left, var(--sand), transparent)",
              }}
            />
            <div
              className="w-2 h-2 rotate-45"
              style={{ background: "var(--sand)" }}
            />
            <div
              className="h-[2px] flex-1 max-w-[60px]"
              style={{
                background:
                  "linear-gradient(to right, var(--sand), transparent)",
              }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 items-center justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={() => setIosModal(true)}
              className="geo-btn px-12 py-5 text-xl font-bold flex items-center gap-2"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                background: "var(--sand)",
                color: "var(--indigo)",
              }}
            >
              <Icon name="apple" size={22} color="var(--indigo)" />
              App Store
            </button>
            <button
              onClick={() => {
                if (isLaunched()) {
                  window.open(GOOGLE_PLAY_URL, "_blank", "noopener,noreferrer");
                } else {
                  setGpModal(true);
                }
              }}
              className="geo-btn px-12 py-5 text-xl font-bold flex items-center gap-2"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                background: "transparent",
                color: "var(--sand)",
                border: "3px solid var(--sand)",
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
              }}
            >
              <Icon name="googlePlay" size={22} color="var(--sand)" />
              Google Play
            </button>
          </motion.div>
          <ComingSoonModal open={iosModal} onClose={() => setIosModal(false)} />
          <GooglePlayComingSoonModal
            open={gpModal}
            onClose={() => setGpModal(false)}
          />
        </div>
      </section>
    </>
  );
}

/* ---- FOOTER ---- */
function FooterSection() {
  const [communityLinks, setCommunityLinks] = useState<{
    enabled?: boolean;
    whatsapp?: { url: string; enabled: boolean };
    telegram?: { url: string; enabled: boolean };
    discord?: { url: string; enabled: boolean };
  } | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3009";
    fetch(`${apiUrl}/api/app/community-links`)
      .then((r) => r.json())
      .then(setCommunityLinks)
      .catch(() => {});
  }, []);

  const platforms = [
    {
      key: "whatsapp" as const,
      color: "#25D366",
      hoverColor: "#1da851",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      key: "telegram" as const,
      color: "#0088cc",
      hoverColor: "#006da3",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      key: "discord" as const,
      color: "#5865F2",
      hoverColor: "#4752c4",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
    },
  ];

  const activePlatforms = platforms.filter(
    (p) => communityLinks?.[p.key]?.enabled && communityLinks[p.key]?.url,
  );
  const showCommunity = communityLinks?.enabled && activePlatforms.length > 0;

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{ background: "var(--indigo)" }}
    >
      {/* Geometric pattern top border */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
        >
          {/* Repeating diamond border */}
          {Array.from({ length: 72 }).map((_, i) => (
            <rect
              key={i}
              x={i * 20 + 5}
              y={10}
              width={10}
              height={10}
              fill="none"
              stroke="var(--terracotta)"
              strokeWidth={1}
              opacity={0.4}
              transform={`rotate(45 ${i * 20 + 10} 15)`}
            />
          ))}
          <line
            x1="0"
            y1="30"
            x2="1440"
            y2="30"
            stroke="var(--terracotta)"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-2">
            <Image
              src="/icon1.png"
              alt="البعاتي"
              width={80}
              height={80}
              className="opacity-80"
            />
          </div>

          <p
            className="text-sm mb-6"
            style={{ color: "var(--sand)", opacity: 0.5 }}
          >
            لعبة الذكاء والخداع السودانية
          </p>

          {/* Community Links */}
          {showCommunity && (
            <div className="mb-6">
              <p
                className="text-sm mb-3"
                style={{
                  fontFamily: "var(--font-reem-kufi)",
                  color: "var(--sand)",
                  opacity: 0.7,
                }}
              >
                انضم لمجتمع اللاعبين
              </p>
              <div className="flex items-center justify-center gap-4">
                {activePlatforms.map((p) => (
                  <a
                    key={p.key}
                    href={communityLinks![p.key]!.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110"
                    style={{ background: p.color }}
                  >
                    {p.icon}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Geometric divider */}
          <div className="flex items-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rotate-45"
                style={{
                  background: "var(--terracotta)",
                  opacity: 0.3 + i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-8 mb-8">
            {[
              { label: "كيف تلعب؟", href: "/how-to-play" },
              { label: "سياسة الخصوصية", href: "/privacy" },
              { label: "إرشادات المجتمع", href: "/community" },
              { label: "تواصل معنا", href: "/contact" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm transition-colors duration-300 hover:opacity-100"
                style={{ color: "var(--sand)", opacity: 0.5 }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs" style={{ color: "var(--sand)", opacity: 0.3 }}>
            &copy; {new Date().getFullYear()} البعاتي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function Design3Page() {
  return (
    <div
      className="geo-page"
      dir="rtl"
      style={{ fontFamily: "var(--font-cairo)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: patternStyles }} />
      <FloatingAccents />
      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <RolesSection />
      <HowToPlaySection />
      <FeaturesSection />
      <DownloadSection />
      <FooterSection />
    </div>
  );
}
