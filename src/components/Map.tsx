import React, { useEffect, useRef, useState } from 'react';
import { areaData } from '@/data/areas';
import mapboxgl from 'mapbox-gl@latest';

// Necesitarás agregar tu token de Mapbox aquí
// Para propósitos de desarrollo, usamos un token temporal
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHY4NDU5MTMwcHpsMmpvN3l3OXY0MW1qIn0.knJv8IFqfX8s0glDaPKhWw';
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapProps {
  onSelectArea: (areaId: string | null) => void;
  selectedArea: string | null;
}

const Map: React.FC<MapProps> = ({ onSelectArea, selectedArea }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-73.5, -13.8], // Centrado en Perú
      zoom: 5,
      pitchWithRotate: false
    });

    const mapInstance = map.current;

    mapInstance.on('load', () => {
      setMapLoaded(true);

      const tooltip = document.createElement('div');
      tooltip.className = 'area-tooltip';
      tooltip.style.display = 'none';
      tooltipRef.current = tooltip;
      mapContainer.current?.appendChild(tooltip);

      areaData.forEach(area => {
        mapInstance.addSource(`area-${area.id}`, {
          type: 'geojson',
          data: area.geometry
        });

        mapInstance.addLayer({
          id: `area-fill-${area.id}`,
          type: 'fill',
          source: `area-${area.id}`,
          layout: {},
          paint: {
            'fill-color': area.color,
            'fill-opacity': area.id === selectedArea ? 0.7 : 0.4
          }
        });

        mapInstance.addLayer({
          id: `area-line-${area.id}`,
          type: 'line',
          source: `area-${area.id}`,
          layout: {},
          paint: {
            'line-color': area.color,
            'line-width': 2,
            'line-opacity': 0.8
          }
        });

        mapInstance.on('mouseenter', `area-fill-${area.id}`, () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'block';
            tooltipRef.current.innerHTML = `<strong>${area.name}</strong><br>${area.documents.length} documentos disponibles`;
          }
        });

        mapInstance.on('mousemove', `area-fill-${area.id}`, (e) => {
          if (tooltipRef.current && e.lngLat) {
            const point = mapInstance.project(e.lngLat);
            tooltipRef.current.style.left = `${point.x + 10}px`;
            tooltipRef.current.style.top = `${point.y + 10}px`;
          }
        });

        mapInstance.on('mouseleave', `area-fill-${area.id}`, () => {
          mapInstance.getCanvas().style.cursor = '';
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
        });

        mapInstance.on('click', `area-fill-${area.id}`, () => {
          onSelectArea(area.id === selectedArea ? null : area.id);
        });

        const markerElement = document.createElement('div');
        markerElement.className = 'area-marker';
        markerElement.id = `marker-${area.id}`;
        markerElement.addEventListener('click', () => {
          onSelectArea(area.id);
        });

        new mapboxgl.Marker(markerElement)
          .setLngLat(area.center)
          .addTo(mapInstance);
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    areaData.forEach(area => {
      if (map.current) {
        map.current.setPaintProperty(
          `area-fill-${area.id}`,
          'fill-opacity',
          area.id === selectedArea ? 0.7 : 0.4
        );

        const markerElement = document.getElementById(`marker-${area.id}`);
        if (markerElement) {
          if (area.id === selectedArea) {
            markerElement.classList.add('active');
          } else {
            markerElement.classList.remove('active');
          }
        }
      }
    });
  }, [selectedArea, mapLoaded]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-md shadow-md z-10">
        <h2 className="text-sm font-semibold">DocuMapa</h2>
        <p className="text-xs text-muted-foreground">Haga clic en áreas coloreadas para ver documentos</p>
      </div>
    </div>
  );
};

export default Map;
