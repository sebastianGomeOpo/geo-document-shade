
import React from 'react';
import { DocumentType } from '@/types/document';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface DocumentViewerProps {
  document: DocumentType | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, isOpen, onClose }) => {
  if (!document) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle>{document.title}</DialogTitle>
            <Badge>{document.type}</Badge>
          </div>
          <DialogDescription>
            Fecha: {document.date}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md bg-muted/30">
          {document.fileUrl ? (
            <iframe 
              src={document.fileUrl} 
              className="w-full min-h-[300px]" 
              title={document.title}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mb-2" />
              <p className="text-center">{document.description}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
