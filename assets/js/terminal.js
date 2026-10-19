// Terminal interativo: comandos, histórico (↑/↓), autocompletar (Tab) e entrada sem acento
import { content } from './content.js';
import { $, fold, escapeHtml, goTo, toast, copyEmail } from './util.js';
import { t, loc, onLangChange } from './i18n.js';
import { activeProjects } from './projects.js';

const HELP = ['whoami', 'stack', 'projetos', 'tcc', 'contato', 'cafe', 'sudo contratar', 'clear'];

// apelidos em inglês (não aparecem no help nem no Tab)
const ALIASES = { projects: 'projetos', contact: 'contato', copy: 'copiar', coffee: 'cafe', 'sudo hire': 'sudo contratar' };

let out, input;
let coffee = 3;
const history = [];
let hi = 0;

function line(html = '', cls) {
  const p = document.createElement('p');
  if (cls) p.className = cls;
  p.innerHTML = html;
  out.appendChild(p);
  out.scrollTop = out.scrollHeight;
  return p;
}

function projectsList() {
  const projects = activeProjects();
  const width = Math.max(...projects.map(p => p.slug.length)) + 3;
  return projects.map(p => {
    let s = `<span class="y">${p.slug.padEnd(width)}</span>${loc(p.desc)}`;
    if (p.private) s += ` <span class="dim">(${t('term.private')})</span>`;
    if (p.url) s += ` <a href="${p.url}" target="_blank" rel="noopener" aria-label="${t('term.open')} ${loc(p.name)} ${t('hero.newTab')}">↗</a>`;
    return s;
  }).join('\n');
}

const cmds = {
  help: () => {
    line(`<span class="dim">${t('term.available')}</span>`);
    const box = line();
    HELP.forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip-cmd';
      b.textContent = c;
      b.addEventListener('click', () => run(c));
      box.appendChild(b);
    });
  },
  whoami: () => line(`${content.fullName.toLowerCase()}\n<span class="dim">${loc(content.role)}</span>`),
  stack: () => {
    const width = Math.max(...content.stack.map(s => loc(s.label).length)) + 2;
    line(content.stack.map(s => `<span class="g">${loc(s.label).padEnd(width)}</span>${s.items}`).join('\n'));
  },
  projetos: () => {
    line(`${projectsList()}\n<span class="dim">${t('term.scrolling')}</span>`);
    setTimeout(() => goTo('projetos'), 700);
  },
  ls: () => cmds.projetos(),
  tcc: () => line(`${loc(content.tcc.title)}\n<span class="g">${t('term.grade')}: ${content.tcc.grade}</span> <span class="dim">· ${loc(content.tcc.joke)}</span>`),
  contato: () => line(`<a href="mailto:${content.email}">${content.email}</a>\n${t('term.contactHint')}`),
  copiar: () => {
    copyEmail().then(
      () => { line(`<span class="g">${t('term.copied')}</span>`); toast(t('toast.copied')); },
      () => line(t('term.copyFail')),
    );
  },
  cafe: () => {
    if (coffee > 0) { coffee--; line(t('term.coffee', { n: coffee })); }
    else line(t('term.teapot'));
  },
  'sudo contratar': () => {
    line(t('term.sudo'));
    setTimeout(() => goTo('contato'), 900);
  },
  sudo: () => line(t('term.sudoUsage')),
  pwd: () => line(content.pwd),
  date: () => line(new Date().toLocaleString('pt-BR', { timeZone: content.timeZone })),
  clear: () => { out.innerHTML = ''; },
  exit: () => line(`<span class="dim">${t('term.exit')}</span>`),
};

export function run(raw) {
  const c = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!c) return;
  history.push(c);
  hi = history.length;
  line(`<span class="prompt">➜ ~</span> ${escapeHtml(c)}`);
  const key = fold(c);
  const fn = cmds[c] || cmds[key] || cmds[ALIASES[key]];
  if (fn) fn();
  else line(t('term.notFound', { c: escapeHtml(c) }));
}

function boot() {
  out.innerHTML = '';
  line(`<span class="dim">${t('term.lastLogin')}</span>`);
  line('<span class="prompt">➜ ~</span> whoami');
  cmds.whoami();
  line(t('term.hint'));
  cmds.help();
}

export function initTerminal() {
  out = $('#term-out');
  input = $('#term-cmd');

  $('#term-form').addEventListener('submit', e => {
    e.preventDefault();
    run(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && history.length) {
      hi = Math.max(0, hi - 1);
      input.value = history[hi];
      e.preventDefault();
    } else if (e.key === 'ArrowDown' && history.length) {
      hi = Math.min(history.length, hi + 1);
      input.value = history[hi] || '';
      e.preventDefault();
    } else if (e.key === 'Tab' && input.value) {
      const typed = fold(input.value);
      const match = Object.keys(cmds).find(k => k.startsWith(typed));
      if (match) { input.value = match; e.preventDefault(); }
    }
  });

  // clicar em qualquer lugar da janela foca o input (menos em botões, links e seleção de texto)
  $('#term').addEventListener('click', e => {
    if (e.target.closest('button, a') || getSelection().toString()) return;
    input.focus({ preventScroll: true });
  });

  boot();
  onLangChange(boot);
}
