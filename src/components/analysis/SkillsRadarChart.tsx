import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface SkillsRadarChartProps {
  softSkills: Record<string, number>;
  hardSkills: Record<string, number>;
}

// Helper function to format skill labels - converts camelCase/snake_case to readable text
const formatSkillLabel = (key: string): string => {
  // Common label mappings for Portuguese
  const commonLabels: Record<string, string> = {
    // Soft Skills
    comunicacao: 'Comunicação',
    lideranca: 'Liderança',
    trabalhoEquipe: 'Trabalho em Equipe',
    resolucaoProblemas: 'Resolução de Problemas',
    adaptabilidade: 'Adaptabilidade',
    criatividade: 'Criatividade',
    criatividadeInovacao: 'Criatividade e Inovação',
    organizacao: 'Organização',
    empatia: 'Empatia',
    negociacao: 'Negociação',
    gestaoTempo: 'Gestão do Tempo',
    proatividade: 'Proatividade',
    resiliencia: 'Resiliência',
    pensamentoCritico: 'Pensamento Crítico',
    inteligenciaEmocional: 'Inteligência Emocional',
    
    // Generic Hard Skills (not technology-specific)
    gestaoEquipes: 'Gestão de Equipes',
    gestaoProjetos: 'Gestão de Projetos',
    planejamentoEstrategico: 'Planejamento Estratégico',
    analiseFinanceira: 'Análise Financeira',
    analiseDados: 'Análise de Dados',
    marketingDigital: 'Marketing Digital',
    designGrafico: 'Design Gráfico',
    redacao: 'Redação',
    vendas: 'Vendas',
    atendimentoCliente: 'Atendimento ao Cliente',
  };

  // Return mapped label if exists
  if (commonLabels[key]) {
    return commonLabels[key];
  }

  // Otherwise, format the key: remove underscores, capitalize first letter of each word
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function SkillsRadarChart({ softSkills, hardSkills }: SkillsRadarChartProps) {
  const softData = Object.entries(softSkills).map(([key, value]) => ({
    skill: formatSkillLabel(key),
    value,
    fullMark: 100,
  }));

  const hardData = Object.entries(hardSkills).map(([key, value]) => ({
    skill: formatSkillLabel(key),
    value,
    fullMark: 100,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Soft Skills */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h4 className="mb-4 text-center text-sm font-semibold text-foreground">
          Soft Skills
        </h4>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={softData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Radar
                name="Soft Skills"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hard Skills */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <h4 className="mb-4 text-center text-sm font-semibold text-foreground">
          Hard Skills
        </h4>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={hardData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Radar
                name="Hard Skills"
                dataKey="value"
                stroke="hsl(var(--accent))"
                fill="hsl(var(--accent))"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
