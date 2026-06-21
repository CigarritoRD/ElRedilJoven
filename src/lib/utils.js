import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date, locale = 'es-ES') {
  return new Date(date).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time, locale = 'es-ES') {
  if (!time) return '';
  const clean = time.trim();
  if (clean.match(/^\d{1,2}:\d{2}(:\d{2})?$/)) {
    const [h, m] = clean.split(':');
    const d = new Date(2000, 0, 1, parseInt(h, 10), parseInt(m, 10));
    return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  return new Date(`2000-01-01T${clean}`).toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatShortDate(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
