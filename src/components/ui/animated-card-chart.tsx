"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// --- Card Components ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-900 dark:bg-black",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 border-t border-zinc-200 p-4 dark:border-zinc-900",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-black dark:text-white",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[180px] w-full overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Visual3 Component and its Sub-components ---
interface Visual3Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual3({
  mainColor = "#8b5cf6",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
}: Visual3Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            "--color": mainColor,
            "--secondary-color": secondaryColor,
          } as React.CSSProperties
        }
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <Layer4
          color={mainColor}
          secondaryColor={secondaryColor}
          hovered={hovered}
        />
        <Layer3 color={mainColor} />
        <Layer2 color={mainColor} />
        <Layer1 color={mainColor} secondaryColor={secondaryColor} />
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

interface LayerProps {
  color: string;
  secondaryColor?: string;
  hovered?: boolean;
}

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        className="h-full w-full"
        viewBox="0 0 356 180"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
        <defs>
          <radialGradient
            id="paint0_radial_12_207"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.25" />
            <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer1: React.FC<LayerProps> = ({ color, secondaryColor }) => {
  return (
    <div
      className="absolute top-4 left-4 z-[8] flex items-center gap-1"
      style={
        {
          "--color": color,
          "--secondary-color": secondaryColor,
        } as React.CSSProperties
      }
    >
      {/* Дефолтное состояние — исчезает при ховере */}
      <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0 dark:border-zinc-800 dark:bg-black/25">
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--color)]" />
        <span className="ml-1 text-[10px] text-black dark:text-white">
          9 энтузиастов
        </span>
      </div>
      <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0 dark:border-zinc-800 dark:bg-black/25">
        <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
        <span className="ml-1 text-[10px] text-black dark:text-white">
          241 не начали
        </span>
      </div>
      {/* Hover-состояние — появляется при ховере */}
      <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-100">
        <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/25">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color)]" />
          <span className="ml-1 text-[10px] text-black dark:text-white">
            250 вовлечены
          </span>
        </div>
      </div>
    </div>
  );
};

const Layer2: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      className="group relative h-full w-full"
      style={{ "--color": color } as React.CSSProperties}
    >
      <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[7] flex w-full translate-y-full items-start justify-center bg-transparent p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
        <div className="ease-[cubic-bezier(0.6, 0, 1)] rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100 dark:border-zinc-800 dark:bg-black/25">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
            <p className="text-xs text-black dark:text-white">
              После программы обучения
            </p>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Вся компания использует ИИ
          </p>
        </div>
      </div>
    </div>
  );
};

const Layer3: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex translate-y-full items-center justify-center opacity-0 transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100">
      <svg
        className="h-full w-full"
        viewBox="0 0 356 180"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint0_linear_29_3)" />
        <defs>
          <linearGradient
            id="paint0_linear_29_3"
            x1="178"
            y1="0"
            x2="178"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.35" stopColor={color} stopOpacity="0" />
            <stop offset="1" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Layer4: React.FC<LayerProps> = ({ color, secondaryColor, hovered }) => {
  const rectsData = [
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 20,
      hoverY: 130,
      x: 40,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 20,
      y: 90,
      hoverHeight: 20,
      hoverY: 130,
      x: 60,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 40,
      y: 70,
      hoverHeight: 30,
      hoverY: 120,
      x: 80,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 50,
      hoverY: 100,
      x: 100,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 110,
      hoverHeight: 40,
      hoverY: 110,
      x: 120,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 110,
      hoverHeight: 20,
      hoverY: 130,
      x: 140,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 60,
      hoverHeight: 30,
      hoverY: 120,
      x: 160,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 20,
      hoverY: 130,
      x: 180,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 40,
      hoverY: 110,
      x: 200,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 40,
      y: 70,
      hoverHeight: 60,
      hoverY: 90,
      x: 220,
      fill: color,
      hoverFill: color,
    },
    {
      width: 15,
      height: 30,
      y: 110,
      hoverHeight: 70,
      hoverY: 80,
      x: 240,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 50,
      y: 110,
      hoverHeight: 50,
      hoverY: 100,
      x: 260,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 20,
      y: 110,
      hoverHeight: 80,
      hoverY: 70,
      x: 280,
      fill: "currentColor",
      hoverFill: secondaryColor,
    },
    {
      width: 15,
      height: 30,
      y: 80,
      hoverHeight: 90,
      hoverY: 60,
      x: 300,
      fill: color,
      hoverFill: color,
    },
  ];

  return (
    <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[8] flex h-full w-full items-center justify-center text-neutral-800/10 transition-transform duration-500 group-hover/animated-card:scale-150 dark:text-white/15">
      <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {rectsData.map((rect, index) => (
          <rect
            key={index}
            width={rect.width}
            height={hovered ? rect.hoverHeight : rect.height}
            x={rect.x}
            y={hovered ? rect.hoverY : rect.y}
            fill={hovered ? rect.hoverFill : rect.fill}
            rx="2"
            ry="2"
            className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] transition-all duration-500"
          />
        ))}
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════════════
// Visual1 — "Нет приоритета" (стрелки веером → сходятся)
// ═══════════════════════════════════════════════════

interface VisualBaseProps {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual1({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        {/* Контент — стрелки и чипы */}
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="xMidYMid meet" fill="none">
            <defs>
              <marker id="arrowV1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M1 1 L7 4 L1 7" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
              <marker id="arrowV1h" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M1 1 L7 4 L1 7" stroke={mainColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            {/* Центральная точка — при ховере увеличивается (фокус найден) */}
            <circle cx="178" cy="90" r={hovered ? 20 : 12} fill={mainColor} opacity={hovered ? 0.18 : 0.12} className="transition-all duration-500" />
            <circle cx="178" cy="90" r={hovered ? 6 : 4} fill={mainColor} className="transition-all duration-500" />

            {/* Стрелки: default — от центра к чипам, hover — от чипов к центру (все сходятся) */}
            {/* Маркетинг (верх-лево) */}
            <line x1={hovered ? "90" : "168"} y1={hovered ? "35" : "80"} x2={hovered ? "164" : "90"} y2={hovered ? "82" : "35"} stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1.5" markerEnd={hovered ? "url(#arrowV1h)" : "url(#arrowV1)"} className="transition-all duration-500" />
            {/* ИТ (верх-право) */}
            <line x1={hovered ? "270" : "192"} y1={hovered ? "30" : "80"} x2={hovered ? "192" : "270"} y2={hovered ? "80" : "30"} stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1.5" markerEnd={hovered ? "url(#arrowV1h)" : "url(#arrowV1)"} className="transition-all duration-500" />
            {/* Финансы (низ-лево) */}
            <line x1={hovered ? "90" : "168"} y1={hovered ? "145" : "100"} x2={hovered ? "164" : "90"} y2={hovered ? "100" : "145"} stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1.5" markerEnd={hovered ? "url(#arrowV1h)" : "url(#arrowV1)"} className="transition-all duration-500" />
            {/* HR (низ-право) */}
            <line x1={hovered ? "270" : "192"} y1={hovered ? "148" : "100"} x2={hovered ? "192" : "270"} y2={hovered ? "100" : "148"} stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1.5" markerEnd={hovered ? "url(#arrowV1h)" : "url(#arrowV1)"} className="transition-all duration-500" />

            {/* Чипы — все исчезают при ховере (фокус на центре) */}
            <g className="transition-all duration-500" opacity={hovered ? "0" : "1"}>
              <rect x="20" y="22" width="65" height="24" rx="12" fill="#f3f4f6" />
              <text x="52" y="38" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">Маркетинг</text>
            </g>
            <g className="transition-all duration-500" opacity={hovered ? "0" : "1"}>
              <rect x="270" y="16" width="50" height="24" rx="12" fill="#f3f4f6" />
              <text x="295" y="32" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">ИТ</text>
            </g>
            <g className="transition-all duration-500" opacity={hovered ? "0" : "1"}>
              <rect x="20" y="132" width="65" height="24" rx="12" fill="#f3f4f6" />
              <text x="52" y="148" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">Финансы</text>
            </g>
            <g className="transition-all duration-500" opacity={hovered ? "0" : "1"}>
              <rect x="270" y="136" width="50" height="24" rx="12" fill="#f3f4f6" />
              <text x="295" y="152" textAnchor="middle" fontSize="10" fill="#4b5563" fontFamily="sans-serif">HR</text>
            </g>
          </svg>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
            <span className="ml-1 text-[10px] text-black">4 отдела тянут</span>
          </div>
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">0 решений</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">1 приоритет</span>
            </div>
          </div>
        </div>
        {/* Тултип */}
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Стратегическая сессия</p>
              </div>
              <p className="text-xs text-neutral-500">Приоритеты расставлены</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// Visual2 — "Нет первого пилота" (список идей → запуск)
// ═══════════════════════════════════════════════════

export function Visual2({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  const ideas = [
    "ИИ-ассистент для продаж",
    "Автоматизация отчётности",
    "Чат-бот поддержки",
  ];

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        {/* Контент — список идей */}
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center px-8">
          <div className="flex w-full max-w-[280px] flex-col gap-2">
            {ideas.map((idea, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-500"
                style={{
                  backgroundColor: hovered && i === 0 ? `${mainColor}10` : "rgba(243,244,246,0.8)",
                  borderLeft: "2px solid transparent",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded transition-all duration-500"
                    style={{
                      borderWidth: hovered && i === 0 ? "0" : "1.5px",
                      borderColor: hovered && i === 0 ? "transparent" : "#d1d5db",
                      backgroundColor: hovered && i === 0 ? mainColor : "transparent",
                    }}
                  >
                    {hovered && i === 0 && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-600">{idea}</span>
                </div>
                <span
                  className="text-[9px] rounded px-1.5 py-0.5 transition-all duration-500"
                  style={{
                    backgroundColor: hovered && i === 0 ? `${mainColor}15` : "rgba(255,255,255,0.8)",
                    color: hovered && i === 0 ? mainColor : "#9ca3af",
                  }}
                >
                  {hovered && i === 0 ? "запущен" : i === 0 ? "отложено" : i === 1 ? "нет владельца" : "не прошёл ИБ"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
            <span className="ml-1 text-[10px] text-black">3 идеи</span>
          </div>
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">0 запущено</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">первый пилот</span>
            </div>
          </div>
        </div>
        {/* Тултип */}
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Цифровой каркас</p>
              </div>
              <p className="text-xs text-neutral-500">Первый пилот в работе</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualTeam — "Нет команды" (силуэты серые → оранжевые)
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
// Утилита: точка пересечения линии с границей прямоугольника
// ═══════════════════════════════════════════════════

function rectEdgePoint(
  cx: number, cy: number, // центр прямоугольника
  hw: number, hh: number, // полуширина и полувысота
  fromX: number, fromY: number, // откуда идёт линия
  gap: number = 2 // отступ от границы
): { x: number; y: number } {
  const dx = fromX - cx;
  const dy = fromY - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };

  const scaleX = dx !== 0 ? (hw + gap) / Math.abs(dx) : Infinity;
  const scaleY = dy !== 0 ? (hh + gap) / Math.abs(dy) : Infinity;
  const scale = Math.min(scaleX, scaleY);

  return { x: cx + dx * scale, y: cy + dy * scale };
}

// ═══════════════════════════════════════════════════
// VisualWorkspace — "AI-рабочее место" (иконки инструментов → загораются)
// ═══════════════════════════════════════════════════

export function VisualWorkspace({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  const tools = [
    { cx: 90, cy: 55, icon: "chat" },
    { cx: 178, cy: 55, icon: "brain" },
    { cx: 266, cy: 55, icon: "doc" },
    { cx: 130, cy: 115, icon: "template" },
    { cx: 226, cy: 115, icon: "agent" },
  ];

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="xMidYMid meet" fill="none">
            {/* Связующие линии от центра до границы прямоугольника */}
            {tools.map((t, i) => {
              const edge = rectEdgePoint(t.cx, t.cy, 20, 16, 178, 90);
              return (
                <line
                  key={`line-${i}`}
                  x1="178" y1="90" x2={edge.x} y2={edge.y}
                  stroke={hovered ? mainColor : "#e5e7eb"}
                  strokeWidth="1"
                  opacity={hovered ? "0.4" : "0.3"}
                  className="transition-all duration-500"
                />
              );
            })}
            {/* Иконки инструментов */}
            {tools.map((t, i) => {
              const isActive = hovered;
              return (
                <g key={i} className="transition-all duration-500">
                  <rect
                    x={t.cx - 20} y={t.cy - 16} width="40" height="32" rx="8"
                    fill={isActive ? `${mainColor}15` : "#f9fafb"}
                    stroke={isActive ? mainColor : "#e5e7eb"}
                    strokeWidth={isActive ? "1.5" : "1"}
                    className="transition-all duration-500"
                  />
                  {t.icon === "chat" && (
                    <path d={`M${t.cx - 6} ${t.cy - 5} h12 v8 h-8 l-4 4 v-4 h0 z`} stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1.2" fill="none" className="transition-all duration-500" />
                  )}
                  {t.icon === "brain" && (
                    <circle cx={t.cx} cy={t.cy} r="6" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1.2" fill="none" className="transition-all duration-500" />
                  )}
                  {t.icon === "doc" && (
                    <>
                      <rect x={t.cx - 5} y={t.cy - 7} width="10" height="14" rx="1.5" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1.2" fill="none" className="transition-all duration-500" />
                      <line x1={t.cx - 2} y1={t.cy - 2} x2={t.cx + 3} y2={t.cy - 2} stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="0.8" className="transition-all duration-500" />
                      <line x1={t.cx - 2} y1={t.cy + 1} x2={t.cx + 3} y2={t.cy + 1} stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="0.8" className="transition-all duration-500" />
                    </>
                  )}
                  {t.icon === "template" && (
                    <>
                      <rect x={t.cx - 6} y={t.cy - 6} width="5" height="5" rx="1" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1" fill={isActive ? `${mainColor}30` : "none"} className="transition-all duration-500" />
                      <rect x={t.cx + 1} y={t.cy - 6} width="5" height="5" rx="1" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1" fill="none" className="transition-all duration-500" />
                      <rect x={t.cx - 6} y={t.cy + 1} width="5" height="5" rx="1" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1" fill="none" className="transition-all duration-500" />
                      <rect x={t.cx + 1} y={t.cy + 1} width="5" height="5" rx="1" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1" fill={isActive ? `${mainColor}30` : "none"} className="transition-all duration-500" />
                    </>
                  )}
                  {t.icon === "agent" && (
                    <>
                      <circle cx={t.cx} cy={t.cy - 2} r="4" stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1.2" fill="none" className="transition-all duration-500" />
                      <path d={`M${t.cx - 3} ${t.cy + 5} Q${t.cx} ${t.cy + 2} ${t.cx + 3} ${t.cy + 5}`} stroke={isActive ? mainColor : "#9ca3af"} strokeWidth="1.2" fill="none" className="transition-all duration-500" />
                    </>
                  )}
                </g>
              );
            })}
            {/* Центральная точка */}
            <circle cx="178" cy="90" r={hovered ? 5 : 3} fill={mainColor} opacity={hovered ? 0.6 : 0.3} className="transition-all duration-500" />
          </svg>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">до хакатона</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">настроено</span>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualAgent — "Работающий ИИ-агент" (узлы workflow → активируются)
// ═══════════════════════════════════════════════════

export function VisualAgent({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  const nodes = [
    { x: 50, y: 90, label: "Вход" },
    { x: 130, y: 55, label: "Анализ" },
    { x: 130, y: 125, label: "Данные" },
    { x: 220, y: 90, label: "Агент" },
    { x: 300, y: 90, label: "Ответ" },
  ];

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
  ];

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="xMidYMid meet" fill="none">
            <defs>
              <marker id="arrowAgent" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M1 1 L5 3 L1 5" stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1" fill="none" strokeLinecap="round" className="transition-all duration-500" />
              </marker>
              <marker id="arrowAgentActive" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M1 1 L5 3 L1 5" stroke={mainColor} strokeWidth="1" fill="none" strokeLinecap="round" />
              </marker>
            </defs>
            {/* Рёбра — от края одного узла до края другого */}
            {edges.map(([from, to], i) => {
              const f = nodes[from];
              const t = nodes[to];
              const start = rectEdgePoint(f.x, f.y, 22, 14, t.x, t.y);
              const end = rectEdgePoint(t.x, t.y, 22, 14, f.x, f.y);
              return (
                <line
                  key={`edge-${i}`}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke={hovered ? mainColor : "#d1d5db"}
                  strokeWidth={hovered ? "1.5" : "1"}
                  markerEnd={hovered ? "url(#arrowAgentActive)" : "url(#arrowAgent)"}
                  className="transition-all duration-500"
                />
              );
            })}
            {/* Узлы */}
            {nodes.map((n, i) => {
              const isCenter = i === 3;
              return (
                <g key={i}>
                  <rect
                    x={n.x - 22} y={n.y - 14} width="44" height="28" rx="6"
                    fill={hovered ? (isCenter ? `${mainColor}20` : `${mainColor}10`) : "#f9fafb"}
                    stroke={hovered ? mainColor : "#e5e7eb"}
                    strokeWidth={hovered && isCenter ? "2" : "1"}
                    className="transition-all duration-500"
                  />
                  <text
                    x={n.x} y={n.y + 4}
                    textAnchor="middle" fontSize="9"
                    fill={hovered ? "#1f2937" : "#9ca3af"}
                    fontFamily="sans-serif"
                    className="transition-all duration-500"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
            {/* Пульсирующая точка на центральном узле */}
            {hovered && (
              <circle cx="220" cy="90" r="3" fill={mainColor}>
                <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
          </svg>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">ещё не собран</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">собран и работает</span>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualCase — "Решённый бизнес-кейс" (задача → решение)
// ═══════════════════════════════════════════════════

export function VisualCase({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center px-6">
          <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="xMidYMid meet" fill="none">
            {/* Карточка задачи (слева) */}
            <rect
              x="40" y="35" width="120" height="110" rx="10"
              fill={hovered ? `${mainColor}08` : "#f9fafb"}
              stroke={hovered ? mainColor : "#e5e7eb"}
              strokeWidth={hovered ? "1.5" : "1"}
              className="transition-all duration-500"
            />
            {/* Заголовок задачи */}
            <rect x="55" y="52" width="60" height="6" rx="3" fill={hovered ? mainColor : "#d1d5db"} opacity={hovered ? "0.5" : "0.6"} className="transition-all duration-500" />
            <rect x="55" y="65" width="90" height="4" rx="2" fill="#e5e7eb" opacity="0.8" />
            <rect x="55" y="75" width="75" height="4" rx="2" fill="#e5e7eb" opacity="0.6" />
            <rect x="55" y="85" width="82" height="4" rx="2" fill="#e5e7eb" opacity="0.4" />
            {/* Статус задачи */}
            <rect
              x="55" y="105" width="50" height="18" rx="9"
              fill={hovered ? `${mainColor}15` : "#f3f4f6"}
              className="transition-all duration-500"
            />
            <text
              x="80" y="117"
              textAnchor="middle" fontSize="8"
              fill={hovered ? mainColor : "#9ca3af"}
              fontFamily="sans-serif"
              className="transition-all duration-500"
            >
              {hovered ? "решено" : "в работе"}
            </text>

            {/* Стрелка между карточками */}
            <path
              d="M172 90 L192 90"
              stroke={hovered ? mainColor : "#d1d5db"}
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            <path
              d="M188 85 L194 90 L188 95"
              stroke={hovered ? mainColor : "#d1d5db"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="transition-all duration-500"
            />

            {/* Карточка решения (справа) */}
            <rect
              x="200" y="35" width="120" height="110" rx="10"
              fill={hovered ? `${mainColor}08` : "#f9fafb"}
              stroke={hovered ? mainColor : "#e5e7eb"}
              strokeWidth={hovered ? "1.5" : "1"}
              className="transition-all duration-500"
            />
            {/* Контент решения — появляется при ховере */}
            <g opacity={hovered ? "1" : "0.3"} className="transition-all duration-500">
              {/* Галочка */}
              <circle cx="260" cy="70" r="14" fill={hovered ? `${mainColor}15` : "#f3f4f6"} className="transition-all duration-500" />
              <path
                d="M253 70 L258 75 L268 65"
                stroke={hovered ? mainColor : "#d1d5db"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="transition-all duration-500"
              />
              {/* Метрика */}
              <text
                x="260" y="102"
                textAnchor="middle" fontSize="11" fontWeight="600"
                fill={hovered ? mainColor : "#d1d5db"}
                fontFamily="sans-serif"
                className="transition-all duration-500"
              >
                1.5 часа
              </text>
              <text
                x="260" y="118"
                textAnchor="middle" fontSize="8"
                fill={hovered ? "#6b7280" : "#d1d5db"}
                fontFamily="sans-serif"
                className="transition-all duration-500"
              >
                от задачи до решения
              </text>
            </g>
          </svg>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">задача</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">решение готово</span>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

export function VisualTeam({
  mainColor = "#ff5331",
  secondaryColor: _secondaryColor = "#f54900",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);

  const people = [
    { cx: 60, cy: 70 },
    { cx: 110, cy: 70 },
    { cx: 160, cy: 70 },
    { cx: 210, cy: 70 },
    { cx: 260, cy: 70 },
    { cx: 85, cy: 120 },
    { cx: 135, cy: 120 },
    { cx: 185, cy: 120 },
    { cx: 235, cy: 120 },
  ];

  return (
    <>
      <div
        className="absolute inset-0 z-20"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        {/* Контент — силуэты */}
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" fill="none">
            {people.map((p, i) => {
              const isActive = hovered && i < 5;
              return (
                <g key={i} className="transition-all duration-500">
                  <circle
                    cx={p.cx} cy={p.cy - 12} r="10"
                    stroke={isActive ? mainColor : "#9ca3af"}
                    strokeWidth={isActive ? "2" : "1.5"}
                    fill="none"
                    opacity={isActive ? "1" : "0.7"}
                    className="transition-all duration-500"
                  />
                  <path
                    d={`M${p.cx - 14} ${p.cy + 14} Q${p.cx} ${p.cy} ${p.cx + 14} ${p.cy + 14}`}
                    stroke={isActive ? mainColor : "#9ca3af"}
                    strokeWidth={isActive ? "2" : "1.5"}
                    strokeLinecap="round"
                    fill="none"
                    opacity={isActive ? "1" : "0.7"}
                    className="transition-all duration-500"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <Layer3 color={mainColor} />
        {/* Бейджи */}
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">240 слышали</span>
          </div>
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
            <span className="ml-1 text-[10px] text-black">0 умеют</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">12 в команде</span>
            </div>
          </div>
        </div>
        {/* Тултип */}
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">После хакатона</p>
              </div>
              <p className="text-xs text-neutral-500">Команда готова к внедрению</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualMatrix — "Матрица ИИ-зрелости" (сетка ячеек → заполняются)
// ═══════════════════════════════════════════════════

export function VisualMatrix({
  mainColor = "#ff5331",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const cells = [
    { label: "HR", delay: 0 },
    { label: "Фин", delay: 80 },
    { label: "Марк", delay: 160 },
    { label: "Прод", delay: 40 },
    { label: "ИТ", delay: 120 },
    { label: "Лог", delay: 200 },
  ];
  return (
    <>
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <div className="grid grid-cols-3 gap-2.5 p-6">
            {cells.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-center w-[72px] h-[48px] rounded-lg border text-[11px] font-medium transition-all duration-500 group-hover/animated-card:[border-color:var(--mc)] group-hover/animated-card:[background-color:var(--mc-bg)] group-hover/animated-card:[color:var(--mc)]"
                style={{
                  "--mc": mainColor,
                  "--mc-bg": `${mainColor}18`,
                  transitionDelay: `var(--delay)`,
                  borderColor: "#e5e7eb",
                  backgroundColor: "#f9fafb",
                  color: "#9ca3af",
                } as React.CSSProperties & Record<string, string>}
              >
                <span className="group-hover/animated-card:hidden">{c.label}</span>
                <span className="hidden group-hover/animated-card:inline">✓</span>
              </div>
            ))}
          </div>
        </div>
        <Layer3 color={mainColor} />
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">не оценено</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">оценка готова</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Цифровой каркас</p>
              </div>
              <p className="text-xs text-neutral-500">6 процессов оценены</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualPilot — "1–2 пилота готовых к старту"
// ═══════════════════════════════════════════════════

export function VisualPilot({
  mainColor = "#ff5331",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);
  const ideas = [
    { title: "Автоматизация отчётов" },
    { title: "ИИ-ассистент продаж" },
    { title: "Анализ обращений" },
  ];
  return (
    <>
      <div className="absolute inset-0 z-20" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center px-8">
          <div className="w-full max-w-[280px] space-y-2">
            {ideas.map((idea, i) => {
              const active = hovered && i === 0;
              return (
                <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2 transition-all duration-500"
                  style={{ borderColor: active ? mainColor : "#e5e7eb", backgroundColor: active ? `${mainColor}12` : "#fff" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                      style={{ borderColor: active ? mainColor : "#d1d5db" }}>
                      {active && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: mainColor }} />}
                    </div>
                    <span className="text-[11px] font-medium text-gray-700">{idea.title}</span>
                  </div>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full transition-all duration-500"
                    style={{ backgroundColor: active ? `${mainColor}20` : "#f3f4f6", color: active ? mainColor : "#9ca3af" }}>
                    {active ? "запущен" : "черновик"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <Layer3 color={mainColor} />
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">3 идеи</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">пилот выбран</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Цифровой каркас</p>
              </div>
              <p className="text-xs text-neutral-500">Первый пилот готов к старту</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualBlockers — "Карта блокеров" (узлы → разрешены)
// ═══════════════════════════════════════════════════

export function VisualBlockers({
  mainColor = "#ff5331",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);
  const nodes = [
    { cx: 100, cy: 50, label: "Security" },
    { cx: 256, cy: 50, label: "Data" },
    { cx: 178, cy: 130, label: "Finance" },
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [0, 2]];
  const hw = 32, hh = 14;
  return (
    <>
      <div className="absolute inset-0 z-20" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 356 180" preserveAspectRatio="xMidYMid meet" fill="none">
            {edges.map(([a, b], i) => {
              const from = nodes[a], to = nodes[b];
              const p1 = rectEdgePoint(from.cx, from.cy, hw, hh, to.cx, to.cy, 3);
              const p2 = rectEdgePoint(to.cx, to.cy, hw, hh, from.cx, from.cy, 3);
              return (
                <line key={`edge-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={hovered ? mainColor : "#d1d5db"} strokeWidth="1.5"
                  strokeDasharray={hovered ? "0" : "4 3"} className="transition-all duration-500" />
              );
            })}
            {nodes.map((n, i) => (
              <g key={i}>
                <rect x={n.cx - hw} y={n.cy - hh} width={hw * 2} height={hh * 2} rx="8"
                  fill={hovered ? `${mainColor}15` : "#fef2f2"} stroke={hovered ? mainColor : "#fca5a5"}
                  strokeWidth="1.5" className="transition-all duration-500" />
                <text x={n.cx} y={n.cy + 4} textAnchor="middle" fontSize="10" fontWeight="500"
                  fill={hovered ? mainColor : "#9ca3af"} className="transition-all duration-500">
                  {hovered ? "✓" : n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <Layer3 color={mainColor} />
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="ml-1 text-[10px] text-black">3 блокера</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">путь свободен</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Цифровой каркас</p>
              </div>
              <p className="text-xs text-neutral-500">Блокеры согласованы</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════
// VisualRoadmap — "Дорожная карта" (4 недели → заполняются)
// ═══════════════════════════════════════════════════

export function VisualRoadmap({
  mainColor = "#ff5331",
  gridColor = "#80808015",
}: VisualBaseProps) {
  const [hovered, setHovered] = useState(false);
  const weeks = [
    { label: "Нед. 1", desc: "Согласование" },
    { label: "Нед. 2", desc: "Данные" },
    { label: "Нед. 3", desc: "Прототип" },
    { label: "Нед. 4", desc: "Запуск" },
  ];
  return (
    <>
      <div className="absolute inset-0 z-20" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
      <div className="relative h-full w-full overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 z-[8] flex h-full w-full items-center justify-center px-6">
          <div className="w-full max-w-[290px] space-y-1.5">
            {weeks.map((w, i) => {
              const active = hovered || i === 0;
              return (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[10px] font-medium w-12 text-right flex-shrink-0 transition-all duration-500"
                    style={{ color: active ? "#374151" : "#d1d5db", transitionDelay: hovered ? `${i * 100}ms` : "0ms" }}>
                    {w.label}
                  </span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden relative">
                    <div className="h-full rounded-md transition-all duration-700 ease-out"
                      style={{
                        width: hovered || i === 0 ? "100%" : "0%",
                        backgroundColor: `${mainColor}${i === 3 ? "40" : i === 2 ? "30" : i === 1 ? "25" : "20"}`,
                        transitionDelay: hovered ? `${i * 120}ms` : "0ms",
                      }} />
                    <span className="absolute inset-0 flex items-center px-2 text-[9px] font-medium transition-all duration-500"
                      style={{ color: active ? "#374151" : "transparent", transitionDelay: hovered ? `${i * 100 + 100}ms` : "0ms" }}>
                      {w.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Layer3 color={mainColor} />
        <div className="absolute top-4 left-4 z-[9] flex items-center gap-1">
          <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm transition-opacity duration-300 group-hover/animated-card:opacity-0">
            <div className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
            <span className="ml-1 text-[10px] text-black">неделя 1</span>
          </div>
          <div className="absolute top-0 left-0 flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover/animated-card:opacity-100">
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 bg-white/25 px-1.5 py-0.5 backdrop-blur-sm">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mainColor }} />
              <span className="ml-1 text-[10px] text-black">план на 4 недели</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-[7] flex h-full w-full items-start justify-center">
          <div className="ease-[cubic-bezier(0.6,0.6,0,1)] translate-y-full p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
            <div className="rounded-md border border-zinc-200 bg-white/25 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/animated-card:opacity-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: mainColor }} />
                <p className="text-xs text-black">Цифровой каркас</p>
              </div>
              <p className="text-xs text-neutral-500">Дорожная карта готова</p>
            </div>
          </div>
        </div>
        <EllipseGradient color={mainColor} />
        <GridLayer color={gridColor} />
      </div>
    </>
  );
}
