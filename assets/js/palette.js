// Paleta de comandos: abre com "/" ou pelo botão da nav, filtra sem acento, ↑/↓/Enter, Esc fecha
import { content } from './content.js';
import { $, fold, goTo, toast, copyEmail } from './util.js';
import { t } from './i18n.js';

let pal, box, search, list;
let shown = [];
let sel = 0;
let returnFocus = null;

function actions(run) {
  const section = (file, id) => ({ label: t('pal.goto', { f: file }), kind: t('pal.kSection'), act: () => goTo(id, { focus: true }) });
  return [
    section('sobre.md', 'sobre'),
    section('experiencia.log', 'experiencia'),
    section('projetos/', 'projetos'),
    section('stack.json', 'stack'),
    section('certificados/', 'certificados'),
    section('contato.sh', 'contato'),
    { label: t('pal.github'), kind: t('pal.kLink'), href: content.links.github },
    { label: t('pal.linkedin'), kind: t('pal.kLink'), href: content.links.linkedin },
    { label: t('pal.copy'), kind: t('pal.kAction'), act: () => copyEmail().then(() => toast(t('toast.copied')), () => toast(content.email)) },
    { label: t('pal.coffee'), kind: t('pal.kAction'), act: () => { goTo('hero'); run('cafe'); } },
    { label: 'sudo contratar', kind: t('pal.kSecret'), act: () => { goTo('hero'); run('sudo contratar'); } },
  ];
}

function highlight() {
  [...list.children].forEach((li, n) => li.setAttribute('aria-selected', n === sel));
  const active = list.children[sel];
  if (active?.id) {
    search.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  } else {
    search.removeAttribute('aria-activedescendant');
  }
}

export function initPalette({ run }) {
  pal = $('#palette');
  box = $('.palette-box', pal);
  search = $('#palette-input');
  list = $('#palette-list');

  const render = () => {
    const q = fold(search.value.trim());
    shown = actions(run).filter(a => fold(a.label).includes(q) || fold(a.kind).includes(q));
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    list.innerHTML = '';
    if (!shown.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = t('pal.empty');
      list.appendChild(li);
    }
    shown.forEach((a, n) => {
      const li = document.createElement('li');
      li.id = `pal-opt-${n}`;
      li.setAttribute('role', 'option');
      li.innerHTML = '<span></span><span class="k"></span>';
      li.firstChild.textContent = a.label;
      li.lastChild.textContent = a.kind;
      li.addEventListener('mousemove', () => { if (sel !== n) { sel = n; highlight(); } });
      li.addEventListener('click', () => exec(a));
      list.appendChild(li);
    });
    highlight();
  };

  const open = () => {
    if (!pal.hidden) return;
    returnFocus = document.activeElement;
    pal.hidden = false;
    search.setAttribute('aria-expanded', 'true');
    search.value = '';
    sel = 0;
    render();
    search.focus();
  };

  const close = ({ restore = true } = {}) => {
    pal.hidden = true;
    search.setAttribute('aria-expanded', 'false');
    if (restore) returnFocus?.focus?.({ preventScroll: true });
  };

  const exec = a => {
    // ações que rolam a página cuidam do próprio foco
    close({ restore: !!a.href });
    if (a.href) window.open(a.href, '_blank', 'noopener');
    else a.act();
  };

  $('#open-palette').addEventListener('click', open);
  pal.addEventListener('click', e => { if (!box.contains(e.target)) close(); });
  search.addEventListener('input', () => { sel = 0; render(); });
  search.addEventListener('keydown', e => {
    const n = Math.max(1, shown.length);
    if (e.key === 'ArrowDown') { sel = (sel + 1) % n; highlight(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = (sel - 1 + n) % n; highlight(); e.preventDefault(); }
    else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); exec(shown[sel]); }
    else if (e.key === 'Tab') e.preventDefault(); // o foco fica no diálogo
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !pal.hidden) { close(); return; }
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    const el = document.activeElement;
    const typing = el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
    if (!typing) { e.preventDefault(); open(); }
  });
}
