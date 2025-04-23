
import React from 'react';
import { labelPositions } from '@/utils/mapConstants';
import { areaData } from '@/data/areas';

interface AreaLabelsProps {
  selectedArea: string | null;
}

const AreaLabels: React.FC<AreaLabelsProps> = ({ selectedArea }) => {
  return (
    <>
      {areaData.map((area) => {
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
    </>
  );
};

export default AreaLabels;
