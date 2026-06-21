export default function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}) {
  const isCenter = align === 'center';

  return (
    <section className="relative pt-32 md:pt-36 pb-16 md:pb-20 overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-container/10 via-primary-container/5 to-transparent" />
      <div className="container-custom relative">
        <div className={`relative text-center ${isCenter ? 'mx-auto max-w-3xl' : ''}`}>
          {eyebrow && (
            <span className="inline-block mb-4 text-sm font-semibold tracking-widest uppercase text-primary">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 leading-tight">
            {title}
            {highlight && (
              <span className="text-primary ml-2">{highlight}</span>
            )}
          </h1>
          {subtitle && (
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
