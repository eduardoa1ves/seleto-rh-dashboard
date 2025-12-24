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

const skillLabels: Record<string, string> = {
  comunicacao: 'Comunicação',
  lideranca: 'Liderança',
  trabalhoEquipe: 'Trabalho em Equipe',
  resolucaoProblemas: 'Resolução de Problemas',
  adaptabilidade: 'Adaptabilidade',
  criatividadeInovacao: 'Criatividade',
  excel: 'Excel',
  python: 'Python',
  sql: 'SQL',
  powerbi: 'Power BI',
  gestaoEquipes: 'Gestão de Equipes',
  metodologiasAgeis: 'Metodologias Ágeis',
};

export function SkillsRadarChart({ softSkills, hardSkills }: SkillsRadarChartProps) {
  const softData = Object.entries(softSkills).map(([key, value]) => ({
    skill: skillLabels[key] || key,
    value,
    fullMark: 100,
  }));

  const hardData = Object.entries(hardSkills).map(([key, value]) => ({
    skill: skillLabels[key] || key,
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
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={softData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
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
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={hardData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9 }}
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
