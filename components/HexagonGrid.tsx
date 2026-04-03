"use client";

import { useEffect, useRef, useState } from "react";

const colors = [
  { front: "#3e0000", back: "#2e0000" },
  { front: "#74300e", back: "#57240a" },
  { front: "#cba66d", back: "#987c51" },
  { front: "#ccccb0", back: "#999984" },
  { front: "#8fb3a2", back: "#6b8679" },
  { front: "#2b7e7d", back: "#205e5d" },
  { front: "#002020", back: "#001818" },
];

const HEX_WIDTH = 80;
const HEX_HEIGHT = HEX_WIDTH * (Math.sqrt(3) / 2);
const COL_WIDTH = HEX_WIDTH * 0.75;
const ROW_HEIGHT = HEX_HEIGHT;
const GAP = 3; // Gap between hexagons
const FLIP_DURATION_MS = 700;
const RETURN_DELAY_MS = 500;
const INTRO_DELAY_MS = 300;

function Hexagon({ 
  color, 
  style,
  revealTransparent,
  introDelayMs,
}: { 
  color: { front: string; back: string }; 
  style: React.CSSProperties;
  revealTransparent: boolean;
  introDelayMs: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const hoverStartRef = useRef<number | null>(null);
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseFlippedRef = useRef(false);

  useEffect(() => {
    if (revealTransparent) {
      introTimeoutRef.current = setTimeout(() => {
        baseFlippedRef.current = true;
        setFlipped(true);
      }, introDelayMs);
    }

    return () => {
      if (introTimeoutRef.current) {
        clearTimeout(introTimeoutRef.current);
      }
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, [revealTransparent, introDelayMs]);

  const handleMouseEnter = () => {
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = null;
    }
    hoverStartRef.current = Date.now();
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    const hoverStartedAt = hoverStartRef.current ?? Date.now();
    const elapsed = Date.now() - hoverStartedAt;
    const remainingForwardFlip = Math.max(0, FLIP_DURATION_MS - elapsed);

    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }

    returnTimeoutRef.current = setTimeout(() => {
      setFlipped(baseFlippedRef.current);
      returnTimeoutRef.current = null;
    }, remainingForwardFlip + RETURN_DELAY_MS);
  };

  return (
    <div
      className="absolute"
      style={{
        ...style,
        width: HEX_WIDTH - GAP,
        height: HEX_HEIGHT - GAP,
        perspective: "1000px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            backgroundColor: color.front,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
        {/* Back Face */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            backgroundColor: revealTransparent ? "transparent" : color.back,
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            transform: "rotateY(180deg)",
          }}
        />
      </div>
    </div>
  );
}

export default function HexagonGrid() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 350 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: 350 // Fixed height for the banner
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width === 0) return <div className="h-[350px] w-full bg-[#2a2626]" />;

  // Calculate number of columns and rows needed to fill the screen
  const cols = Math.ceil(dimensions.width / COL_WIDTH) + 2;
  const rows = Math.ceil(dimensions.height / ROW_HEIGHT) + 2;
  const revealHeights = [2, 3, 2, 3, 3, 3, 2, 3, 2];
  const revealStartCol = (Math.floor(cols / 2) - 5) & ~1;

  const hexagons = [];

  // Deterministic noise for repeatable layout patterns
  const getNoise = (c: number, r: number) => {
    const value = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      // Base progress on column position
      let colorProgress = col / (cols - 1);
      
      // Add Perlin-like noise to the progress so the edges blend organically
      const noise = getNoise(col, row) * 0.15 - 0.075; // +/- 7.5% noise
      colorProgress = Math.max(0, Math.min(1, colorProgress + noise));

      const colorIndex = Math.min(
        Math.floor(colorProgress * colors.length),
        colors.length - 1
      );
      
      const color = colors[colorIndex];
      
      const x = col * COL_WIDTH;
      let y = row * ROW_HEIGHT;
      
      // Offset odd columns
      if (col % 2 === 1) {
        y += ROW_HEIGHT / 2;
      }

      // Randomly skip some hexagons at the bottom to create a jagged edge
      const distanceToBottom = rows - row;
      const shouldSkip = distanceToBottom < 3 && getNoise(col, row + 100) > (distanceToBottom / 3);

      if (!shouldSkip) {
        const revealColIndex = col - revealStartCol;
        let revealTransparent = false;

        if (revealColIndex >= 0 && revealColIndex < revealHeights.length) {
          const revealHeight = revealHeights[revealColIndex];
          const columnOffsetY = col % 2 === 1 ? ROW_HEIGHT / 2 : 0;
          const centerRevealRow = Math.round((176 - columnOffsetY) / ROW_HEIGHT);
          const revealStartRow = centerRevealRow - Math.floor(revealHeight / 2);
          revealTransparent = row >= revealStartRow && row < revealStartRow + revealHeight;
        }

        const introDelayMs = INTRO_DELAY_MS;

        hexagons.push(
          <Hexagon
            key={`${col}-${row}`}
            color={color}
            revealTransparent={revealTransparent}
            introDelayMs={introDelayMs}
            style={{
              left: x - HEX_WIDTH / 2,
              top: y - HEX_HEIGHT / 2,
            }}
          />
        );
      }
    }
  }

  return (
    <div className="w-full h-[350px] overflow-hidden relative bg-[#2a2626] border-b border-zinc-300">
      <div className="absolute inset-0 z-0 flex items-center justify-center px-6 text-center pointer-events-none">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100">
            Peter D&apos;Amato
          </h1>
          <p className="font-body mt-4 text-sm sm:text-base md:text-lg text-zinc-300 tracking-wide">
            Data Storyteller | Full-Stack Developer | AI Engineer
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        {hexagons}
      </div>
    </div>
  );
}
