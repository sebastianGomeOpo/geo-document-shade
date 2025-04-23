
import React, { useState, useRef } from 'react';
import DocumentList from '@/components/DocumentList';
import { areaData } from '@/data/areas';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import { useEditMode } from '@/hooks/useEditMode';
import AreaSelector from '@/components/AreaSelector';

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const { isEditMode, toggleEditMode } = useEditMode();

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
    setTimeout(() => {
      documentsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const selectedAreaData = selectedArea ? areaData.find(area => area.id === selectedArea) : null;

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

      <div className="flex flex-col flex-grow">
        <div className="container mx-auto py-6">
          <AreaSelector 
            areas={areaData}
            selectedArea={selectedArea}
            onSelectArea={handleSelectArea}
            isEditMode={isEditMode}
          />
        </div>
        
        <div ref={documentsRef} className="container mx-auto">
          {selectedAreaData && (
            <div className="border-t border-muted h-full overflow-y-auto animate-fade-in">
              <DocumentList 
                documents={selectedAreaData.documents} 
                areaName={selectedAreaData.name}
                isEditMode={isEditMode}
                areaId={selectedArea}
              />
            </div>
          )}
        </div>
      </div>

      <footer className="bg-background border-t py-2 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 DocuMapa - {isEditMode ? "Modo edición activado" : "Seleccione un área para ver documentos asociados"}</p>
      </footer>
    </div>
  );
};

export default Index;
