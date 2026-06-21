import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUploadImage } from '../../hooks/useUploadImage';

export function ImageUploader({ currentImage, onUpload, bucket }) {
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);
  const { uploadEventImage, uploadGalleryImage, uploadPhoto, uploading } = useUploadImage();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      let url;
      if (bucket === 'events') {
        url = await uploadEventImage(file);
      } else if (bucket === 'galleries') {
        url = await uploadGalleryImage(file);
      } else {
        url = await uploadPhoto(file);
      }
      onUpload(url);
    } catch (error) {
      setPreview(currentImage || '');
    }
  };

  const handleRemove = () => {
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUpload('');
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          className={cn(
            'flex flex-col items-center justify-center h-48 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer transition hover:border-primary/50 hover:bg-primary/5',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <Upload className="h-10 w-10 text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 font-medium">
            {uploading ? 'Subiendo...' : 'Arrastra o haz clic para subir'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG hasta 10MB
          </p>
        </label>
      )}
    </div>
  );
}

export function MultiImageUploader({ images = [], onAdd, onRemove, bucket }) {
  const fileInputRef = useRef(null);
  const { uploading } = useUploadImage();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    for (const file of files) {
      try {
        let url;
        if (bucket === 'photos') {
          url = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        }
        onAdd({ image_url: url || 'https://images.unsplash.com/photo-' + Date.now() + '?w=800', caption: '' });
      } catch (error) {
        console.error('Error uploading:', error);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img.image_url}
              alt={img.caption}
              className="h-32 w-full object-cover rounded-xl"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white shadow opacity-0 group-hover:opacity-100 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <label
          className={cn(
            'flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer transition hover:border-primary/50 hover:bg-primary/5',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500 font-medium">Agregar</p>
        </label>
      </div>
    </div>
  );
}
