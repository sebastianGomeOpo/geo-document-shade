
import React, { useState } from 'react';
import { DocumentType } from '@/types/document';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAreaStore } from '@/services/areaService';
import DocumentViewer from '@/components/DocumentViewer';
import ImageViewer from '@/components/ImageViewer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import DocumentCard from './document/DocumentCard';
import AreaHeader from './document/AreaHeader';

interface DocumentListProps {
  areaId: string | null;
  isEditMode?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({ areaId, isEditMode }) => {
  const { areas, updateAreaName, addDocument, updateDocument, deleteDocument } = useAreaStore();
  const selectedArea = areaId ? areas.find(area => area.id === areaId) : null;
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [areaName, setAreaName] = useState(selectedArea?.name || '');
  const [editingDoc, setEditingDoc] = useState<string | null>(null);
  const [newDoc, setNewDoc] = useState<Partial<DocumentType> | null>(null);
  const [viewingDoc, setViewingDoc] = useState<DocumentType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!selectedArea) return null;

  const handleSaveAreaName = () => {
    if (areaId && areaName.trim()) {
      updateAreaName(areaId, areaName);
      setIsEditingName(false);
      toast({
        title: "Área actualizada",
        description: `El nombre del área ha sido actualizado a "${areaName}"`,
      });
    }
  };

  const handleSaveDocument = (doc: DocumentType) => {
    if (areaId) {
      updateDocument(areaId, doc);
      setEditingDoc(null);
      toast({
        title: "Documento actualizado",
        description: "El documento ha sido actualizado correctamente",
      });
    }
  };

  const handleAddDocument = () => {
    if (!newDoc?.title || !newDoc?.description || !areaId) return;
    
    addDocument(areaId, {
      title: newDoc.title,
      description: newDoc.description,
      type: newDoc.type || 'Documento',
      date: new Date().toLocaleDateString(),
    });
    
    setNewDoc(null);
    toast({
      title: "Documento agregado",
      description: "El nuevo documento ha sido agregado correctamente",
    });
  };

  const handleDeleteDocument = (id: string) => {
    if (areaId) {
      deleteDocument(areaId, id);
      toast({
        title: "Documento eliminado",
        description: "El documento ha sido eliminado correctamente",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    
    if (areaId) {
      const updatedDoc = selectedArea.documents.find(d => d.id === docId);
      if (updatedDoc) {
        handleSaveDocument({
          ...updatedDoc,
          imageUrl
        });
      }
    }
  };

  return (
    <div className="document-panel-enter p-4">
      <div className="flex flex-col gap-4 mb-4">
        <AreaHeader
          name={selectedArea.name}
          documentsCount={selectedArea.documents.length}
          isEditMode={!!isEditMode}
          isEditingName={isEditingName}
          areaName={areaName}
          onEditName={() => {
            setAreaName(selectedArea.name);
            setIsEditingName(true);
          }}
          onSaveName={handleSaveAreaName}
          onAreaNameChange={setAreaName}
        />

        {isEditMode && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setNewDoc({ title: '', description: '', type: 'Documento' })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar documento
          </Button>
        )}
      </div>

      {newDoc && (
        <Card className="mb-4 border-2 border-primary">
          <CardHeader className="py-3">
            <Input 
              placeholder="Título del documento"
              value={newDoc.title}
              onChange={(e) => setNewDoc(prev => ({ ...prev!, title: e.target.value }))}
            />
          </CardHeader>
          <CardContent className="py-2 space-y-4">
            <Textarea 
              placeholder="Descripción del documento"
              value={newDoc.description}
              onChange={(e) => setNewDoc(prev => ({ ...prev!, description: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewDoc(null)}>Cancelar</Button>
              <Button onClick={handleAddDocument}>Guardar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="document-list space-y-3 pr-4">
          {selectedArea.documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              isEditMode={!!isEditMode}
              editingDoc={editingDoc}
              onEdit={(docId) => setEditingDoc(editingDoc === docId ? null : docId)}
              onSave={handleSaveDocument}
              onDelete={handleDeleteDocument}
              onView={(doc) => {
                if (doc.imageUrl) {
                  setSelectedImage(doc.imageUrl);
                } else {
                  setViewingDoc(doc);
                }
              }}
              onImageUpload={handleImageUpload}
            />
          ))}
        </div>
      </ScrollArea>

      <DocumentViewer 
        document={viewingDoc} 
        isOpen={!!viewingDoc} 
        onClose={() => setViewingDoc(null)} 
      />

      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default DocumentList;
