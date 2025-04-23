
import React from 'react';

interface MapLegendProps {
  isEditMode: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({ isEditMode }) => {
  return (
    <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md z-10">
      <h2 className="text-sm font-semibold">DocuMapa</h2>
      <p className="text-xs text-muted-foreground">
        {isEditMode 
          ? "Arrastra los puntos blancos para modificar las áreas" 
          : "Haga clic en áreas coloreadas para ver documentos"
        }
      </p>
    </div>
  );
};

export default MapLegend;
