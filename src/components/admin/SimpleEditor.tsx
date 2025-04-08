
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, Heading, Link as LinkIcon, Image } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface SimpleEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  initialValue,
  onChange,
  placeholder = "Escreva seu conteúdo aqui...",
  minHeight = "400px"
}) => {
  const [content, setContent] = useState(initialValue);
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
    
    // Save selection position for formatting actions
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart);
      setSelectionEnd(textareaRef.current.selectionEnd);
    }
  };

  const updateContent = (before: string, after: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const newStart = selectionStart;
    const newEnd = selectionEnd;
    const selectedText = content.substring(newStart, newEnd);
    
    const newContent = 
      content.substring(0, newStart) + 
      before + 
      selectedText + 
      after + 
      content.substring(newEnd);
    
    setContent(newContent);
    onChange(newContent);
    
    // Set focus back to textarea after format is applied
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        newStart + before.length,
        newEnd + before.length
      );
    }, 10);
  };

  const handleFormat = (format: 'bold' | 'italic' | 'list' | 'heading' | 'link' | 'image') => {
    if (!textareaRef.current) return;

    // Save current selection
    const newStart = textareaRef.current.selectionStart;
    const newEnd = textareaRef.current.selectionEnd;
    const selectedText = content.substring(newStart, newEnd);

    switch (format) {
      case 'bold':
        updateContent('<strong>', '</strong>');
        break;
      case 'italic':
        updateContent('<em>', '</em>');
        break;
      case 'list':
        updateContent('<ul>\n  <li>', '</li>\n</ul>');
        break;
      case 'heading':
        updateContent('<h2>', '</h2>');
        break;
      case 'link':
        const url = prompt('Digite a URL do link:', 'https://');
        if (url) {
          updateContent(`<a href="${url}" target="_blank">`, '</a>');
        }
        break;
      case 'image':
        const imageUrl = prompt('Digite a URL da imagem:', 'https://');
        if (imageUrl) {
          updateContent(`<img src="${imageUrl}" alt="${selectedText}" />`, '');
        }
        break;
      default:
        break;
    }
  };

  // Handle selection change to track cursor position
  const handleSelect = () => {
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart);
      setSelectionEnd(textareaRef.current.selectionEnd);
    }
  };

  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('bold')}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('italic')}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('heading')}
          title="Título"
        >
          <Heading className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('list')}
          title="Lista"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('link')}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleFormat('image')}
          title="Imagem"
        >
          <Image className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        onSelect={handleSelect}
        onClick={handleSelect}
        placeholder={placeholder}
        className="min-h-[400px] rounded-t-none border-0 resize-y font-mono"
        style={{ minHeight }}
      />
      <div className="bg-muted p-2 border-t text-xs text-muted-foreground">
        <p>Use tags HTML para formatar seu conteúdo. Ex: &lt;p&gt;Parágrafo&lt;/p&gt;</p>
      </div>
    </div>
  );
};

export default SimpleEditor;
