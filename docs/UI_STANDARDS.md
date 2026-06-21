# UI/UX Guidelines — Iglesia El Redil Joven

## 1. Identidad Visual

Portal juvenil de la Iglesia El Redil con estética **dark neon glassmorphism**: fondos oscuros profundos, acentos neon en gradientes, y superficies translúcidas con blur.

## 2. Paleta de Colores

```css
/* Superficies */
--surface:           #0b1326   /* Fondo principal */
--surface-low:       #131b2e   /* Secciones alternas */
--surface-container: #171f33   /* Cards, inputs */
--surface-container-high: #222a3d  /* Estados hover */
--surface-dim:       #070b16   /* Overlays profundos */

/* Primarios */
--primary:           #d2bbff   /* Texto principal, acentos claros */
--primary-container: #7c3aed   /* Gradientes, fondos de énfasis */
--secondary:         #adc6ff   /* Acentos secundarios */
--secondary-container: #0566d9 /* Fondos secundarios */
--tertiary:          #a4d64c   /* Verde lima — estados, badges */
--tertiary-container: #5a8a1a  /* Verde lima oscuro */

/* Texto */
--on-surface:        #dae2fd   /* Texto principal sobre surface */
--on-surface-variant: #ccc3d8  /* Texto secundario */
--on-primary:        #0b1326   /* Texto sobre primario */

/* Utilidades */
--outline:           rgba(255,255,255,0.12)
--outline-variant:   rgba(255,255,255,0.08)
```

## 3. Tipografía

- **Display / Headings**: `Bricolage Grotesque` (Google Fonts), weights 600–800
- **Body / UI**: `Plus Jakarta Sans` (Google Fonts), weights 400–600
- **Labels / Mono**: System monospace fallback

```css
font-display: 'Bricolage Grotesque', system-ui, sans-serif;
font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
```

## 4. Border Radius

| Elemento       | Valor         |
|---------------|---------------|
| Cards glass   | `1.25rem` (20px) |
| Cards planas  | `1rem` (16px)    |
| Buttons       | `9999px` (pill)  |
| Inputs        | `0.75rem` (12px) |
| Badges/pills  | `9999px`         |
| Imágenes      | `1rem` - `1.5rem` |
| Avatares      | `50%` (circle)  |

## 5. Sombras

```css
/* Glassmorphism */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05);

/* Neon glows */
--glow-primary:   0 0 20px rgba(210, 187, 255, 0.3);
--glow-tertiary:  0 0 20px rgba(164, 214, 76, 0.3);
--glow-secondary: 0 0 20px rgba(173, 198, 255, 0.3);
```

## 6. Espaciado

Usar sistema de 8px con estas escalas:

| Token      | Valor        | Uso                         |
|-----------|-------------|----------------------------|
| `4`       | `1rem`      | Elementos inline            |
| `8`       | `2rem`      | Componentes                 |
| `12`      | `3rem`      | Secciones internas          |
| `16`      | `4rem`      | Secciones de página          |
| `24`      | `6rem`      | Separaciones grandes         |

**Page Hero (navbar fixed):**
```jsx
// src/components/public/PageHero.jsx
// pt-32 md:pt-36 pb-16 md:pb-20
```

**Section Padding (container-custom):**
```jsx
// className="py-16 md:py-20"
// className="px-4 md:px-6 lg:px-8"
```

## 7. Glassmorphism

```css
/* Card glass base */
.glass {
  background: rgba(23, 31, 51, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Overlay gradient para secciones */
.bg-gradient-to-b from-primary-container/10 to-transparent
```

## 8. Neon Effects

```css
/* Texto con glow */
.text-gradient {
  background: linear-gradient(135deg, #d2bbff, #7c3aed, #a4d64c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 12px rgba(124, 58, 237, 0.4));
}

/* Glow para badges activos */
.shadow-[0_0_15px_rgba(164,214,76,0.6)]  /* lime/tertiary */
.shadow-[0_0_15px_rgba(173,198,255,0.6)]  /* secondary/cyan */
.shadow-[0_0_15px_rgba(124,58,237,0.5)]   /* primary/purple */
```

## 9. Patrones de Página

### Estructura de página interna

```jsx
<div className="min-h-screen">
  <Navbar />                            // fixed top-0

  <PageHero                            // pt-32 md:pt-36
    title="Título"
    subtitle="Subtítulo"
    eyebrow="Opcional"
    highlight="Resaltado"
  />

  <section className="section-padding bg-surface-low">
    <div className="container-custom">
      // contenido
    </div>
  </section>

  <Footer />
</div>
```

### Container máximo

```jsx
// container-custom: mx-auto px-4 md:px-6 lg:px-8 max-w-7xl
```

## 10. Components

### Button

| Variant    | Clases                                          |
|-----------|------------------------------------------------|
| `primary`  | gradient primary + glow                        |
| `secondary`| bg-primary-container, border outline          |
| `ghost`    | transparent, hover bg-surface-container-high  |
| `danger`   | bg-error/20, text-error                        |

### Badge

| Variant  | Uso                              |
|---------|----------------------------------|
| `lime`   | Estados activos — upcoming       |
| `cyan`   | Estados en curso — active        |
| `purple` | Categorías general               |
| `gold`   | Destacados                       |
| `coral`  | Alertas, urgent                  |
| `muted`  | Estados completados              |

### Card

```jsx
<Card variant="glass" hover className="p-6">
  // Contenido
</Card>
```

### Input/Select/Textarea

Usar siempre la variant `filled` en dark mode:

```jsx
<Input variant="filled" label="Nombre" />
// Clases internas: bg-surface-container border-outline
```

## 11. Navbar

- Posición: `fixed top-0 left-0 right-0 z-50`
- Altura: `h-16` (64px)
- Fondo: glass con blur
- Contenido: logo a la izquierda, links al centro, CTA a la derecha
- Responsive: hamburger menu en mobile

## 12. Footer

- Fondo: `bg-surface-dim` o `bg-surface`
- Links en columnas
- Social icons con hover glow
- Copyright y versión

## 13. Good Practices

### Do
- Usar `PageHero` en todas las páginas internas (NO hardcodear el header)
- Usar `container-custom` para envolver contenido
- Usar `Card glass` para cards con información
- Usar `Badge` para estados y categorías
- Usar `formatDate()` y `formatTime()` de `lib/utils.js` para fechas
- Usar `onError` en imágenes para fallback con gradiente + icono
- Usar grid para ≤3 items en FeaturedEvents, Swiper para >3

### Don't
- NO usar `bg-white`, `bg-cream`, `text-gray-*` en páginas públicas
- NO usar `pt-32` manualmente — usar `PageHero`
- NO hardcodear colores hex outside de tailwind.config o CSS
- NO usar `AnimatePresence` con opacity-only transitions — puede causar flash
- NO usar clases Tailwind no definidas en el theme (como `px-margin-mobile`, `max-w-container-max`)

## 14. Dark Mode Checklist

Antes de marcar una página como completa, verificar:

- [ ] No hay `bg-white`, `bg-cream`, `bg-gray-50`, `bg-gray-100`
- [ ] No hay `text-gray-600`, `text-gray-700`, `text-gray-900`
- [ ] Todos los inputs/cards usan colores surface
- [ ] Footer usa `bg-surface` o `bg-surface-dim`
- [ ] Botones usan variants oscuras (secondary, ghost)
- [ ] Placeholder text es `text-on-surface-variant`
