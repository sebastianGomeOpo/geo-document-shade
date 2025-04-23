
import React from 'react';
import { DocumentType } from '@/types/document';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { FileText } from 'lucide-react';

interface DocumentViewerProps {
  document: DocumentType | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document, isOpen, onClose }) => {
  if (!document) return null;
  
  // Intentar parsear la fecha en formato DD/MM/YYYY
  const formattedDate = (() => {
    try {
      const parts = document.date.split('/');
      if (parts.length === 3) {
        const date = new Date(
          parseInt(parts[2]), // año
          parseInt(parts[1]) - 1, // mes (0-indexed)
          parseInt(parts[0]) // día
        );
        return format(date, 'PPP');
      }
      return document.date;
    } catch (error) {
      return document.date;
    }
  })();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{document.title}</DialogTitle>
            <Badge>{document.type}</Badge>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Fecha: {formattedDate}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 p-4 bg-secondary/20 rounded-md">
          <p className="whitespace-pre-wrap">{document.description}</p>
        </div>
        
        {document.fileUrl && (
          <div className="mt-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <a 
              href={document.fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Ver documento original
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
