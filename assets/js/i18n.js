/*
 * Idioma PT/EN.
 * - [data-i18n="chave"]            → innerHTML vem do dicionário
 * - [data-i18n-attr="attr:chave,…"] → atributos (placeholder, aria-label…)
 * - [data-content="caminho"]        → innerHTML vem do content.js (ex.: "status", "lede")
 * Outros módulos usam t(), loc() e onLangChange() para textos gerados por JS.
 */
import { content } from './content.js';
import pt from './locales/pt.js';
import en from './locales/en.js';

const dict = { pt, en };

const STORAGE_KEY = 'lang';
const listeners = [];

function readStoredLang() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

let lang = dict[readStoredLang()] ? readStoredLang() : 'pt';

export const getLang = () => lang;

// t('term.coffee', { n: 2 }) → texto com {n} substituído; cai no PT se faltar no EN
export function t(key, vars = {}) {
  const s = dict[lang][key] ?? dict.pt[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

// resolve { pt, en } para o idioma atual; strings passam direto
export const loc = v => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] ?? v.pt : v);

export const onLangChange = fn => listeners.push(fn);

const pick = path => path.split('.').reduce((o, k) => o?.[k], content);

function apply({ notify = true } = {}) {
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    el.dataset.i18nAttr.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      el.setAttribute(attr, t(key));
    });
  });
  document.querySelectorAll('[data-content]').forEach(el => { el.innerHTML = loc(pick(el.dataset.content)) ?? ''; });

  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang.toUpperCase();

  if (notify) listeners.forEach(fn => fn(lang));
}

export function setLang(next) {
  if (!dict[next]) return;
  lang = next;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* modo privado: só não lembra */ }
  apply();
}

// reaplica os textos (ex.: depois de inserir as seções carregadas)
export const refreshI18n = () => apply({ notify: false });

export function initI18n() {
  apply();
  document.getElementById('lang-btn')?.addEventListener('click', () => setLang(lang === 'pt' ? 'en' : 'pt'));
}
