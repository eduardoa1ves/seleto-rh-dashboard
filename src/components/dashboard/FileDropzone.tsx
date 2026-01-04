import { useCallback, useState, useRef } from 'react';
import { Upload, FileText, Image, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
  isUploading?: boolean;
}

export function FileDropzone({ onFileUpload, isUploading }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setIsDragging(true);
  }, [isUploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (isUploading) return;
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setSelectedFile(file);
    }
  }, [isUploading]);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!selectedFile ? triggerFileSelect : undefined}
        className={cn(
          'relative rounded-xl border-2 border-dashed transition-all duration-300',
          'bg-card',
          !selectedFile && 'cursor-pointer hover:bg-secondary/30 hover:border-primary/50',
          isDragging
            ? 'border-accent bg-accent/5 scale-[1.01]'
            : 'border-border',
          selectedFile && 'border-solid border-success/30 bg-success/5'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center px-6 py-10">
          {selectedFile ? (
            <div className="w-full max-w-md animate-fade-in">
              <div className="flex items-center gap-4 rounded-lg border border-success/20 bg-background p-4 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success/10">
                  {selectedFile.type === 'application/pdf' ? (
                    <FileText className="h-6 w-6 text-success" />
                  ) : (
                    <Image className="h-6 w-6 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Pronto para análise
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFile();
                  }}
                  disabled={isUploading}
                  className="sm:w-32"
                >
                  Remover
                </Button>
                <Button
                  variant="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnalyze();
                  }}
                  disabled={isUploading}
                  className="sm:min-w-[160px]"
                >
                  {isUploading ? 'Analisando...' : 'Analisar Currículo'}
                  {!isUploading && <Check className="ml-2 h-4 w-4" />}
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
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                  <FileText className="h-3.5 w-3.5" /> PDF
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1">
                  <Image className="h-3.5 w-3.5" /> Imagem
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
