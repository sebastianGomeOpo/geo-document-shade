
import React, { useState } from 'react';
import { labelPositions } from '@/utils/mapConstants';
import { areaData } from '@/data/areas';

interface AreaLabelsProps {
  selectedArea: string | null;
  isEditMode?: boolean;
}

const AreaLabels: React.FC<AreaLabelsProps> = ({ selectedArea, isEditMode = false }) => {
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [positions, setPositions] = useState(labelPositions);

  const handleDragStart = (e: React.MouseEvent, areaId: string) => {
    if (!isEditMode) return;
    setDraggedLabel(areaId);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!draggedLabel || !isEditMode) return;

    const container = (e.target as HTMLElement).closest('.area-label-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 715); // IMG_WIDTH
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 709); // IMG_HEIGHT

    setPositions(prev => ({
      ...prev,
      [draggedLabel]: { x, y }
    }));
  };

  const handleDragEnd = () => {
    setDraggedLabel(null);
  };

  React.useEffect(() => {
    if (draggedLabel) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [draggedLabel]);

  return (
    <div className="area-label-container absolute inset-0">
      {areaData.map((area) => {
        const { x, y } = positions[area.id];
        return (
          <div
            key={area.id + "-label"}
            className={`absolute select-none px-2 py-1 rounded-lg font-bold text-xs shadow-md text-white transition-all duration-300 ${
              selectedArea && area.id !== selectedArea ? 'opacity-30' : 'opacity-100'
            } ${isEditMode ? 'cursor-move' : ''}`}
            style={{
              left: x - 36,
              top: y - 16,
              background: area.id === selectedArea ? "#333c" : "#1117",
              border: area.id === selectedArea ? "2px solid #fff" : "1px solid #222c",
              zIndex: 2,
              pointerEvents: isEditMode ? "auto" : "none",
              minWidth: 72,
              textAlign: "center",
            }}
            onMouseDown={(e) => handleDragStart(e, area.id)}
          >
            {area.name}
          </div>
        );
      })}
    </div>
  );
};

export default AreaLabels;
