
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface MapControlsProps {
  isEditMode: boolean;
  onSave: () => void;
}

const MapControls: React.FC<MapControlsProps> = ({ isEditMode, onSave }) => {
  if (!isEditMode) return null;

  return (
    <Button
      className="absolute top-4 right-4 z-10 shadow-md animate-in fade-in duration-300"
      onClick={onSave}
      variant="secondary"
    >
      <Save className="h-4 w-4 mr-2" />
      Guardar cambios
    </Button>
  );
};

export default MapControls;
