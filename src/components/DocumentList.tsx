
import React from 'react';
import { DocumentType } from '@/types/document';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentListProps {
  documents: DocumentType[];
  areaName: string;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, areaName }) => {
  return (
    <div className="document-panel-enter p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Documentos de {areaName}
        </h2>
        <Badge variant="outline">{documents.length} documentos</Badge>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay documentos disponibles para esta ubicación</p>
        </div>
      ) : (
        <div className="document-list space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="document-card hover:bg-secondary/50">
              <CardHeader className="py-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{doc.title}</CardTitle>
                  <Badge>{doc.type}</Badge>
                </div>
                <CardDescription>{doc.date}</CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{doc.description}</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver documento
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentList;
