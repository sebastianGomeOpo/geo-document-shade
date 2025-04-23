
export interface DocumentType {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  fileUrl?: string;
}

export interface AreaType {
  id: string;
  name: string;
  color: string;
  center: [number, number];
  geometry: GeoJSONPolygon;
  documents: DocumentType[];
}

interface GeoJSONPolygon {
  type: "Feature";
  properties: Record<string, any>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}
