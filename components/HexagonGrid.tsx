"use client";

import { useEffect, useState } from "react";

const colors = [
  { front: "#3e0000", back: "#2e0000" },
  { front: "#74300e", back: "#57240a" },
  { front: "#cba66d", back: "#987c51" },
  { front: "#ccccb0", back: "#999984" },
  { front: "#8fb3a2", back: "#6b8679" },
  { front: "#2b7e7d", back: "#205e5d" },
  { front: "#002020", back: "#001818" },
];

const MOBILE_BREAKPOINT = 768;
const DESKTOP_HEX_WIDTH = 80;
const MOBILE_HEX_WIDTH = 60;
const DESKTOP_GAP = 3;
const MOBILE_GAP = 2;
const BANNER_HEIGHT = 420;
const NAME_ZONE_OPACITY = 0.2;

function StaticHexagon({
  color,
  style,
  hexWidth,
  hexHeight,
  gap,
  opacity = 1,
}: {
  color: { front: string; back: string };
  style: React.CSSProperties;
  hexWidth: number;
  hexHeight: number;
  gap: number;
  opacity?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...style,
        width: hexWidth - gap,
        height: hexHeight - gap,
        opacity,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: color.front,
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />
    </div>
  );
}

export default function HexagonGrid() {
  const [dimensions, setDimensions] = useState({ width: 0, height: BANNER_HEIGHT });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: BANNER_HEIGHT,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (dimensions.width === 0) {
    return <div className="h-[420px] w-full bg-[#fafafa]" />;
  }

  const isMobile = dimensions.width < MOBILE_BREAKPOINT;
  const hexWidth = isMobile ? MOBILE_HEX_WIDTH : DESKTOP_HEX_WIDTH;
  const hexHeight = hexWidth * (Math.sqrt(3) / 2);
  const colWidth = hexWidth * 0.75;
  const rowHeight = hexHeight;
  const gap = isMobile ? MOBILE_GAP : DESKTOP_GAP;

  const cols = Math.ceil(dimensions.width / colWidth) + 2;
  const rows = Math.ceil(dimensions.height / rowHeight) + 4;

  const revealHeights = [2, 3, 2, 3, 3, 3, 2, 3, 2];
  const revealStartCol = (Math.floor(cols / 2) - 5) & ~1;

  const hexagons = [];

  const getNoise = (c: number, r: number) => {
    const value = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const textCenterY = BANNER_HEIGHT * 0.46;
  const rowBelowNameY = textCenterY + rowHeight * 1.35;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let colorProgress = col / (cols - 1);
      const noise = getNoise(col, row) * 0.15 - 0.075;
      colorProgress = Math.max(0, Math.min(1, colorProgress + noise));

      const colorIndex = Math.min(
        Math.floor(colorProgress * colors.length),
        colors.length - 1
      );

      const color = colors[colorIndex];

      const x = col * colWidth;
      let y = row * rowHeight;

      if (col % 2 === 1) {
        y += rowHeight / 2;
      }

      y -= 4;

      const xProgress = col / Math.max(1, cols / 2 - 1);
      const centerLineY = 238 - xProgress * 92;
      const halfBandHeight = 188;
      const insideDiagonalMass =
        Math.abs(y - centerLineY) <= halfBandHeight ||
        Math.abs(y - rowBelowNameY) <= rowHeight * 0.55;

      const tileLeft = x - hexWidth / 2;
      const tileRight = tileLeft + hexWidth;
      const insideViewportX =
        !isMobile || (tileLeft >= 0 && tileRight <= dimensions.width);

      if (!insideDiagonalMass || !insideViewportX) continue;

      const revealColIndex = col - revealStartCol;
      let isRevealZone = false;

      if (revealColIndex >= 0 && revealColIndex < revealHeights.length) {
        const revealHeight = revealHeights[revealColIndex];
        const columnOffsetY = col % 2 === 1 ? rowHeight / 2 : 0;
        const centerRevealRow = Math.round((textCenterY - columnOffsetY) / rowHeight);
        const revealStartRow = centerRevealRow - Math.floor(revealHeight / 2);
        isRevealZone =
          row >= revealStartRow && row < revealStartRow + revealHeight;
      }

      hexagons.push(
        <StaticHexagon
          key={`${col}-${row}`}
          color={color}
          hexWidth={hexWidth}
          hexHeight={hexHeight}
          gap={gap}
          opacity={isRevealZone ? NAME_ZONE_OPACITY : 1}
          style={{
            left: tileLeft,
            top: y - hexHeight / 2,
          }}
        />
      );
    }
  }

  return (
    <div className="w-full h-[420px] relative bg-[#fafafa] overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] md:opacity-100">
        {hexagons}
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center px-6 text-center pointer-events-none">
        <div className="max-w-5xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-900 leading-[0.95]">
            Peter D&apos;Amato
          </h1>
          <p className="font-body mt-5 text-sm sm:text-base md:text-lg text-zinc-700 max-w-2xl mx-auto">
            Data Storyteller · Full-Stack Developer · AI Engineer
          </p>
        </div>
      </div>
    </div>
  );
}
