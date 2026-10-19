// Cards de "Projetos em destaque", montados a partir de content.projects
import { content } from './content.js';
import { $, escapeHtml } from './util.js';
import { t, loc, onLangChange } from './i18n.js';

// projetos com enabled: false ficam fora do site e do terminal
export const activeProjects = () => content.projects.filter(p => p.enabled !== false);

function card(p) {
  const name = escapeHtml(loc(p.name));
  const badge = p.private ? ` <span class="project-badge">${t('proj.private')}</span>` : '';
  const stack = (p.stack || []).map(s => `<span>${escapeHtml(s)}</span>`).join('');
  const link = p.url
    ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener" class="project-link">${escapeHtml(loc(p.linkLabel) || 'Link')} <span aria-hidden="true">↗</span><span class="sr-only"> ${name} ${t('hero.newTab')}</span></a>`
    : `<span class="project-link is-private">${t('proj.codePrivate')}</span>`;

  return `
    <article class="project-card">
      <div class="project-icon" aria-hidden="true">${p.icon || ''}</div>
      <h3 class="project-name">${name}${badge}</h3>
      <p class="project-desc">${escapeHtml(loc(p.about) || loc(p.desc))}</p>
      <div class="project-footer">
        <div class="project-stack">${stack}</div>
        ${link}
      </div>
    </article>`;
}

export function initProjects() {
  const grid = $('#projects-grid');
  if (!grid) return;
  const render = () => { grid.innerHTML = activeProjects().map(card).join(''); };
  render();
  onLangChange(render);
}
