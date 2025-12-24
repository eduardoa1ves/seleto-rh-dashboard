import { useCallback, useState } from 'react';
import { Upload, FileText, Image, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
}

export function FileDropzone({ onFileUpload, isUploading }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-300',
          'bg-card hover:bg-secondary/30',
          isDragging
            ? 'border-accent bg-accent/5 scale-[1.02]'
            : 'border-border hover:border-primary/50',
          selectedFile && 'border-solid border-accent/50 bg-accent/5'
        )}
      >
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center justify-center px-6 py-12">
          {selectedFile ? (
            <div className="text-center animate-fade-in">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                {selectedFile.type === 'application/pdf' ? (
                  <FileText className="h-8 w-8 text-accent" />
                ) : (
                  <Image className="h-8 w-8 text-accent" />
                )}
              </div>
              <p className="text-lg font-medium text-foreground">{selectedFile.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="relative z-20"
                >
                  <X className="mr-1 h-4 w-4" />
                  Remover
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  disabled={isUploading}
                  className="relative z-20"
                >
                  Analisar Currículo
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className={cn(
                'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors duration-300',
                isDragging ? 'bg-accent/20' : 'bg-secondary'
              )}>
                <Upload className={cn(
                  'h-8 w-8 transition-colors duration-300',
                  isDragging ? 'text-accent' : 'text-muted-foreground'
                )} />
              </div>
              <p className="text-lg font-medium text-foreground">
                Arraste um currículo aqui
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                ou clique para selecionar um arquivo
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-4 w-4" /> PDF
                </span>
                <span className="flex items-center gap-1.5">
                  <Image className="h-4 w-4" /> Imagem
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
