/*
 * Carrega as seções de sections/*.html no lugar de cada <div data-include="…">.
 * Funciona no GitHub Pages (fetch de arquivo estático com caminho relativo);
 * localmente precisa de servidor (python -m http.server), não de file://.
 */
export async function loadSections() {
  const slots = [...document.querySelectorAll('[data-include]')];
  const results = await Promise.allSettled(slots.map(async slot => {
    const res = await fetch(slot.dataset.include);
    if (!res.ok) throw new Error(`${res.status} ao carregar ${slot.dataset.include}`);
    return res.text();
  }));
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') slots[i].outerHTML = r.value;
    else console.error(r.reason);
  });
}

// com a página aberta direto num link tipo /#projetos, a seção só existe depois do fetch
export function scrollToHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
}
