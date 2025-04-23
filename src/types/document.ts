
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
  documents: DocumentType[];
  geometry?: GeoJSONPolygon;
}

interface GeoJSONPolygon {
  type: "Feature";
  properties: Record<string, any>;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}
