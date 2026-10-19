// Utilitários compartilhados entre terminal, paleta e hero
import { content } from './content.js';

export const $ = (sel, root = document) => root.querySelector(sel);

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

// minúsculas e sem acento: "Café" → "cafe"
export const fold = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// rola até uma seção; com focus: true leva o foco junto (navegação por teclado)
export function goTo(id, { focus = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  if (focus) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}

let toastTimer;
export function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  $('#sr-status').textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
}

export const copyEmail = () =>
  navigator.clipboard ? navigator.clipboard.writeText(content.email) : Promise.reject(new Error('clipboard indisponível'));
