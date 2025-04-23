
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, PenLine, Save } from 'lucide-react';

interface AreaHeaderProps {
  name: string;
  documentsCount: number;
  isEditMode: boolean;
  isEditingName: boolean;
  areaName: string;
  onEditName: () => void;
  onSaveName: () => void;
  onAreaNameChange: (value: string) => void;
}

const AreaHeader: React.FC<AreaHeaderProps> = ({
  name,
  documentsCount,
  isEditMode,
  isEditingName,
  areaName,
  onEditName,
  onSaveName,
  onAreaNameChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        {isEditMode && !isEditingName ? (
          <h2 className="text-xl font-bold flex items-center gap-2">
            {name}
            <Button variant="ghost" size="sm" onClick={onEditName}>
              <PenLine className="h-4 w-4" />
            </Button>
          </h2>
        ) : isEditMode && isEditingName ? (
          <div className="flex gap-2">
            <Input 
              value={areaName}
              onChange={(e) => onAreaNameChange(e.target.value)}
              className="max-w-[200px]"
            />
            <Button size="sm" onClick={onSaveName}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <h2 className="text-xl font-bold">Documentos de {name}</h2>
        )}
      </div>
      <Badge variant="outline">{documentsCount} documentos</Badge>
    </div>
  );
};

export default AreaHeader;
