
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface ContentPreviewProps {
  content: string;
  height?: string;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ 
  content,
  height = "400px" 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 border-b flex justify-between items-center">
        <h3 className="text-sm font-medium">Prévia</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          title={isVisible ? "Ocultar prévia" : "Mostrar prévia"}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isVisible && (
        <div 
          className="p-4 prose prose-sm max-w-none dark:prose-invert overflow-auto"
          style={{ height }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

export default ContentPreview;
