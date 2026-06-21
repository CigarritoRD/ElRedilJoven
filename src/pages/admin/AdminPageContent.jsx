import { useState } from 'react';
import { usePageSections, useUpdatePageSection } from '../../hooks/usePageSections';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { toast } from 'sonner';

const PAGES = [
  { slug: 'home', label: 'Inicio' },
  { slug: 'about', label: 'Nosotros' },
  { slug: 'contact', label: 'Contacto' },
  { slug: 'gallery', label: 'Galería' },
  { slug: 'program', label: 'Programa' },
  { slug: 'activities', label: 'Actividades' },
  { slug: 'announcements', label: 'Anuncios' },
];

const SECTION_LABELS = {
  hero: 'Hero principal',
  devocional: 'Sección devocional',
  community_title: 'Sección comunidad',
  announcements_title: 'Sección anuncios',
  welcome_title: 'Texto de bienvenida',
  values_title: 'Valores',
  stats_title: 'Estadísticas',
  cta_title: 'CTA final',
  form_title: 'Título del formulario',
  info_title: 'Información de contacto',
};

const SECTION_FIELDS = {
  hero: ['title', 'subtitle', 'cta_label', 'cta_url'],
  devocional: ['title', 'subtitle', 'cta_label', 'cta_url'],
  community_title: ['title', 'subtitle'],
  announcements_title: ['title', 'subtitle', 'cta_label', 'cta_url'],
  welcome_title: ['title', 'cta_label', 'cta_url'],
  values_title: ['title', 'subtitle'],
  stats_title: [],
  cta_title: ['title', 'body', 'cta_label', 'cta_url'],
  form_title: ['title'],
  info_title: ['title'],
};

export function AdminPageContent() {
  const { data: allSections, isLoading } = usePageSections();
  const updateMutation = useUpdatePageSection();
  const [selectedPage, setSelectedPage] = useState('home');
  const [editingSections, setEditingSections] = useState({});

  const pageData = allSections?.[selectedPage] || {};
  const currentEditing = editingSections[selectedPage] || {};

  const handleFieldChange = (sectionKey, field, value) => {
    setEditingSections(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [sectionKey]: {
          ...prev[selectedPage]?.[sectionKey],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async (sectionKey) => {
    const sectionData = currentEditing[sectionKey];
    if (!sectionData) return;

    const section = pageData[sectionKey];
    if (!section?.id) {
      toast.error('Sección no encontrada en base de datos');
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: section.id, updates: sectionData });
      toast.success('Sección guardada correctamente');
      setEditingSections(prev => {
        const next = { ...prev };
        delete next[selectedPage]?.[sectionKey];
        return next;
      });
    } catch {
      toast.error('Error al guardar la sección');
    }
  };

  const handleCancel = (sectionKey) => {
    setEditingSections(prev => {
      const next = { ...prev };
      delete next[selectedPage]?.[sectionKey];
      return next;
    });
  };

  const isDirty = (sectionKey) => !!currentEditing[sectionKey];
  const isSaving = updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Contenido del Sitio</h1>
        <p className="text-white/60">Edita textos y secciones de cada página</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <Card className="p-2">
            <nav className="space-y-1">
              {PAGES.map(page => (
                <button
                  key={page.slug}
                  onClick={() => setSelectedPage(page.slug)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedPage === page.slug
                      ? 'bg-primary text-white'
                      : 'text-white/60 hover:bg-white/10'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-48 bg-white/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(pageData).map(([sectionKey, section]) => {
                const fields = SECTION_FIELDS[sectionKey] || [];
                const dirty = isDirty(sectionKey);
                const changed = currentEditing[selectedPage]?.[sectionKey] || {};

                return (
                  <Card key={sectionKey} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">
                        {SECTION_LABELS[sectionKey] || sectionKey}
                      </h3>
                      {section.id && (
                        <span className="text-xs text-white/40 font-mono">
                          {section.id.slice(0, 8)}...
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {fields.includes('title') && (
                        <Input
                          label="Título"
                          value={dirty ? changed.title : (section.title || '')}
                          onChange={e => handleFieldChange(sectionKey, 'title', e.target.value)}
                        />
                      )}

                      {fields.includes('subtitle') && (
                        <Input
                          label="Subtítulo"
                          value={dirty ? changed.subtitle : (section.subtitle || '')}
                          onChange={e => handleFieldChange(sectionKey, 'subtitle', e.target.value)}
                        />
                      )}

                      {fields.includes('body') && (
                        <Textarea
                          label="Contenido"
                          value={dirty ? changed.body : (section.body || '')}
                          onChange={e => handleFieldChange(sectionKey, 'body', e.target.value)}
                          rows={3}
                        />
                      )}

                      {fields.includes('cta_label') && (
                        <Input
                          label="Texto del botón"
                          value={dirty ? changed.cta_label : (section.cta_label || '')}
                          onChange={e => handleFieldChange(sectionKey, 'cta_label', e.target.value)}
                        />
                      )}

                      {fields.includes('cta_url') && (
                        <Input
                          label="URL del botón"
                          value={dirty ? changed.cta_url : (section.cta_url || '')}
                          onChange={e => handleFieldChange(sectionKey, 'cta_url', e.target.value)}
                        />
                      )}
                    </div>

                    {dirty && (
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                        <Button
                          size="sm"
                          onClick={() => handleSave(sectionKey)}
                          loading={isSaving}
                        >
                          Guardar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCancel(sectionKey)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
