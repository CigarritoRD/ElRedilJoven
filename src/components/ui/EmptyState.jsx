import { cn } from '../../lib/utils';
import { Button } from './Button';
import { Calendar, Image, Megaphone, Users } from 'lucide-react';

export function EmptyState({ 
  icon: Icon = Calendar, 
  title, 
  description, 
  action,
  actionLabel,
  className 
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 rounded-full bg-primary/10 p-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-white/60">{description}</p>
      )}
      {action && (
        <Button onClick={action}>
          {actionLabel || 'Agregar'}
        </Button>
      )}
    </div>
  );
}

export function EventsEmpty({ onAdd }) {
  return (
    <EmptyState
      icon={Calendar}
      title="No hay actividades"
      description="Aún no hay actividades registradas. Agrega la primera para comenzar."
      action={onAdd}
      actionLabel="Crear actividad"
    />
  );
}

export function AnnouncementsEmpty({ onAdd }) {
  return (
    <EmptyState
      icon={Megaphone}
      title="No hay anuncios"
      description="Aún no hay anuncios publicados. Crea uno para informar a los jóvenes."
      action={onAdd}
      actionLabel="Crear anuncio"
    />
  );
}

export function GalleryEmpty({ onAdd }) {
  return (
    <EmptyState
      icon={Image}
      title="No hay álbumes"
      description="Aún no hay álbumes de fotos. Crea uno para compartir los momentos especiales."
      action={onAdd}
      actionLabel="Crear álbum"
    />
  );
}
