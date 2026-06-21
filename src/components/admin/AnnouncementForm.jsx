import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { announcementSchema, announcementImportanceOptions } from '../../schemas';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export function AnnouncementForm({ announcement, onSubmit, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(announcementSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: announcement?.title || '',
      content: announcement?.content || '',
      importance: announcement?.importance || 'normal',
      is_published: announcement?.is_published ?? true,
      show_on_home: announcement?.show_on_home ?? false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título"
        placeholder="Título del anuncio"
        error={errors.title?.message}
        {...register('title')}
      />

      <Textarea
        label="Contenido"
        placeholder="Escribe el contenido del anuncio..."
        error={errors.content?.message}
        {...register('content')}
      />

      <Select
        label="Importancia"
        options={announcementImportanceOptions}
        error={errors.importance?.message}
        {...register('importance')}
      />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_published"
            {...register('is_published')}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
            Publicar anuncio
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="show_on_home"
            {...register('show_on_home')}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="show_on_home" className="text-sm font-medium text-gray-700">
            Mostrar en página principal
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" loading={isLoading}>
          {announcement ? 'Actualizar' : 'Crear'} anuncio
        </Button>
      </div>
    </form>
  );
}
