// Hero: nome letra a letra, relógio de Palmas e uptime no TJTO (status e lede vêm do i18n/content)
import { content } from './content.js';
import { $ } from './util.js';
import { t, onLangChange } from './i18n.js';

function renderName() {
  const h1 = $('#hero-name');
  h1.setAttribute('aria-label', content.name.join(' ').replace(/\.$/, ''));
  h1.textContent = '';
  let i = 0;
  content.name.forEach(text => {
    const line = document.createElement('span');
    line.className = 'line';
    for (const c of text) {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', i++);
      ch.textContent = c === ' ' ? ' ' : c;
      ch.setAttribute('aria-hidden', 'true');
      line.appendChild(ch);
    }
    h1.appendChild(line);
  });
}

// data de hoje no fuso de Palmas, como [ano, mês, dia]
const todayIn = timeZone =>
  new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date()).split('-').map(Number);

// diferença de calendário em anos, meses e dias
function since(startIso, [ty, tm, td]) {
  const [sy, sm, sd] = startIso.split('-').map(Number);
  let y = ty - sy, m = tm - sm, d = td - sd;
  if (d < 0) { m--; d += new Date(ty, tm - 1, 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
}

function tick() {
  $('#clock').textContent = new Date().toLocaleTimeString('pt-BR', {
    timeZone: content.timeZone, hour: '2-digit', minute: '2-digit',
  });
  $('#uptime').textContent = t('hero.uptimeFmt', since(content.tjtoStart, todayIn(content.timeZone)));
}

export function initHero() {
  renderName();
  tick();
  setInterval(tick, 15000);
  onLangChange(tick);
}
