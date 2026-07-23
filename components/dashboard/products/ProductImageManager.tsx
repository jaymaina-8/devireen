'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, Trash2, Star, UploadCloud, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToastStore } from '@/lib/store/toast-store';
import { addProductImageRecord, deleteProductImageRecord, setPrimaryProductImageRecord } from '@/actions/product.actions';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export function ProductImageManager({ 
  productId, 
  initialImages = [],
  onPendingFilesChange
}: { 
  productId?: string, 
  initialImages?: any[],
  onPendingFilesChange?: (files: File[]) => void
}) {
  const [images, setImages] = useState<any[]>(initialImages);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{ id: string, url: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToastStore();
  const supabase = createClient();

  const handleUploadFiles = async (files: File[]) => {
    if (!files.length) return;

    if (!productId) {
      const newPending = [...pendingFiles, ...files];
      setPendingFiles(newPending);
      if (onPendingFilesChange) onPendingFilesChange(newPending);
      return;
    }

    setIsUploading(true);
    let uploadedCount = 0;
    
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}/${uuidv4()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        const url = publicUrlData.publicUrl;
        
        const isPrimary = images.length === 0 && uploadedCount === 0;

        const result = await addProductImageRecord({
          product_id: productId,
          url,
          is_primary: isPrimary,
          sort_order: images.length + uploadedCount,
        });

        if (result.success) {
          setImages(prev => [...prev, result.data]);
          uploadedCount++;
        } else {
          throw new Error(result.error);
        }
      }
      
      addToast({ title: 'Success', description: `${uploadedCount} image(s) uploaded`, variant: 'success' });
    } catch (err: any) {
      addToast({ title: 'Upload Failed', description: err.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleUploadFiles(acceptedFiles);
  }, [productId, images.length, pendingFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    disabled: isUploading
  });

  const confirmDelete = (imageId: string, url: string) => {
    setImageToDelete({ id: imageId, url });
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!imageToDelete || !productId) return;
    
    setIsDeleting(true);
    try {
      const { id: imageId, url } = imageToDelete;
      
      // Delete from DB
      await deleteProductImageRecord(imageId, productId);
      
      // Try to extract path from URL and delete from storage
      try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/products/');
        if (pathParts.length > 1) {
          const filePath = pathParts[1];
          await supabase.storage.from('products').remove([filePath]);
        }
      } catch (e) {
        // Ignore storage delete errors if URL is external or not standard
      }
      
      // Update UI
      setImages(images.filter(img => img.id !== imageId));
      addToast({ title: 'Success', description: 'Image deleted', variant: 'success' });
      setDeleteConfirmOpen(false);
    } catch (err: any) {
      addToast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setImageToDelete(null);
    }
  };

  const handleSetPrimary = async (imageId: string) => {
    if (!productId) return;
    try {
      const result = await setPrimaryProductImageRecord(imageId, productId);
      if (result.success) {
        setImages(images.map(img => ({
          ...img,
          is_primary: img.id === imageId
        })));
        addToast({ title: 'Success', description: 'Primary image updated', variant: 'success' });
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      addToast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-sm font-medium text-gray-900">Uploading images...</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              {isDragActive ? 'Drop the images here...' : 'Click or drag images to upload'}
            </p>
            <p className="text-xs text-gray-500">Supports JPG, PNG, WEBP</p>
          </>
        )}
      </div>

      {(images.length > 0 || pendingFiles.length > 0) && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Uploaded Images ({images.length + pendingFiles.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img.id} className={`group relative aspect-square rounded-xl border-2 overflow-hidden bg-gray-100 ${img.is_primary ? 'border-blue-500 shadow-sm' : 'border-transparent hover:border-gray-300'}`}>
                <Image src={img.url} alt={img.alt_text || 'Product image'} fill className="object-cover" />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-between">
                    {!img.is_primary && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleSetPrimary(img.id); }}
                        className="p-1.5 bg-white rounded text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
                        title="Set as Primary"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                    )}
                    {img.is_primary && (
                      <div className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-semibold flex items-center shadow-sm">
                        <Star className="w-3 h-3 mr-1 fill-current" /> Primary
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); confirmDelete(img.id, img.url); }}
                      className="p-1.5 bg-white rounded text-red-600 hover:bg-red-50 transition-colors shadow-sm ml-auto"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {pendingFiles.map((file, idx) => (
              <div key={`pending-${idx}`} className={`group relative aspect-square rounded-xl border-2 overflow-hidden bg-gray-100 border-dashed border-gray-300`}>
                <Image src={URL.createObjectURL(file)} alt="Pending upload" fill className="object-cover opacity-70" />
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        const newPending = pendingFiles.filter((_, i) => i !== idx);
                        setPendingFiles(newPending);
                        if (onPendingFilesChange) onPendingFilesChange(newPending);
                      }}
                      className="p-1.5 bg-white rounded text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center p-1 bg-white/90 text-xs font-medium text-gray-700 rounded backdrop-blur-sm">
                    Pending Upload
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Image"
        description="Are you sure you want to delete this image? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
        onConfirm={handleDelete}
        isProcessing={isDeleting}
      />
    </div>
  );
}
