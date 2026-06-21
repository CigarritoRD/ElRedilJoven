import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, Award, Cross } from 'lucide-react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import PageHero from '../../components/public/PageHero';
import { SectionHeader } from '../../components/public/SectionHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useSettings } from '../../hooks/useSettings';
import { usePageSections } from '../../hooks/usePageSections';

export function About() {
  const { data: settings, isLoading } = useSettings();
  const { data: sections } = usePageSections();
  const aboutSections = sections?.about || {};

  const stats = [
    { label: 'Jóvenes activos', value: '150+' },
    { label: 'Actividades al año', value: '40+' },
    { label: 'Años de ministry', value: '15+' },
  ];

  const values = [
    {
      icon: Cross,
      title: 'Fe',
      description: 'Crecemos en nuestra relación con Dios a través de la Palabra, oración y comunión.',
    },
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Construimos lazos de hermandad donde cada persona se siente bienvenida y valorada.',
    },
    {
      icon: Target,
      title: 'Propósito',
      description: 'Descubrimos y vivir el plan que Dios tiene para cada uno de nosotros.',
    },
    {
      icon: Heart,
      title: 'Servicio',
      description: 'Servimos a nuestra comunidad con amor y dedicación, reflejando el amor de Cristo.',
    },
  ];

  const aboutHero = settings?.about_hero_image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600';
  const communityImg1 = settings?.about_community_image_1 || 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600';
  const communityImg2 = settings?.about_community_image_2 || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600';
  const welcomeText = settings?.welcome_text || 'Un lugar para crecer, conectar y vivir la fe juntos. Sé parte de lo que Dios está haciendo en nuestra juventud.';

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Nuestra comunidad"
        title={aboutSections.hero?.title || 'Sobre'}
        highlight={aboutSections.hero?.highlight || 'Nosotros'}
        subtitle={aboutSections.hero?.subtitle || 'Conectados en fe, unidos en propósito. Somos el ministerio juvenil de la Iglesia El Redil.'}
      />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="purple" className="mb-4">Bienvenidos</Badge>
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Bienvenido a El Redil Joven
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                {welcomeText}
              </p>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Cada semana ofrecemos actividades diseñadas para que los jóvenes puedan crecer en su fe,
                conectar con otros y vivir una vida con propósito. Desde cultos juveniles hasta retiros
                espirituales, nuestro objetivo es ser un espacio donde cada joven pueda encontrar su lugar
                en la familia de Dios.
              </p>
              <Link to="/contacto">
                <Button>Contáctanos</Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src={communityImg1}
                alt="Jóvenes en comunidad"
                className="rounded-2xl h-64 w-full object-cover"
              />
              <img
                src={communityImg2}
                alt="Momento de oración"
                className="rounded-2xl h-64 w-full object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader
            title={aboutSections.values_title?.title || 'Nuestros Valores'}
            subtitle={aboutSections.values_title?.subtitle || 'Lo que nos define como comunidad'}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass className="h-full text-center p-6">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container/30">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-on-surface-variant text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass className="text-center p-8">
                  <p className="text-5xl font-display font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-on-surface-variant">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            {aboutSections.cta_title?.title || '¿Quieres ser parte?'}
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8">
            {aboutSections.cta_title?.body || 'Nos encantaría conocerte. Visítanos cualquier domingo o contáctanos para más información sobre cómo puedes involucrarte en El Redil Joven.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={aboutSections.cta_title?.cta_url || '/programa'}>
              <Button>{aboutSections.cta_title?.cta_label || 'Ver programa'}</Button>
            </Link>
            <Link to="/contacto">
              <Button variant="secondary">Contactar</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
