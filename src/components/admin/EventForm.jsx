import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema, eventCategoryOptions, eventStatusOptions } from '../../schemas';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ImageUploader } from './ImageUploader';

export function EventForm({ event, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      event_date: event?.event_date || '',
      event_time: event?.event_time || '',
      location: event?.location || '',
      category: event?.category || '',
      status: event?.status || 'upcoming',
      image_url: event?.image_url || '',
      is_featured: event?.is_featured || false,
      is_published: event?.is_published ?? false,
    },
  });

  const imageUrl = useWatch({ control, name: 'image_url' });

  const handleImageUpload = (url) => {
    setValue('image_url', url, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Título"
          placeholder="Nombre de la actividad"
          error={errors.title?.message}
          {...register('title')}
        />

        <Input
          label="Lugar"
          placeholder="Ubicación del evento"
          error={errors.location?.message}
          {...register('location')}
        />
      </div>

      <Textarea
        label="Descripción"
        placeholder="Describe la actividad..."
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Input
          label="Fecha"
          type="date"
          error={errors.event_date?.message}
          {...register('event_date')}
        />

        <Input
          label="Hora"
          type="time"
          error={errors.event_time?.message}
          {...register('event_time')}
        />

        <Select
          label="Categoría"
          options={eventCategoryOptions}
          error={errors.category?.message}
          {...register('category')}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Estado"
          options={eventStatusOptions}
          {...register('status')}
        />

        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="is_featured"
            {...register('is_featured')}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
            Marcar como actividad destacada
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen
          </label>
          <ImageUploader
            currentImage={imageUrl}
            onUpload={handleImageUpload}
            bucket="events"
          />
          {errors.image_url && (
            <p className="mt-1 text-sm text-red-500">{errors.image_url.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="is_published"
            {...register('is_published')}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
            Publicar actividad (visible para todos)
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" loading={isLoading}>
          {event ? 'Actualizar' : 'Crear'} actividad
        </Button>
      </div>
    </form>
  );
}
