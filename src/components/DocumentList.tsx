import React, { useState } from 'react';
import { AreaType, DocumentType } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin, Plus, PenLine, Save, Trash2, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAreaStore } from '@/services/areaService';
import DocumentViewer from '@/components/DocumentViewer';
import ImageViewer from '@/components/ImageViewer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

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

  const handleViewDocument = (doc: DocumentType) => {
    setViewingDoc(doc);
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
        toast({
          title: "Imagen agregada",
          description: "La imagen ha sido agregada al documento correctamente",
        });
      }
    }
  };

  return (
    <div className="document-panel-enter p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {isEditMode && !isEditingName ? (
              <h2 className="text-xl font-bold flex items-center gap-2">
                {selectedArea.name}
                <Button variant="ghost" size="sm" onClick={() => {
                  setAreaName(selectedArea.name);
                  setIsEditingName(true);
                }}>
                  <PenLine className="h-4 w-4" />
                </Button>
              </h2>
            ) : isEditMode && isEditingName ? (
              <div className="flex gap-2">
                <Input 
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="max-w-[200px]"
                />
                <Button size="sm" onClick={handleSaveAreaName}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <h2 className="text-xl font-bold">Documentos de {selectedArea.name}</h2>
            )}
          </div>
          <Badge variant="outline">{selectedArea.documents.length} documentos</Badge>
        </div>

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
            <Card key={doc.id} className="document-card hover:bg-secondary/50">
              <CardHeader className="py-3">
                <div className="flex items-start justify-between">
                  {editingDoc === doc.id ? (
                    <Input 
                      value={doc.title}
                      onChange={(e) => handleSaveDocument({ ...doc, title: e.target.value })}
                      className="flex-grow"
                    />
                  ) : (
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                  )}
                  <Badge>{doc.type}</Badge>
                </div>
                <CardDescription>{doc.date}</CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                {editingDoc === doc.id ? (
                  <>
                    <Textarea 
                      value={doc.description}
                      onChange={(e) => handleSaveDocument({ ...doc, description: e.target.value })}
                      className="mb-3"
                    />
                    <div className="mb-3">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(doc.id, e)}
                        className="hidden"
                        id={`image-upload-${doc.id}`}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById(`image-upload-${doc.id}`)?.click()}
                      >
                        <ImagePlus className="h-4 w-4 mr-2" />
                        Adjuntar imagen
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                    {doc.imageUrl && (
                      <div className="mb-3">
                        <img
                          src={doc.imageUrl}
                          alt="Document preview"
                          className="max-h-32 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedImage(doc.imageUrl!)}
                        />
                      </div>
                    )}
                  </>
                )}
                <div className="flex justify-end gap-2">
                  {isEditMode ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingDoc(editingDoc === doc.id ? null : doc.id)}
                      >
                        {editingDoc === doc.id ? <Save className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Ver documento
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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
