
import React from "react";
import { areaData } from "@/data/areas";
import { IMG_WIDTH, IMG_HEIGHT, areaPolygons, areaColors } from "@/utils/mapConstants";
import MapControls from "./map/MapControls";
import MapLegend from "./map/MapLegend";
import AreaLabels from "./map/AreaLabels";

interface StaticMapProps {
  onSelectArea: (areaId: string) => void;
  selectedArea: string | null;
  isEditMode?: boolean;
}

const StaticMap: React.FC<StaticMapProps> = ({ onSelectArea, selectedArea, isEditMode = false }) => {
  const [editablePolygons, setEditablePolygons] = React.useState(areaPolygons);
  const [dragPoint, setDragPoint] = React.useState<{ areaId: string; pointIndex: number } | null>(null);

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
    console.log('Polígonos guardados:', editablePolygons);
  };

  React.useEffect(() => {
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

        <AreaLabels selectedArea={selectedArea} />
        <MapControls isEditMode={isEditMode} onSave={handleSavePolygons} />
        <MapLegend isEditMode={isEditMode} />
      </div>
    </div>
  );
};

export default StaticMap;
