import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '../../schemas';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { MultiImageUploader } from '../../components/admin/ImageUploader';
import { settingsService } from '../../services/settingsService';
import { toast } from 'sonner';

export function AdminSettings() {
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {
      hero_title: '',
      hero_subtitle: '',
      hero_image: '',
      hero_images: [],
      welcome_text: '',
      contact_phone: '',
      contact_email: '',
      instagram_url: '',
      facebook_url: '',
      whatsapp_url: '',
      youtube_url: '',
      tiktok_url: '',
      address: '',
      about_hero_image: '',
      about_community_image_1: '',
      about_community_image_2: '',
    },
  });

  const heroImage = useWatch({ control, name: 'hero_image' });
  const heroImages = useWatch({ control, name: 'hero_images' }) || [];

  const handleHeroImageUpload = (url) => {
    setValue('hero_image', url, { shouldValidate: true });
  };

  const handleHeroImagesAdd = (newImage) => {
    const current = heroImages || [];
    setValue('hero_images', [...current, newImage], { shouldValidate: true });
  };

  const handleHeroImagesRemove = (index) => {
    const current = [...(heroImages || [])];
    current.splice(index, 1);
    setValue('hero_images', current, { shouldValidate: true });
  };

  const loadSettings = async () => {
    try {
      const data = await settingsService.get();
      reset({
        hero_title: data.hero_title || '',
        hero_subtitle: data.hero_subtitle || '',
        hero_image: data.hero_image || '',
        hero_images: data.hero_images || [],
        welcome_text: data.welcome_text || '',
        contact_phone: data.contact_phone || '',
        contact_email: data.contact_email || '',
        instagram_url: data.instagram_url || '',
        facebook_url: data.facebook_url || '',
        whatsapp_url: data.whatsapp_url || '',
        youtube_url: data.youtube_url || '',
        tiktok_url: data.tiktok_url || '',
        address: data.address || '',
        about_hero_image: data.about_hero_image || '',
        about_community_image_1: data.about_community_image_1 || '',
        about_community_image_2: data.about_community_image_2 || '',
      });
    } catch (error) {
      toast.error('Error al cargar la configuración');
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await settingsService.update(data);
      toast.success('Configuración guardada correctamente');
    } catch (error) {
      toast.error('Error al guardar la configuración');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-white/60">Ajustes generales del sitio</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Hero Principal</h2>
          <div className="space-y-4">
            <Input
              label="Título del Hero"
              {...register('hero_title')}
              error={errors.hero_title?.message}
            />
            <Input
              label="Subtítulo del Hero"
              {...register('hero_subtitle')}
              error={errors.hero_subtitle?.message}
            />
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Imagen principal del Hero
              </label>
              <ImageUploader
                currentImage={heroImage}
                onUpload={handleHeroImageUpload}
                bucket="settings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Imágenes adicionales del Hero (rotación automática)
              </label>
              <MultiImageUploader
                images={heroImages}
                onAdd={handleHeroImagesAdd}
                onRemove={handleHeroImagesRemove}
                bucket="settings"
              />
              {errors.hero_images && (
                <p className="mt-1 text-sm text-red-500">{errors.hero_images.message}</p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Texto de Bienvenida</h2>
          <Textarea
            label="Mensaje de bienvenida"
            {...register('welcome_text')}
            error={errors.welcome_text?.message}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Página Nosotros - Imágenes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Imagen Hero de Nosotros
              </label>
              <ImageUploader
                currentImage={useWatch({ control, name: 'about_hero_image' })}
                onUpload={(url) => setValue('about_hero_image', url, { shouldValidate: true })}
                bucket="settings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Imagen Comunidad 1
              </label>
              <ImageUploader
                currentImage={useWatch({ control, name: 'about_community_image_1' })}
                onUpload={(url) => setValue('about_community_image_1', url, { shouldValidate: true })}
                bucket="settings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Imagen Comunidad 2
              </label>
              <ImageUploader
                currentImage={useWatch({ control, name: 'about_community_image_2' })}
                onUpload={(url) => setValue('about_community_image_2', url, { shouldValidate: true })}
                bucket="settings"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Información de Contacto</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Teléfono"
              {...register('contact_phone')}
              error={errors.contact_phone?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register('contact_email')}
              error={errors.contact_email?.message}
            />
            <Input
              label="Dirección"
              {...register('address')}
              error={errors.address?.message}
              className="md:col-span-2"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Redes Sociales</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Instagram URL"
              {...register('instagram_url')}
              error={errors.instagram_url?.message}
            />
            <Input
              label="Facebook URL"
              {...register('facebook_url')}
              error={errors.facebook_url?.message}
            />
            <Input
              label="YouTube URL"
              {...register('youtube_url')}
              error={errors.youtube_url?.message}
            />
            <Input
              label="TikTok URL"
              {...register('tiktok_url')}
              error={errors.tiktok_url?.message}
            />
            <Input
              label="WhatsApp URL"
              {...register('whatsapp_url')}
              error={errors.whatsapp_url?.message}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" loading={saving}>
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
}
