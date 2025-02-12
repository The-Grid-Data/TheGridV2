'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Loader2, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onChange: (fileOrUrl: File | string) => void;
  value?: string;
  accept?: string;
  maxSize?: number;
  isUploading?: boolean;
  className?: string;
}

export function FileUpload({
  onChange,
  value,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  isUploading = false,
  className
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > maxSize) {
          setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange(file);
      }
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.svg']
    },
    maxFiles: 1,
    multiple: false
  });

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          {...getRootProps()}
          className={cn(
            'cursor-pointer rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-accent/50',
            isDragActive && 'border-primary bg-accent',
            error && 'border-destructive'
          )}
        >
          <Input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <UploadIcon className="h-8 w-8" />
            <p className="text-xs">
              PNG, JPG, SVG up to {maxSize / 1024 / 1024}MB
            </p>
          </div>
        </div>

        {(preview || value) && !error && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-white">
              <Image
                src={preview || value || ''}
                alt="Upload preview"
                fill
                className="object-contain p-2"
              />
            </div>
            {value && (
              <Button
                variant="link"
                className="h-auto p-0"
                onClick={() => window.open(value, '_blank')}
              >
                View full size
              </Button>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p>Uploading...</p>
        </div>
      )}
    </div>
  );
}
