
import React from 'react';
import { DocumentType } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ImagePlus, PenLine, Save, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface DocumentCardProps {
  doc: DocumentType;
  isEditMode: boolean;
  editingDoc: string | null;
  onEdit: (docId: string) => void;
  onSave: (doc: DocumentType) => void;
  onDelete: (id: string) => void;
  onView: (doc: DocumentType) => void;
  onImageUpload: (docId: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  isEditMode,
  editingDoc,
  onEdit,
  onSave,
  onDelete,
  onView,
  onImageUpload,
}) => {
  return (
    <Card className="document-card hover:bg-secondary/50">
      <CardHeader className="py-3">
        <div className="flex items-start justify-between">
          {editingDoc === doc.id ? (
            <Input 
              value={doc.title}
              onChange={(e) => onSave({ ...doc, title: e.target.value })}
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
              onChange={(e) => onSave({ ...doc, description: e.target.value })}
              className="mb-3"
            />
            <div className="mb-3">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(doc.id, e)}
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
                  onClick={() => onView(doc)}
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
                onClick={() => onDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(doc.id)}
              >
                {editingDoc === doc.id ? <Save className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
              </Button>
            </>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center"
              onClick={() => onView(doc)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Ver documento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
