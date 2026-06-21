import { motion } from 'framer-motion';

export function SectionHeader({ title, subtitle, centered = true, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-primary-container to-tertiary rounded-full" />
    </motion.div>
  );
}
