// components/ui/firebase-image-upload.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadFile, deleteFile } from '@/lib/firebase';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const FirebaseImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
      if (!e.target.files || e.target.files.length === 0) return;

      const file = e.target.files[0];
      if (index !== undefined) setUploadingIndex(index);

      try {
        const filePath = `products/${Date.now()}-${file.name}`;
        const url = await uploadFile(file, filePath);
        onChange(url);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingIndex(null);
        e.target.value = ''; // Reset input
      }
    },
    [onChange]
  );

  const handleRemove = useCallback(
    async (url: string) => {
      try {
        await deleteFile(url);
        onRemove(url);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    },
    [onRemove]
  );

  if (!isMounted) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {value.map((url, index) => (
          <div
            key={url}
            className="relative aspect-square rounded-md overflow-hidden border"
          >
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {uploadingIndex === index && (
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              )}
            </div>
            <Image
              fill
              className={`object-cover ${uploadingIndex === index ? 'opacity-50' : ''}`}
              alt="Product image"
              src={url}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-20 h-8 w-8"
              onClick={() => handleRemove(url)}
              disabled={disabled || uploadingIndex !== null}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {value.length < 10 && (
          <label
            className={`aspect-square border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-50 ${
              disabled || uploadingIndex !== null ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e)}
              disabled={disabled || uploadingIndex !== null}
            />
            <div className="flex flex-col items-center gap-2">
              {uploadingIndex === null ? (
                <>
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-sm">Upload Image</span>
                </>
              ) : (
                <Loader2 className="h-6 w-6 animate-spin" />
              )}
            </div>
          </label>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Upload product images (max 10 images, 5MB each)
      </p>
    </div>
  );
};

export default FirebaseImageUpload;