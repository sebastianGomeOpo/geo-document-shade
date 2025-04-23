
import React, { useState } from 'react';
import DocumentList from '@/components/DocumentList';
import { Button } from '@/components/ui/button';
import { PenLine } from 'lucide-react';
import { useEditMode } from '@/hooks/useEditMode';
import AreaSelector from '@/components/AreaSelector';
import { useAreaStore } from '@/services/areaService';
import StaticMap from '@/components/StaticMap';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const { isEditMode, toggleEditMode } = useEditMode();
  const { areas } = useAreaStore();
  const isMobile = useIsMobile();

  const handleSelectArea = (areaId: string | null) => {
    setSelectedArea(areaId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-primary/10 px-4 py-3 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-center">DocuMapa</h1>
        <Button 
          variant={isEditMode ? "secondary" : "outline"}
          onClick={toggleEditMode}
          className="gap-2 animate-in slide-in-from-right duration-300"
        >
          <PenLine className="h-4 w-4" />
          {isEditMode ? "Salir de edición" : "Modo edición"}
        </Button>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        <div className={`w-full ${isMobile ? 'h-[50vh]' : 'lg:w-3/5 h-full'} relative transition-all duration-300 ease-in-out`}>
          <div className="w-full h-full animate-in fade-in duration-500">
            <StaticMap
              onSelectArea={handleSelectArea}
              selectedArea={selectedArea}
              isEditMode={isEditMode}
              toggleEditMode={toggleEditMode}
            />
          </div>
        </div>

        <div className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${isMobile ? 'h-[50vh]' : 'h-full'}`}>
          {selectedArea ? (
            <div className="animate-in slide-in-from-right duration-300">
              <DocumentList 
                areaId={selectedArea}
                isEditMode={isEditMode}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground animate-in fade-in duration-500">
              <div>
                <h2 className="text-xl font-semibold mb-2">Seleccione un área</h2>
                <p>Haga clic en un área del mapa para ver sus documentos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-background border-t py-2 px-4 text-center text-sm text-muted-foreground">
        <p className="animate-in fade-in duration-300">
          © 2025 DocuMapa - {isEditMode ? "Modo edición activado" : "Seleccione un área para ver sus documentos"}
        </p>
      </footer>
    </div>
  );
};

export default Index;
