# DESIGN.md — Portfólio Luiz Porto

> Fonte única de verdade visual do site. Qualquer seção nova ou alterada segue este arquivo.
> Referência viva: `docs/prototipo-hero.html` (Hero + navegação já aprovados).

---

## 1. Conceito

**Um terminal com senso de humor.** O site parece o ambiente de trabalho de um dev curioso: abas de editor, comandos, logs. Mas é leve, tem piadas pequenas e convida a mexer.

- **É:** técnico, direto, descontraído, interativo, rápido.
- **Não é:** currículo corporativo, template de agência, landing page de SaaS.
- **Regra de ouro:** a ousadia fica concentrada em poucos pontos (o nome no hero, o terminal, a paleta de comandos). O resto é calmo e bem espaçado.

---

## 2. Tokens

Todos os valores vivem como variáveis CSS em `:root`. Nenhuma cor literal fora dos tokens.

### Cores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0E110F` | Fundo da página (grafite com leve viés verde) |
| `--surface` | `#151A16` | Cards, terminal, botões secundários |
| `--surface-2` | `#1B221D` | Barra do terminal, item selecionado |
| `--line` | `#26302A` | Bordas, divisores, pontos inativos |
| `--fg` | `#E4EAE5` | Texto principal |
| `--muted` | `#8C988F` | Texto secundário, labels, metadados |
| `--green` | `#7BE495` | **Cor de destaque principal** (menta viva) |
| `--green-deep` | `#3FAE60` | Bordas em hover, sombra "sólida" dos botões |
| `--glow` | `rgba(123,228,149,.18)` | Halo de foco/hover (anel de 4–6px) |
| `--pop` | `#F3CF5A` | Amarelo de apoio, **só** para momentos brincalhões (hover das letras do nome, ponto da aba em hover, avisos no terminal) |

- Fundo tem uma grade de pontos sutil: `radial-gradient` 1px a cada 24px, opacidade ~5%.
- O amarelo nunca vira cor de botão, título ou bloco. É tempero.
- Bolinhas da barra do terminal: vermelho `#E5736A`, `--pop`, `--green`.
- Tema: **dark-only por escolha**. `color-scheme: dark` no `:root`. Remover o toggle de tema claro.

### Tipografia

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,300..800&family=Geist:wght@400;500;600&display=swap">
```

| Token | Fonte | Uso |
|---|---|---|
| `--font-display` | `"Martian Mono", "JetBrains Mono", ui-monospace, Menlo, monospace` | Nome, títulos, navegação, botões, terminal, labels, metadados |
| `--font-body` | `"Geist", "Segoe UI", system-ui, sans-serif` | Parágrafos e textos longos |

- **Martian Mono tem eixo de largura (`wdth`)**: use isso como recurso de personalidade.
  - Nome, linha 1: peso 750, `font-stretch: 85%` (condensado e pesado), `letter-spacing: -.04em`.
  - Nome, linha 2: peso 300, `font-stretch: 112%` (largo e leve), em `--green`.
  - Terminal: `font-stretch: 90%`.
- Escala: `--step--1: .8125rem` · `--step-0: 1rem` · `--step-1: 1.125rem` · `--step-3: clamp(2.4rem, 6.4vw, 4.6rem)`.
- Corpo: `line-height: 1.6`, largura máxima ~54–62ch.
- Títulos com `text-wrap: balance`.
- Números que mudam (relógio, contadores): `font-variant-numeric: tabular-nums`.

### Espaço, forma e movimento

- Container: `max-width: 1160px`, gutter lateral `max(16px, env(safe-area-inset-left))`.
- Espaçamento por `gap` em flex/grid, múltiplos de 4px. Seções: `padding-block` ~56–104px.
- Raios: **6px** em botões e inputs, **10px** em janelas (terminal, paleta), **999px** só em pílulas de status. Nada de cantos de 16px+.
- Sombras: sem sombras difusas genéricas. Os botões usam uma "sombra sólida" deslocada (`0 6px 0 -2px`) que dá sensação de tecla.
- Easing padrão: `--ease: cubic-bezier(.2, .8, .2, 1)`. Durações de 150–300ms em interações, até 700ms na entrada do nome.

---

## 3. Componentes

### Navegação (sticky)

- Altura 60px, fundo `--bg` a 86% com `backdrop-filter: blur(8px)`, borda inferior `--line`. `top: env(safe-area-inset-top)`.
- **Logo:** `luiz@porto:~$` + cursor em bloco verde piscando (`steps(1)`). `luiz` em verde, o resto em `--muted`. No mobile, mostra só `luiz` + cursor.
- **Abas como arquivos de editor:** `● sobre.md` · `● experiencia.log` · `● projetos/` · `● stack.json` · `● contato.sh`.
  - Ponto em `--line`; vira `--pop` no hover e `--green` na aba ativa.
  - Aba ativa: sublinhado verde de 2px que cresce da esquerda (`scaleX`), definido via `aria-current="true"` por IntersectionObserver.
  - No mobile, as abas rolam horizontalmente dentro do próprio container (sem barra visível). A página nunca rola na horizontal.
- **Direita:** botão `comandos [/]` (abre a paleta) e botão de idioma `PT`. Abaixo de 860px o texto "comandos" some e fica só o `/`.

### Hero

Grid de duas colunas (`1.15fr / 1fr`), uma coluna abaixo de 860px. Altura definida pelo conteúdo, **nunca `100vh`**.

Coluna esquerda, nesta ordem:
1. **Pílula de status** com borda tracejada e ponto verde pulsando: `aberto a oportunidades · CLT, PJ ou freela`.
2. **Nome** em duas linhas (ver tipografia). Cada letra é um `<span class="ch">` com `aria-hidden`; o `h1` leva `aria-label` com o nome.
   - Entrada: letras descem de `translateY(-.35em)` com atraso de 35ms por letra (sem opacity 0).
   - Hover em cada letra: sobe `.12em`, gira `-6deg`, vira `--pop`.
3. **Lede** em `--muted`, com termos-chave em `--fg` (peso 500) e tecnologias em `--green` mono.
4. **CTAs:** primário verde `cd ~/projetos →` + secundários `GitHub ↗` e `LinkedIn ↗`. Hover: sobe 2px + sombra sólida; a seta anda 3px.
5. **Linha de metadados** mono pequena: `local Palmas · HH:MM` (relógio em `America/Araguaina`) · `uptime no TJTO Xa Ym Zd` (desde 01/06/2024) · `TCC 10/10`.

Coluna direita: **terminal interativo** (ver abaixo), levemente girado `rotate(.6deg)` no desktop.

### Terminal interativo

- Janela com barra (3 bolinhas + `~/luiz — zsh`), corpo com rolagem própria (330px desktop, 280px mobile) e linha de input `➜ ~`.
- Foco no input: borda `--green-deep` + anel `--glow`. Clicar em qualquer lugar da janela foca o input.
- **Boot:** mostra `last login`, executa `whoami` e lista os comandos como botões clicáveis.
- **Comandos:** `help`, `whoami`, `stack`, `projetos`/`ls` (lista e rola até a seção), `tcc`, `contato`, `copiar` (copia o e-mail), `cafe` (3 cafés, depois "erro 418: sou um bule"), `sudo contratar` (finge senha e rola até contato), `pwd`, `date`, `clear`, `exit`.
- Comando desconhecido: `zsh: comando não encontrado: X · tente help`.
- Histórico com ↑/↓, autocompletar com Tab, aceita entrada sem acento.
- Cores no output: verde para destaques e prompt, amarelo para pastas/avisos, `--muted` para comentários.

### Paleta de comandos

- Abre com `/` (quando não se está digitando) ou pelo botão da nav. Fecha com `Esc` ou clique fora.
- Overlay escuro com blur leve; caixa com borda `--green-deep` e anel `--glow`; entra com um "pop" de 220ms.
- Itens: ir para cada seção, abrir GitHub/LinkedIn, copiar e-mail, pedir café no terminal, `sudo contratar` (marcado como "segredo").
- Filtro ignora acentos. Navegação por ↑/↓/Enter. Rodapé com as teclas.

### Toast

Pílula verde sólida, centralizada embaixo, some em ~2s. Usada para "e-mail copiado".

---

## 4. Seções seguintes (direção, ainda a construir)

Cada seção tem um título mono em verde no formato de arquivo, igual à aba correspondente.

- **`~/sobre.md`** — foto + texto curto em primeira pessoa; destaque para a história "estagiário de suporte → engenheiro" e o TCC com beacons BLE.
- **`~/experiencia.log`** — timeline em formato de log: `[2024-06 → agora] ESMAT/TJTO  eng. de software jr`.
- **`~/projetos/`** — cada projeto é uma "pasta" que expande ao clicar (README curto, stack, links). Hover: borda verde + anel `--glow`.
- **`~/stack.json`** — habilidades como um objeto JSON com syntax highlight, não barras de porcentagem.
- **`~/contato.sh`** — e-mail como texto selecionável + botão copiar; links sociais.

---

## 5. Voz e texto

- Primeira pessoa, frases curtas, português do dia a dia.
- Pode ter humor, mas a informação vem primeiro.
- Labels e comandos em minúsculas.
- **Evitar:** "apaixonado por tecnologia", "transformo ideias em código", "soluções inovadoras", "desenvolvedor apaixonado por sistemas que fazem diferença".

---

## 6. Não fazer

- Gradientes coloridos, glassmorphism, sombras difusas grandes.
- Emojis como ícones de seção ou de cards (o ☕ dentro do terminal é a exceção).
- Efeito typewriter em texto longo ou terminal "falso" que só rola sozinho.
- Barras de habilidade em porcentagem.
- Tudo centralizado; cantos muito arredondados em todo bloco.
- Animações disparadas por scroll que deixam conteúdo invisível até aparecer.
- Bibliotecas de animação (GSAP, AOS, etc.). CSS + JS puro resolve.

---

## 7. Acessibilidade e performance

- Contraste AA em todo texto (`--muted` sobre `--bg` passa; não usar `--line` para texto).
- Foco visível: `outline: 2px solid var(--green); outline-offset: 3px`.
- `prefers-reduced-motion: reduce` desliga todas as animações e transições.
- Atalho `/` nunca dispara enquanto o usuário digita num input.
- Terminal com `aria-live="polite"`; paleta com `role="dialog"`, `aria-modal` e `role="listbox"`.
- Responsivo de 360px a desktop, sem rolagem horizontal.
- Sem dependências além do Google Fonts. Meta: Lighthouse ≥ 90 em performance e acessibilidade.
