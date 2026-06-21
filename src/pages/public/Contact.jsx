import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import PageHero from '../../components/public/PageHero';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { toast } from 'sonner';
import { mockSettings } from '../../data/mockGallery';
import { usePageSections } from '../../hooks/usePageSections';

export function Contact() {
  const settings = mockSettings;
  const { data: sections } = usePageSections();
  const contactSections = sections?.contact || {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={contactSections.hero?.title || 'Contáctanos'}
        subtitle={contactSections.hero?.subtitle || '¿Tienes preguntas o quieres saber más? Estamos aquí para ayudarte'}
      />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Envíanos un mensaje
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
                <Input
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
                <Input
                  label="Asunto"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="¿De qué se trata?"
                  required
                />
                <Textarea
                  label="Mensaje"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
                <Button type="submit" loading={sending} className="w-full">
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Información de contacto
              </h2>

              <div className="space-y-6">
                {settings.address && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary-container/20 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Dirección</h3>
                      <p className="text-on-surface-variant">{settings.address}</p>
                    </div>
                  </div>
                )}

                {settings.contact_phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary-container/20 p-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Teléfono</h3>
                      <p className="text-on-surface-variant">{settings.contact_phone}</p>
                    </div>
                  </div>
                )}

                {settings.contact_email && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-full bg-primary-container/20 p-3">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Correo electrónico</h3>
                      <p className="text-on-surface-variant">{settings.contact_email}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-white mb-4">Síguenos en redes sociales</h3>
                <div className="flex gap-4">
                  {settings.instagram_url && (
                    <a
                      href={settings.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white transition hover:bg-primary-container/80"
                    >
                      <FaInstagram className="h-6 w-6" />
                    </a>
                  )}
                  {settings.facebook_url && (
                    <a
                      href={settings.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-white transition hover:bg-secondary-container/80"
                    >
                      <FaFacebook className="h-6 w-6" />
                    </a>
                  )}
                  {settings.youtube_url && (
                    <a
                      href={settings.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-error text-white transition hover:bg-error/80"
                    >
                      <FaYoutube className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
