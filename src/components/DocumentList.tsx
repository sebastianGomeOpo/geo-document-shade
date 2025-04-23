
import React, { useState } from 'react';
import { DocumentType } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin, Plus, PenLine, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DocumentListProps {
  documents: DocumentType[];
  areaName: string;
  isEditMode?: boolean;
  areaId?: string | null;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents: initialDocuments, areaName: initialAreaName, isEditMode, areaId }) => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [areaName, setAreaName] = useState(initialAreaName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingDoc, setEditingDoc] = useState<string | null>(null);
  const [newDoc, setNewDoc] = useState<Partial<DocumentType> | null>(null);

  const handleSaveAreaName = () => {
    setIsEditingName(false);
    // Aquí se implementaría la lógica para guardar el nombre en el backend
  };

  const handleSaveDocument = (doc: DocumentType) => {
    setDocuments(prev => prev.map(d => d.id === doc.id ? doc : d));
    setEditingDoc(null);
    // Aquí se implementaría la lógica para guardar el documento en el backend
  };

  const handleAddDocument = () => {
    if (!newDoc?.title || !newDoc?.description) return;
    
    const doc: DocumentType = {
      id: Date.now().toString(),
      title: newDoc.title,
      description: newDoc.description,
      type: newDoc.type || 'Documento',
      date: new Date().toLocaleDateString(),
    };
    
    setDocuments(prev => [...prev, doc]);
    setNewDoc(null);
    // Aquí se implementaría la lógica para guardar el nuevo documento en el backend
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    // Aquí se implementaría la lógica para eliminar el documento en el backend
  };

  return (
    <div className="document-panel-enter p-4">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {isEditMode && !isEditingName ? (
              <h2 className="text-xl font-bold flex items-center gap-2">
                {areaName}
                <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)}>
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
              <h2 className="text-xl font-bold">Documentos de {areaName}</h2>
            )}
          </div>
          <Badge variant="outline">{documents.length} documentos</Badge>
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

      <div className="document-list space-y-3">
        {documents.map((doc) => (
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
                <Textarea 
                  value={doc.description}
                  onChange={(e) => handleSaveDocument({ ...doc, description: e.target.value })}
                  className="mb-3"
                />
              ) : (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{doc.description}</p>
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
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver documento
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
