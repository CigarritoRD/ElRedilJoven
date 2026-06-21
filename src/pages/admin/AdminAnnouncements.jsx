import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { AnnouncementForm } from '../../components/admin/AnnouncementForm';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { AnnouncementsEmpty } from '../../components/ui/EmptyState';
import { formatDate } from '../../lib/utils';
import { ANNOUNCEMENT_IMPORTANCE } from '../../lib/constants';
import { toast } from 'sonner';

export function AdminAnnouncements() {
  const { announcements, isLoading, createAnnouncement, updateAnnouncement, deleteAnnouncement, isCreating } = useAnnouncements();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnnouncements = announcements.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (data) => {
    try {
      if (editingAnnouncement) {
        updateAnnouncement({ id: editingAnnouncement.id, ...data });
        toast.success('Anuncio actualizado correctamente');
      } else {
        createAnnouncement(data);
        toast.success('Anuncio creado correctamente');
      }
      setModalOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      toast.error('Error al guardar el anuncio');
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteAnnouncement(deleteId);
      toast.success('Anuncio eliminado');
      setDeleteId(null);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setModalOpen(true);
  };

  const handleTogglePublish = (announcement) => {
    updateAnnouncement({ id: announcement.id, is_published: !announcement.is_published });
    toast.success(announcement.is_published ? 'Anuncio ocultado' : 'Anuncio publicado');
  };

  const importanceColors = {
    [ANNOUNCEMENT_IMPORTANCE.BAJA]: 'default',
    [ANNOUNCEMENT_IMPORTANCE.NORMAL]: 'primary',
    [ANNOUNCEMENT_IMPORTANCE.ALTA]: 'coral',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Anuncios</h1>
          <p className="text-white/60">Gestiona los anuncios del ministerio</p>
        </div>
        <Button onClick={() => { setEditingAnnouncement(null); setModalOpen(true); }}>
          <Plus className="h-5 w-5" />
          Nuevo anuncio
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
        <input
          type="text"
          placeholder="Buscar anuncios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-white/10" />
          ))}
        </div>
      ) : filteredAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="p-4">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{announcement.title}</h3>
                    <Badge variant={announcement.is_published ? 'green' : 'default'}>
                      {announcement.is_published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                  <p className="text-sm text-white/60 mb-2 line-clamp-1">{announcement.content}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={importanceColors[announcement.importance]}>
                      {announcement.importance}
                    </Badge>
                    {announcement.show_on_home && (
                      <Badge variant="gold">Inicio</Badge>
                    )}
                    <span className="text-xs text-white/40">
                      {formatDate(announcement.created_at)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTogglePublish(announcement)}
                    className={`p-2 rounded-lg transition ${
                      announcement.is_published
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-white/10 text-white/40 hover:text-green-400'
                    }`}
                  >
                    {announcement.is_published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(announcement.id)}
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
        <AnnouncementsEmpty onAdd={() => setModalOpen(true)} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingAnnouncement(null); }}
        title={editingAnnouncement ? 'Editar anuncio' : 'Nuevo anuncio'}
        size="lg"
      >
        <AnnouncementForm
          announcement={editingAnnouncement}
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Eliminar anuncio"
        message="¿Estás seguro de que quieres eliminar este anuncio? Esta acción no se puede deshacer."
      />
    </div>
  );
}
