export interface CandidateAnalysis {
  id: string;
  name: string;
  targetRole: string;
  fitScore: number;
  analyzedAt: string;
  status: 'analyzing' | 'completed' | 'error';
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  
  softSkills: {
    comunicacao: number;
    lideranca: number;
    trabalhoEquipe: number;
    resolucaoProblemas: number;
    adaptabilidade: number;
    criatividadeInovacao: number;
  };
  
  hardSkills: {
    excel: number;
    python: number;
    sql: number;
    powerbi: number;
    gestaoEquipes: number;
    metodologiasAgeis: number;
  };
  
  seniorityLevel: 'junior' | 'pleno' | 'senior' | 'especialista';
  seniorityScore: number;
  
  summary: {
    strengths: string[];
    attentionPoints: string[];
    executiveSummary: string;
  };
  
  experience: {
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }[];
  
  education: {
    institution: string;
    degree: string;
    field: string;
    year: string;
  }[];
  
  languages: {
    language: string;
    level: 'básico' | 'intermediário' | 'avançado' | 'fluente' | 'nativo';
  }[];
}

export const mockCandidates: CandidateAnalysis[] = [
  {
    id: '1',
    name: 'Mariana Costa Silva',
    targetRole: 'Gerente de Projetos',
    fitScore: 87,
    analyzedAt: '2024-01-15T10:30:00',
    status: 'completed',
    email: 'mariana.costa@email.com',
    phone: '(11) 99876-5432',
    location: 'São Paulo, SP',
    linkedin: 'linkedin.com/in/marianacosta',
    
    softSkills: {
      comunicacao: 92,
      lideranca: 88,
      trabalhoEquipe: 85,
      resolucaoProblemas: 90,
      adaptabilidade: 78,
      criatividadeInovacao: 82,
    },
    
    hardSkills: {
      excel: 95,
      python: 45,
      sql: 70,
      powerbi: 88,
      gestaoEquipes: 90,
      metodologiasAgeis: 92,
    },
    
    seniorityLevel: 'senior',
    seniorityScore: 85,
    
    summary: {
      strengths: [
        'Forte experiência em gestão de projetos ágeis',
        'Excelente capacidade de comunicação e liderança',
        'Certificação PMP e Scrum Master',
        'Histórico comprovado de entrega de projetos complexos',
      ],
      attentionPoints: [
        'Experiência limitada em projetos internacionais',
        'Conhecimento técnico em programação pode ser aprimorado',
      ],
      executiveSummary: 'Profissional altamente qualificada com 8 anos de experiência em gestão de projetos no setor de tecnologia. Demonstra forte capacidade de liderança e comunicação, com histórico consistente de entrega de projetos dentro do prazo e orçamento. Recomendada para posições de gerência sênior em ambientes dinâmicos.',
    },
    
    experience: [
      {
        company: 'TechCorp Brasil',
        role: 'Gerente de Projetos Sênior',
        period: '2020 - Atual',
        highlights: [
          'Liderou equipe de 15 profissionais',
          'Entregou 12 projetos estratégicos',
          'Reduziu tempo de entrega em 25%',
        ],
      },
      {
        company: 'Innovare Sistemas',
        role: 'Coordenadora de Projetos',
        period: '2017 - 2020',
        highlights: [
          'Implementou metodologia Scrum',
          'Gerenciou portfólio de R$ 5M',
        ],
      },
    ],
    
    education: [
      {
        institution: 'FGV',
        degree: 'MBA',
        field: 'Gestão de Projetos',
        year: '2019',
      },
      {
        institution: 'USP',
        degree: 'Bacharelado',
        field: 'Administração de Empresas',
        year: '2015',
      },
    ],
    
    languages: [
      { language: 'Português', level: 'nativo' },
      { language: 'Inglês', level: 'avançado' },
      { language: 'Espanhol', level: 'intermediário' },
    ],
  },
  {
    id: '2',
    name: 'Rafael Oliveira Santos',
    targetRole: 'Analista de Dados',
    fitScore: 92,
    analyzedAt: '2024-01-14T14:20:00',
    status: 'completed',
    email: 'rafael.santos@email.com',
    phone: '(21) 98765-4321',
    location: 'Rio de Janeiro, RJ',
    
    softSkills: {
      comunicacao: 78,
      lideranca: 65,
      trabalhoEquipe: 88,
      resolucaoProblemas: 95,
      adaptabilidade: 85,
      criatividadeInovacao: 90,
    },
    
    hardSkills: {
      excel: 98,
      python: 95,
      sql: 92,
      powerbi: 90,
      gestaoEquipes: 55,
      metodologiasAgeis: 75,
    },
    
    seniorityLevel: 'pleno',
    seniorityScore: 68,
    
    summary: {
      strengths: [
        'Domínio avançado de Python e SQL',
        'Experiência sólida com visualização de dados',
        'Capacidade analítica excepcional',
        'Projetos publicados no GitHub',
      ],
      attentionPoints: [
        'Precisa desenvolver habilidades de liderança',
        'Comunicação pode ser aprimorada para apresentações executivas',
      ],
      executiveSummary: 'Analista de dados com forte perfil técnico e 4 anos de experiência. Destaca-se pela capacidade de resolver problemas complexos e criar soluções inovadoras com dados. Ideal para posições que exijam alta competência técnica e pensamento analítico.',
    },
    
    experience: [
      {
        company: 'DataDriven Co.',
        role: 'Analista de Dados Pleno',
        period: '2021 - Atual',
        highlights: [
          'Desenvolveu pipelines de dados automatizados',
          'Criou dashboards executivos em Power BI',
        ],
      },
    ],
    
    education: [
      {
        institution: 'UFRJ',
        degree: 'Mestrado',
        field: 'Ciência de Dados',
        year: '2021',
      },
      {
        institution: 'UFRJ',
        degree: 'Bacharelado',
        field: 'Estatística',
        year: '2019',
      },
    ],
    
    languages: [
      { language: 'Português', level: 'nativo' },
      { language: 'Inglês', level: 'fluente' },
    ],
  },
  {
    id: '3',
    name: 'Carolina Mendes Ferreira',
    targetRole: 'UX Designer',
    fitScore: 78,
    analyzedAt: '2024-01-13T09:15:00',
    status: 'completed',
    email: 'carolina.ferreira@email.com',
    location: 'Belo Horizonte, MG',
    
    softSkills: {
      comunicacao: 88,
      lideranca: 72,
      trabalhoEquipe: 92,
      resolucaoProblemas: 85,
      adaptabilidade: 90,
      criatividadeInovacao: 95,
    },
    
    hardSkills: {
      excel: 60,
      python: 35,
      sql: 40,
      powerbi: 55,
      gestaoEquipes: 65,
      metodologiasAgeis: 85,
    },
    
    seniorityLevel: 'pleno',
    seniorityScore: 62,
    
    summary: {
      strengths: [
        'Alto nível de criatividade e inovação',
        'Excelente trabalho em equipe',
        'Portfolio diversificado de projetos',
      ],
      attentionPoints: [
        'Experiência com métricas de UX pode ser expandida',
        'Conhecimento técnico em desenvolvimento limitado',
      ],
      executiveSummary: 'Designer criativa com forte sensibilidade para experiência do usuário. Trabalha bem em equipes multidisciplinares e demonstra capacidade de adaptação a diferentes contextos de projeto.',
    },
    
    experience: [
      {
        company: 'DesignHub',
        role: 'UX Designer',
        period: '2022 - Atual',
        highlights: [
          'Redesenhou fluxos que aumentaram conversão em 40%',
          'Conduziu mais de 50 testes de usabilidade',
        ],
      },
    ],
    
    education: [
      {
        institution: 'PUC Minas',
        degree: 'Bacharelado',
        field: 'Design Gráfico',
        year: '2021',
      },
    ],
    
    languages: [
      { language: 'Português', level: 'nativo' },
      { language: 'Inglês', level: 'intermediário' },
    ],
  },
];

export const loadingSteps = [
  { text: 'Lendo currículo...', duration: 1500 },
  { text: 'Extraindo informações pessoais...', duration: 1200 },
  { text: 'Analisando experiências profissionais...', duration: 1800 },
  { text: 'Identificando habilidades técnicas...', duration: 1400 },
  { text: 'Avaliando soft skills...', duration: 1600 },
  { text: 'Calculando score de compatibilidade...', duration: 1000 },
  { text: 'Gerando resumo executivo...', duration: 1500 },
  { text: 'Finalizando análise...', duration: 800 },
];
