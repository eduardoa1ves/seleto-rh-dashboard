export interface CandidateAnalysis {
  id: string;
  candidate: {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  target_role?: string;
  targetRole?: string; // Keep for compatibility if needed
  fit_score: number;
  fitScore?: number; // Keep for compatibility if needed
  analyzed_at: string;
  analyzedAt?: string; // Keep for compatibility if needed
  status: 'analyzing' | 'completed' | 'error';

  soft_skills: Record<string, number>;
  softSkills?: Record<string, number>; // Keep for compatibility
  hard_skills: Record<string, number>;
  hardSkills?: Record<string, number>; // Keep for compatibility

  seniority_level: 'estagiario' | 'assistente' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'lider' | 'coordenador' | 'gerente' | 'diretor' | 'executivo';
  seniorityLevel?: 'estagiario' | 'assistente' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'lider' | 'coordenador' | 'gerente' | 'diretor' | 'executivo'; // Keep for compatibility
  seniority_score: number;
  seniorityScore?: number; // Keep for compatibility

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

export const mockCandidates: CandidateAnalysis[] = [];

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
