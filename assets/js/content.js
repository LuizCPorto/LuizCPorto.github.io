/*
 * Conteúdo editável do site. Hero, terminal, paleta e contato leem daqui.
 * Textos com versão em inglês usam { pt, en }; strings simples valem para os dois idiomas.
 * O lede aceita HTML: <b> destaca um termo, <span class="hl"> marca uma tecnologia.
 */
export const content = {
  name: ['Luiz Carlos', 'Porto.'],
  fullName: 'Luiz Carlos Porto do Carmo',

  status: {
    pt: 'aberto a oportunidades · CLT, PJ ou freela',
    en: 'open to opportunities · full-time, contract or freelance',
  },

  lede: {
    pt: 'Dev <b>.NET</b> em Palmas e <b>único engenheiro de software</b> do setor de tecnologia da ESMAT/TJTO: o sistema acadêmico vai do requisito ao deploy comigo. Criei do zero o módulo de pós-graduação, integrei o Moodle e os sistemas do TJTO com <span class="hl">C#</span> e <span class="hl">SQL</span> e pus a <span class="hl">Vertex AI</span> pra emitir certificados. Nas horas vagas: apuração de eleição com dados do TSE e xG de futebol.',
    en: '<b>.NET</b> dev in Palmas, Brazil, and the <b>only software engineer</b> on ESMAT/TJTO’s tech team: the academic system goes from requirements to deploy with me. I built the graduate programs module from scratch, wired Moodle and TJTO’s internal systems together with <span class="hl">C#</span> and <span class="hl">SQL</span>, and put <span class="hl">Vertex AI</span> to work issuing certificates. On the side: live election tallies from TSE data and football xG.',
  },

  role: {
    pt: 'eng. de software jr @ ESMAT/TJTO · bacharel em C.C. pela UFT',
    en: 'jr software engineer @ ESMAT/TJTO · B.Sc. in Computer Science, UFT',
  },

  email: 'luizcporto.dev@gmail.com',

  links: {
    github: 'https://github.com/LuizCPorto',
    linkedin: 'https://linkedin.com/in/luizcporto/',
  },

  city: 'Palmas',
  timeZone: 'America/Araguaina',
  pwd: '/home/luiz/palmas-to',

  // data de início no TJTO (AAAA-MM-DD), usada no "uptime" do hero
  tjtoStart: '2024-06-01',

  tcc: {
    grade: '10/10',
    title: {
      pt: 'beacons BLE para frequência automática na ESMAT',
      en: 'BLE beacons for automatic attendance at ESMAT',
    },
    joke: {
      pt: 'adeus, lista de chamada',
      en: 'goodbye, roll call',
    },
  },

  /*
   * Projetos: viram os cards de "Projetos em destaque" e a lista do comando `projetos` do terminal.
   * - desc:      linha curta do terminal
   * - about:     texto do card
   * - url:       link do card e do terminal; linkLabel é o texto do botão
   * - private:   código fechado (mostra o selo "Privado")
   * - enabled:   false esconde o projeto do site e do terminal sem apagar os dados
   */
  projects: [
    {
      slug: 'eleicoes/',
      icon: '🗳️',
      name: { pt: 'Eleições 2026 · Placar da Apuração', en: '2026 Elections · Vote Count Board' },
      desc: {
        pt: 'simulador do 2º turno 2026, propostas e apuração ao vivo',
        en: '2026 runoff simulator, platforms and live vote count',
      },
      about: {
        pt: 'Site que usa a API e os dados públicos do TSE para acompanhar a apuração das urnas eletrônicas ao vivo, com patrimônio dos candidatos, plano de governo e até um simulador do segundo turno.',
        en: 'A site built on the TSE (Brazilian Electoral Court) public data and API to follow the electronic ballot count live, with candidates’ declared assets, government plans and even a runoff simulator.',
      },
      stack: ['JavaScript', 'API do TSE', 'Dados abertos', 'Cloudflare Workers'],
      url: 'https://eleicao.luiz-porto.workers.dev/?turno=2',
      linkLabel: { pt: 'Site', en: 'Website' },
    },
    {
      slug: 'sav/',
      icon: '🎓',
      name: { pt: 'SAV — Sistema de Secretaria Acadêmica', en: 'SAV — Academic Registry System' },
      desc: { pt: 'secretaria acadêmica', en: 'academic registry system' },
      about: {
        pt: 'Sistema institucional de secretaria acadêmica no qual atuo no desenvolvimento, manutenção e evolução de funcionalidades, integrações e automações internas na ESMAT/TJTO. Gerencia alunos, matrículas, disciplinas, notas e emissão de documentos, com automação de certificados via Vertex AI (Google Cloud).',
        en: 'Institutional academic registry system at ESMAT/TJTO, where I develop, maintain and evolve features, integrations and internal automations. It manages students, enrollments, courses, grades and document issuing, with certificate automation via Vertex AI (Google Cloud).',
      },
      stack: ['.NET 5', 'ASP.NET Core', 'MySQL', 'Entity Framework', 'Vertex AI'],
      url: 'https://app.esmat.tjto.jus.br/sav/',
      linkLabel: { pt: 'Site', en: 'Website' },
      private: true,
    },
    {
      slug: 'pizzaria/',
      icon: '🍕',
      name: { pt: 'App de Gestão para Pizzaria', en: 'Pizzeria Management App' },
      desc: { pt: 'gestão de pedidos e estoque', en: 'orders and stock management' },
      about: {
        pt: 'Sistema completo de gestão para pizzarias, cobrindo pedidos, cardápio, controle de estoque e fluxo operacional. Back-end em C# com ASP.NET Core e front-end mobile em React Native com Expo Go, desenvolvido com foco em usabilidade para o dia a dia do estabelecimento.',
        en: 'Full management system for pizzerias, covering orders, menu, stock control and daily operations. C# / ASP.NET Core back-end and a React Native (Expo Go) mobile front-end, built for day-to-day usability.',
      },
      stack: ['C#', 'ASP.NET Core', 'React Native', 'Expo Go', 'Entity Framework'],
      url: 'https://github.com/MiniPizza-du-Luiz',
      linkLabel: 'GitHub',
      enabled: false, // desativado por enquanto
    },
    {
      slug: 'futebol-xg/',
      icon: '⚽',
      name: { pt: 'Análise Quantitativa de Futebol', en: 'Quantitative Football Analysis' },
      desc: { pt: 'Dixon-Coles + IA local', en: 'Dixon-Coles + local AI' },
      about: {
        pt: 'Bot de análise quantitativa para ligas de futebol europeias. Aplica o modelo matemático de Dixon-Coles para calcular probabilidades e Expected Goals (xG), cruzando os dados com um modelo de IA local (Ollama) para validar palpites e identificar apostas de valor real com base em Fair Odds.',
        en: 'Quantitative analysis bot for European football leagues. It applies the Dixon-Coles model to compute probabilities and Expected Goals (xG), cross-checking with a local AI model (Ollama) to validate picks and spot real value bets based on fair odds.',
      },
      stack: ['Python', 'Dixon-Coles', 'xG', 'Ollama', 'IA Local'],
      url: 'https://github.com/LuizCPorto/Analise-esportiva-Ia',
      linkLabel: 'GitHub',
    },
  ],

  // comando `stack` do terminal
  stack: [
    { label: 'back', items: 'C# · ASP.NET Core · EF Core · APIs REST' },
    { label: { pt: 'dados', en: 'data' }, items: 'SQL Server · MySQL' },
    { label: 'front', items: 'React · React Native/Expo · JS' },
    { label: 'extra', items: 'GitHub Actions · Vertex AI · Ollama' },
  ],
};
