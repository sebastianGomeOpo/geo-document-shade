
import React, { useState } from 'react';
import DocumentList from '@/components/DocumentList';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import { useEditMode } from '@/hooks/useEditMode';
import AreaSelector from '@/components/AreaSelector';
import { useAreaStore } from '@/services/areaService';

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const { isEditMode, toggleEditMode } = useEditMode();
  const { areas } = useAreaStore();

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/10 px-4 py-3 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-center">DocuMapa - Visualizador de Documentos por Ubicación</h1>
        <Button 
          variant={isEditMode ? "secondary" : "outline"}
          onClick={toggleEditMode}
          className="gap-2"
        >
          <PenLine className="h-4 w-4" />
          {isEditMode ? "Salir de edición" : "Modo edición"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="lg:w-1/4 lg:border-r">
          <AreaSelector 
            areas={areas} 
            selectedArea={selectedArea} 
            onSelectArea={handleSelectArea} 
          />
        </div>

        <div className="lg:w-3/4">
          {selectedArea ? (
            <DocumentList 
              areaId={selectedArea}
              isEditMode={isEditMode}
            />
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
              <div>
                <h2 className="text-xl font-semibold mb-2">Seleccione un área</h2>
                <p>Utilice el selector de la izquierda para ver los documentos asociados a un área</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-background border-t py-2 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 DocuMapa - {isEditMode ? "Modo edición activado" : "Seleccione un área para ver sus documentos"}</p>
      </footer>
    </div>
  );
};

export default Index;
