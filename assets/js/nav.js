// Aba ativa conforme a rolagem (aria-current) e aba visível na faixa rolável do mobile
import { prefersReducedMotion } from './util.js';

export function initNav() {
  const strip = document.querySelector('.tabs');
  const tabs = [...strip.querySelectorAll('.tab')];

  const keepVisible = tab => {
    const s = strip.getBoundingClientRect();
    const r = tab.getBoundingClientRect();
    if (r.left < s.left || r.right > s.right) {
      strip.scrollTo({ left: strip.scrollLeft + r.left - s.left - 16, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    tabs.forEach(tab => {
      const active = tab.hash === '#' + e.target.id;
      tab.setAttribute('aria-current', active);
      if (active) keepVisible(tab);
    });
  }), { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main > section[id]').forEach(s => io.observe(s));
}
