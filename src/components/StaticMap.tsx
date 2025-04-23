import React, { useState, useEffect } from "react";
import { areaData } from "@/data/areas";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

interface StaticMapProps {
  onSelectArea: (areaId: string) => void;
  selectedArea: string | null;
  isEditMode?: boolean;
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

const StaticMap: React.FC<StaticMapProps> = ({ onSelectArea, selectedArea, isEditMode }) => {
  const [editablePolygons, setEditablePolygons] = useState(areaPolygons);
  const [dragPoint, setDragPoint] = useState<{ areaId: string; pointIndex: number } | null>(null);

  const handlePolygonPointDrag = (e: React.MouseEvent, areaId: string, pointIndex: number) => {
    if (!isEditMode) return;

    const svgElement = e.currentTarget.closest('svg');
    if (!svgElement) return;

    const rect = svgElement.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * IMG_WIDTH);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * IMG_HEIGHT);

    setEditablePolygons(prev => ({
      ...prev,
      [areaId]: prev[areaId].split(' ').map((point, idx) => {
        if (idx === pointIndex) {
          return `${x},${y}`;
        }
        return point;
      }).join(' ')
    }));
  };

  const handleSavePolygons = () => {
    // Aquí se implementaría la lógica para guardar los polígonos en el backend
    console.log('Polígonos guardados:', editablePolygons);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragPoint) return;

      const svgElement = document.querySelector('svg');
      if (!svgElement) return;

      const rect = svgElement.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * IMG_WIDTH);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * IMG_HEIGHT);

      setEditablePolygons(prev => ({
        ...prev,
        [dragPoint.areaId]: prev[dragPoint.areaId].split(' ').map((point, idx) => {
          if (idx === dragPoint.pointIndex) {
            return `${x},${y}`;
          }
          return point;
        }).join(' ')
      }));
    };

    const handleMouseUp = () => {
      setDragPoint(null);
    };

    if (dragPoint) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragPoint]);

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
        <img
          src="/lovable-uploads/09c9a901-122f-4fdf-92b7-9dec96fda0c1.png"
          alt="Mapa base"
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          className={`rounded-lg shadow-md w-full h-full object-cover transition-all duration-300 ${
            selectedArea ? 'opacity-40' : 'opacity-100'
          }`}
          draggable={false}
        />

        <svg
          viewBox={`0 0 ${IMG_WIDTH} ${IMG_HEIGHT}`}
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
        >
          {areaData.map((area) => (
            <g key={area.id}>
              <polygon
                points={editablePolygons[area.id]}
                fill={areaColors[area.id]}
                stroke={area.id === selectedArea ? "#fff" : "#222"}
                strokeWidth={area.id === selectedArea ? 4 : 2}
                style={{
                  filter: area.id === selectedArea
                    ? "drop-shadow(0 0 8px #fff8)"
                    : "drop-shadow(0 1px 6px #222a)",
                  cursor: isEditMode ? "default" : "pointer",
                  transition: "all 0.3s",
                  opacity: selectedArea ? (area.id === selectedArea ? 1 : 0.3) : 1
                }}
                className="hover:opacity-80 pointer-events-auto area-highlight"
                onClick={() => !isEditMode && onSelectArea(area.id)}
              />
              
              {isEditMode && editablePolygons[area.id].split(' ').map((point, idx) => {
                const [x, y] = point.split(',').map(Number);
                return (
                  <circle
                    key={`${area.id}-point-${idx}`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill="white"
                    stroke="#000"
                    strokeWidth={2}
                    style={{ cursor: 'move' }}
                    className="pointer-events-auto"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragPoint({ areaId: area.id, pointIndex: idx });
                    }}
                  />
                );
              })}
            </g>
          ))}
        </svg>

        {/* Nombres de las áreas */}
        {areaData.map((area) => {
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
              className={`absolute select-none px-2 py-1 rounded-lg font-bold text-xs shadow-md text-white transition-all duration-300 ${
                selectedArea && area.id !== selectedArea ? 'opacity-30' : 'opacity-100'
              }`}
              style={{
                left: x - 36,
                top: y - 16,
                background: area.id === selectedArea ? "#333c" : "#1117",
                border: area.id === selectedArea ? "2px solid #fff" : "1px solid #222c",
                zIndex: 2,
                pointerEvents: "none",
                minWidth: 72,
                textAlign: "center",
              }}
            >
              {area.name}
            </div>
          );
        })}
      </div>

      {isEditMode && (
        <Button
          className="absolute top-4 right-4 z-10"
          onClick={handleSavePolygons}
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar cambios
        </Button>
      )}

      <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md z-10">
        <h2 className="text-sm font-semibold">DocuMapa</h2>
        <p className="text-xs text-muted-foreground">
          {isEditMode 
            ? "Arrastra los puntos blancos para modificar las áreas" 
            : "Haga clic en áreas coloreadas para ver documentos"
          }
        </p>
      </div>
    </div>
  );
};

export default StaticMap;
