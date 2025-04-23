
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { AreaType } from '@/types/document';

interface AreaSelectorProps {
  areas: AreaType[];
  selectedArea: string | null;
  onSelectArea: (areaId: string) => void;
  isEditMode: boolean;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ 
  areas, 
  selectedArea, 
  onSelectArea,
  isEditMode 
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Seleccione un área</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Elija un área para ver los documentos asociados
        </p>
        <Select
          value={selectedArea || undefined}
          onValueChange={onSelectArea}
          disabled={isEditMode}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione un área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem 
                key={area.id} 
                value={area.id}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: area.color }}
                  ></div>
                  <span>{area.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {!selectedArea && (
        <div className="bg-muted p-6 rounded-lg text-center">
          <p>Seleccione un área para ver sus documentos</p>
        </div>
      )}
    </div>
  );
};

export default AreaSelector;
