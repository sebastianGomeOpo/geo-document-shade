
import React from 'react';
import { AreaType } from '@/types/document';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface AreaSelectorProps {
  areas: AreaType[];
  selectedArea: string | null;
  onSelectArea: (areaId: string) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ areas, selectedArea, onSelectArea }) => {
  return (
    <div className="p-4 bg-background border-b lg:border-r lg:border-b-0 lg:h-full">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Seleccionar Área</h2>
      </div>
      <Select value={selectedArea || ""} onValueChange={onSelectArea}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccione un área" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                <div className="flex items-center gap-2">
                  <span 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: area.color }}
                  />
                  {area.name} ({area.documents.length} docs)
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {!selectedArea && (
        <div className="mt-8 p-4 border border-dashed rounded-md text-center text-muted-foreground">
          <p>Seleccione un área para ver los documentos asociados</p>
        </div>
      )}
    </div>
  );
};

export default AreaSelector;
