
import React from "react";
import { areaData } from "@/data/areas";

interface StaticMapProps {
  onSelectArea: (areaId: string) => void;
  selectedArea: string | null;
}

// Dimensiones base de la imagen
const IMG_WIDTH = 715;
const IMG_HEIGHT = 709;

const areaPolygons: Record<string, string> = {
  "area-1": "70,110 225,80 270,160 140,200",      // Polígono para área-1 (aleatorio)
  "area-2": "360,230 400,250 370,320 320,260",    // Polígono para área-2
  "area-3": "310,530 405,570 410,650 340,680 300,600", // Polígono para área-3
  "area-4": "500,330 590,350 600,450 530,430",    // Polígono para área-4
};

const areaColors: Record<string, string> = {
  "area-1": "hsla(142, 71%, 45%, 0.35)",
  "area-2": "hsla(196, 80%, 45%, 0.35)",
  "area-3": "hsla(37, 90%, 50%, 0.3)",
  "area-4": "hsla(272, 70%, 60%, 0.35)",
};

const StaticMap: React.FC<StaticMapProps> = ({ onSelectArea, selectedArea }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative"
        style={{
          width: IMG_WIDTH,
          height: IMG_HEIGHT,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        {/* Imagen base */}
        <img
          src="/lovable-uploads/09c9a901-122f-4fdf-92b7-9dec96fda0c1.png"
          alt="Mapa base"
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          className="rounded-lg shadow-md w-full h-full object-cover"
          draggable={false}
        />

        {/* SVG overlay con polígonos interactivos */}
        <svg
          viewBox={`0 0 ${IMG_WIDTH} ${IMG_HEIGHT}`}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
        >
          {areaData.map((area) => (
            <polygon
              key={area.id}
              points={areaPolygons[area.id]}
              fill={areaColors[area.id]}
              stroke={area.id === selectedArea ? "#fff" : "#222"}
              strokeWidth={area.id === selectedArea ? 4 : 2}
              style={{
                filter: area.id === selectedArea
                  ? "drop-shadow(0 0 8px #fff8)"
                  : "drop-shadow(0 1px 6px #222a)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              className="hover:opacity-80 pointer-events-auto area-highlight"
              onClick={() => onSelectArea(area.id)}
            />
          ))}
        </svg>

        {/* Nombres de las áreas (posiciones aproximadas) */}
        {areaData.map((area, idx) => {
          // Choose a label point roughly in the center of the polygon
          const labelPositions: Record<string, { x: number; y: number }> = {
            "area-1": { x: 150, y: 130 },
            "area-2": { x: 360, y: 260 },
            "area-3": { x: 370, y: 600 },
            "area-4": { x: 560, y: 400 },
          };
          const { x, y } = labelPositions[area.id];
          return (
            <div
              key={area.id + "-label"}
              className={`absolute select-none px-2 py-1 rounded-lg font-bold text-xs shadow-md text-white `}
              style={{
                left: x - 36,
                top: y - 16,
                background: area.id === selectedArea ? "#333c" : "#1117",
                border: area.id === selectedArea ? "2px solid #fff" : "1px solid #222c",
                zIndex: 2,
                pointerEvents: "none",
                transition: "all 0.2s",
                minWidth: 72,
                textAlign: "center",
              }}
            >
              {area.name}
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md z-10">
        <h2 className="text-sm font-semibold">DocuMapa</h2>
        <p className="text-xs text-muted-foreground">
          Haga clic en un área coloreada en el mapa para ver los documentos
        </p>
      </div>
    </div>
  );
};

export default StaticMap;
