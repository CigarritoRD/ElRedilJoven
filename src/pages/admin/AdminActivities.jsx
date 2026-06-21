import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Star, Search } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { EventForm } from '../../components/admin/EventForm';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { EventsEmpty } from '../../components/ui/EmptyState';
import { formatDate, formatTime } from '../../lib/utils';
import { EVENT_STATUSES } from '../../lib/constants';
import { toast } from 'sonner';

export function AdminActivities() {
  const { events, isLoading, createEvent, updateEvent, deleteEvent, isCreating } = useEvents();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (data) => {
    try {
      if (editingEvent) {
        updateEvent({ id: editingEvent.id, ...data });
        toast.success('Actividad actualizada correctamente');
      } else {
        createEvent(data);
        toast.success('Actividad creada correctamente');
      }
      setModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast.error('Error al guardar la actividad');
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteEvent(deleteId);
      toast.success('Actividad eliminada');
      setDeleteId(null);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleToggleFeatured = (event) => {
    updateEvent({ id: event.id, is_featured: !event.is_featured });
    toast.success(event.is_featured ? 'Removed from featured' : 'Marked as featured');
  };

  const statusColors = {
    [EVENT_STATUSES.UPCOMING]: 'green',
    [EVENT_STATUSES.ACTIVE]: 'blue',
    [EVENT_STATUSES.COMPLETED]: 'default',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Actividades</h1>
          <p className="text-white/60">Gestiona las actividades del ministerio</p>
        </div>
        <Button onClick={() => { setEditingEvent(null); setModalOpen(true); }}>
          <Plus className="h-5 w-5" />
          Nueva actividad
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
        <input
          type="text"
          placeholder="Buscar actividades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-white/10" />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <img
                  src={event.image_url || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=200'}
                  alt={event.title}
                  className="h-20 w-32 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{event.title}</h3>
                    {event.is_featured && <Star className="h-4 w-4 text-gold fill-gold" />}
                  </div>
                  <p className="text-sm text-white/60 mb-2 line-clamp-1">{event.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={statusColors[event.status]}>
                      {event.status}
                    </Badge>
                    <Badge variant="primary">{event.category}</Badge>
                    <span className="text-xs text-white/40">
                      {formatDate(event.event_date)} · {formatTime(event.event_time)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleFeatured(event)}
                    className={`p-2 rounded-lg transition ${
                      event.is_featured ? 'bg-gold/10 text-gold' : 'bg-white/10 text-white/40 hover:text-gold'
                    }`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(event.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EventsEmpty onAdd={() => setModalOpen(true)} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingEvent(null); }}
        title={editingEvent ? 'Editar actividad' : 'Nueva actividad'}
        size="lg"
      >
        <EventForm
          event={editingEvent}
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Eliminar actividad"
        message="¿Estás seguro de que quieres eliminar esta actividad? Esta acción no se puede deshacer."
      />
    </div>
  );
}
