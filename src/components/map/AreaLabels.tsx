
import React, { useState } from 'react';
import { labelPositions } from '@/utils/mapConstants';
import { areaData } from '@/data/areas';
import { Move } from 'lucide-react';

interface AreaLabelsProps {
  selectedArea: string | null;
  isEditMode?: boolean;
  onLabelPositionChange?: (areaId: string, x: number, y: number) => void;
}

const AreaLabels: React.FC<AreaLabelsProps> = ({ 
  selectedArea, 
  isEditMode = false,
  onLabelPositionChange 
}) => {
  const [draggedLabel, setDraggedLabel] = useState<string | null>(null);
  const [positions, setPositions] = useState(labelPositions);

  const handleDragStart = (e: React.MouseEvent, areaId: string) => {
    if (!isEditMode) return;
    e.stopPropagation();
    setDraggedLabel(areaId);
  };

  const handleDrag = (e: MouseEvent) => {
    if (!draggedLabel) return;

    const container = (e.target as HTMLElement).closest('.relative');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 715);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 709);

    setPositions(prev => ({
      ...prev,
      [draggedLabel]: { x, y }
    }));

    if (onLabelPositionChange) {
      onLabelPositionChange(draggedLabel, x, y);
    }
  };

  const handleDragEnd = () => {
    setDraggedLabel(null);
  };

  React.useEffect(() => {
    if (draggedLabel) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [draggedLabel]);

  return (
    <>
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
              pointerEvents: isEditMode ? "all" : "none",
              minWidth: 72,
              textAlign: "center",
            }}
            onMouseDown={(e) => handleDragStart(e, area.id)}
          >
            {area.name}
            {isEditMode && (
              <Move className="inline-block ml-1 h-3 w-3 opacity-50" />
            )}
          </div>
        );
      })}
    </>
  );
};

export default AreaLabels;

