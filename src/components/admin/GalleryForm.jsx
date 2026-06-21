import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gallerySchema } from '../../schemas';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { ImageUploader } from './ImageUploader';

export function GalleryForm({ gallery, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(gallerySchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: gallery?.title || '',
      description: gallery?.description || '',
      cover_image: gallery?.cover_image || '',
      event_id: gallery?.event_id || '',
    },
  });

  const coverImage = useWatch({ control, name: 'cover_image' });

  const handleImageUpload = (url) => {
    setValue('cover_image', url, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título del álbum"
        placeholder="Ej: Retiro de Enero 2026"
        error={errors.title?.message}
        {...register('title')}
      />

      <Textarea
        label="Descripción"
        placeholder="Describe el álbum..."
        error={errors.description?.message}
        {...register('description')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imagen de portada
        </label>
        <ImageUploader
          currentImage={coverImage}
          onUpload={handleImageUpload}
          bucket="galleries"
        />
        {errors.cover_image && (
          <p className="mt-1 text-sm text-red-500">{errors.cover_image.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" loading={isLoading}>
          {gallery ? 'Actualizar' : 'Crear'} álbum
        </Button>
      </div>
    </form>
  );
}
