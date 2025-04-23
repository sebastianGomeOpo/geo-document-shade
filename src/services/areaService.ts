
import { AreaType, DocumentType } from '@/types/document';
import { areaData as initialAreaData } from '@/data/areas';
import { create } from 'zustand';

interface AreaStore {
  areas: AreaType[];
  updateAreaName: (areaId: string, newName: string) => void;
  addDocument: (areaId: string, document: Omit<DocumentType, 'id'>) => void;
  updateDocument: (areaId: string, document: DocumentType) => void;
  deleteDocument: (areaId: string, documentId: string) => void;
}

export const useAreaStore = create<AreaStore>((set) => ({
  areas: initialAreaData,
  updateAreaName: (areaId, newName) => 
    set((state) => ({
      areas: state.areas.map(area => 
        area.id === areaId ? { ...area, name: newName } : area
      )
    })),
  addDocument: (areaId, document) => 
    set((state) => ({
      areas: state.areas.map(area => {
        if (area.id === areaId) {
          const newDocument: DocumentType = {
            ...document,
            id: Date.now().toString()
          };
          return {
            ...area,
            documents: [...area.documents, newDocument]
          };
        }
        return area;
      })
    })),
  updateDocument: (areaId, document) => 
    set((state) => ({
      areas: state.areas.map(area => {
        if (area.id === areaId) {
          return {
            ...area,
            documents: area.documents.map(doc => 
              doc.id === document.id ? document : doc
            )
          };
        }
        return area;
      })
    })),
  deleteDocument: (areaId, documentId) => 
    set((state) => ({
      areas: state.areas.map(area => {
        if (area.id === areaId) {
          return {
            ...area,
            documents: area.documents.filter(doc => doc.id !== documentId)
          };
        }
        return area;
      })
    }))
}));
