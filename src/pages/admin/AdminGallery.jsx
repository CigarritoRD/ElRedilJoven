import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';
import { useGalleries, useGalleryPhotos } from '../../hooks/useGallery';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { GalleryForm } from '../../components/admin/GalleryForm';
import { MultiImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { GalleryEmpty } from '../../components/ui/EmptyState';
import { formatDate } from '../../lib/utils';
import { toast } from 'sonner';

export function AdminGallery() {
  const { galleries, isLoading, createGallery, updateGallery, deleteGallery, isCreating } = useGalleries();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [photosModalOpen, setPhotosModalOpen] = useState(false);

  const { photos, addPhoto, deletePhoto, isAdding } = useGalleryPhotos(selectedGalleryId);

  const handleSubmit = async (data) => {
    try {
      if (editingGallery) {
        updateGallery({ id: editingGallery.id, ...data });
        toast.success('Álbum actualizado correctamente');
      } else {
        createGallery(data);
        toast.success('Álbum creado correctamente');
      }
      setModalOpen(false);
      setEditingGallery(null);
    } catch (error) {
      toast.error('Error al guardar el álbum');
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteGallery(deleteId);
      toast.success('Álbum eliminado');
      setDeleteId(null);
    }
  };

  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setModalOpen(true);
  };

  const handleManagePhotos = (galleryId) => {
    setSelectedGalleryId(galleryId);
    setPhotosModalOpen(true);
  };

  const handleAddPhoto = (photo) => {
    if (selectedGalleryId) {
      addPhoto({ gallery_id: selectedGalleryId, ...photo });
      toast.success('Foto agregada');
    }
  };

  const handleRemovePhoto = (index) => {
    const photo = photos[index];
    if (photo) {
      deletePhoto(photo.id);
      toast.success('Foto eliminada');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Galería</h1>
          <p className="text-white/60">Gestiona los álbumes de fotos</p>
        </div>
        <Button onClick={() => { setEditingGallery(null); setModalOpen(true); }}>
          <Plus className="h-5 w-5" />
          Nuevo álbum
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/10" />
          ))}
        </div>
      ) : galleries.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleries.map((gallery) => (
            <Card key={gallery.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={gallery.cover_image || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600'}
                  alt={gallery.title}
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute top-4 left-4" variant="default">
                  {gallery.photos?.length || 0} fotos
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">{gallery.title}</h3>
                <p className="text-sm text-white/60 mb-3 line-clamp-2">{gallery.description}</p>
                <p className="text-xs text-white/40 mb-3">{formatDate(gallery.created_at)}</p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleManagePhotos(gallery.id)}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4" />
                    Fotos
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(gallery)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeleteId(gallery.id)}
                    className="text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <GalleryEmpty onAdd={() => setModalOpen(true)} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingGallery(null); }}
        title={editingGallery ? 'Editar álbum' : 'Nuevo álbum'}
        size="lg"
      >
        <GalleryForm
          gallery={editingGallery}
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </Modal>

      <Modal
        isOpen={photosModalOpen}
        onClose={() => { setPhotosModalOpen(false); setSelectedGalleryId(null); }}
        title="Administrar fotos"
        size="lg"
      >
        <MultiImageUploader
          images={photos}
          onAdd={handleAddPhoto}
          onRemove={handleRemovePhoto}
          bucket="photos"
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Eliminar álbum"
        message="¿Estás seguro de que quieres eliminar este álbum? Todas las fotos serán eliminadas."
      />
    </div>
  );
}
