// Ponto de entrada único (carregado como módulo ES pelo index.html)
import { content } from './content.js';
import { initI18n, refreshI18n } from './i18n.js';
import { loadSections, scrollToHash } from './sections.js';
import { initProjects } from './projects.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initTerminal, run } from './terminal.js';
import { initPalette } from './palette.js';

// links e e-mail que aparecem no HTML vêm do content.js
function bindContent() {
  document.querySelectorAll('[data-link]').forEach(a => { a.href = content.links[a.dataset.link]; });
  document.querySelectorAll('[data-email]').forEach(a => { a.href = `mailto:${content.email}`; });
  document.querySelectorAll('[data-email-text]').forEach(el => { el.textContent = content.email; });
}

// 1. nav + hero já estão no index.html: ficam prontos sem esperar as seções
bindContent();
initI18n();
initHero();
initTerminal();
initPalette({ run });

// 2. seções vêm de sections/*.html
await loadSections();
bindContent();
initProjects();
refreshI18n();
initNav();
scrollToHash();
