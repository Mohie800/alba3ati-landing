"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { roles, features, gameSteps, aboutHighlights } from "@/lib/data";

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
    { r: size * 0.14, segments: 6, color: "rgba(232,213,183,0.15)" },
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
              const nextIdx = (pi + Math.floor(ring.segments / 3)) % ring.segments;
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
   SECTION COMPONENTS
   ========================================================================== */

/* ---- HERO ---- */
function HeroSection() {
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
      <div className="absolute inset-0 pattern-stars" />

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
        {/* Decorative top element */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        >
          <EightPointStar size={48} color="var(--terracotta)" />
        </motion.div>

        {/* Title */}
        <motion.h1
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
        </motion.h1>

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
            className="geo-btn px-10 py-4 text-lg font-bold"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              background: "var(--terracotta)",
              color: "var(--sand-light)",
            }}
          >
            حمّل على iOS
          </button>
          <button
            className="geo-btn px-10 py-4 text-lg font-bold"
            style={{
              fontFamily: "var(--font-reem-kufi)",
              background: "rgba(232,213,183,0.1)",
              color: "var(--sand)",
              border: "2px solid var(--sand)",
              clipPath:
                "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
            }}
          >
            حمّل على Android
          </button>
        </motion.div>
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
          <rect x="0" y="115" width="1440" height="5" fill="var(--terracotta)" opacity="0.15" />
        </svg>
      </div>
    </section>
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
                animate={
                  isInView ? { scale: 1, rotate: 0 } : {}
                }
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
                    <span className="text-4xl">{h.icon}</span>
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
      <div className="zigzag-divider-terracotta" style={{ background: "var(--terracotta)" }}>
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
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-8" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
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
                animate={
                  isInView
                    ? { opacity: 1, rotate: 0, scale: 1 }
                    : {}
                }
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
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-8" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
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
                  animate={
                    isInView
                      ? { y: 0, opacity: 1, scale: 1 }
                      : {}
                  }
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
                        i % 2 === 0
                          ? "var(--indigo)"
                          : "var(--terracotta)",
                      clipPath: i % 2 === 0
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
                            i % 2 === 0
                              ? "var(--terracotta)"
                              : "var(--sand)",
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
                          <span className="text-2xl">{step.icon}</span>
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
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-8" style={{ background: "var(--terracotta)" }} />
              <div className="w-2 h-2 rotate-45" style={{ background: "var(--terracotta)" }} />
              <div className="h-[2px] w-12" style={{ background: "var(--terracotta)" }} />
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
                    <span className="text-2xl -rotate-45">{feature.icon}</span>
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
            <EightPointStar size={56} color="var(--sand)" />
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
              className="geo-btn px-12 py-5 text-xl font-bold"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                background: "var(--sand)",
                color: "var(--indigo)",
              }}
            >
              App Store
            </button>
            <button
              className="geo-btn px-12 py-5 text-xl font-bold"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                background: "transparent",
                color: "var(--sand)",
                border: "3px solid var(--sand)",
                clipPath:
                  "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
              }}
            >
              Google Play
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ---- FOOTER ---- */
function FooterSection() {
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
          {/* Logo and star */}
          <div className="flex items-center gap-3 mb-4">
            <EightPointStar size={24} color="var(--terracotta)" />
            <span
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-reem-kufi)",
                color: "var(--sand)",
              }}
            >
              البعاتي
            </span>
            <EightPointStar size={24} color="var(--terracotta)" />
          </div>

          <p
            className="text-sm mb-6"
            style={{ color: "var(--sand)", opacity: 0.5 }}
          >
            لعبة الذكاء والخداع السودانية
          </p>

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
              )
            )}
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--sand)", opacity: 0.3 }}
          >
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
      <AboutSection />
      <RolesSection />
      <HowToPlaySection />
      <FeaturesSection />
      <DownloadSection />
      <FooterSection />
    </div>
  );
}
