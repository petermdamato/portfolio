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

function Hexagon({ 
  color, 
  style 
}: { 
  color: { front: string; back: string }; 
  style: React.CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);
  const hoverStartRef = useRef<number | null>(null);
  const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, []);

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
      setFlipped(false);
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
            backgroundColor: color.back,
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

  const hexagons = [];

  // Generate some random noise so the gradient isn't perfectly straight
  // We use a simple seeded random approach based on row/col for consistency
  const getNoise = (c: number, r: number) => {
    return Math.sin(c * 12.9898 + r * 78.233) * 43758.5453 % 1;
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
        hexagons.push(
          <Hexagon
            key={`${col}-${row}`}
            color={color}
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
    <div className="w-full h-[350px] overflow-hidden relative bg-[#2a2626] border-b border-gray-200 dark:border-gray-800">
      <div className="absolute inset-0">
        {hexagons}
      </div>
      
      {/* Subtle overlay gradient to blend it into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#ffffff] dark:to-[#0a0a0a] pointer-events-none opacity-50" />
    </div>
  );
}
