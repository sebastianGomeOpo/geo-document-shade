
import React, { useState, useRef, useEffect } from 'react';
import StaticMap from '@/components/StaticMap';
import DocumentList from '@/components/DocumentList';
import { areaData } from '@/data/areas';

const Index = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const documentsRef = useRef<HTMLDivElement>(null);

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId);
    // Scroll suave hacia los documentos después de un pequeño delay
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
      <div className="bg-primary/10 px-4 py-3 flex justify-center border-b">
        <h1 className="text-2xl font-bold text-center">DocuMapa - Visualizador de Documentos por Ubicación</h1>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow">
        <div className={`h-[70vh] lg:h-auto transition-all duration-300 ${selectedAreaData ? 'lg:w-2/3' : 'w-full'}`}>
          <StaticMap onSelectArea={handleSelectArea} selectedArea={selectedArea} />
        </div>

        <div ref={documentsRef} className="w-full lg:w-1/3">
          {selectedAreaData && (
            <div className="lg:border-l h-full overflow-y-auto animate-fade-in">
              <DocumentList 
                documents={selectedAreaData.documents} 
                areaName={selectedAreaData.name} 
              />
            </div>
          )}
        </div>
      </div>

      <footer className="bg-background border-t py-2 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 DocuMapa - Haga clic en las áreas del mapa para ver documentos asociados</p>
      </footer>
    </div>
  );
};

export default Index;
