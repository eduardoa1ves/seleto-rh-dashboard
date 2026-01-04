import { cn } from '@/lib/utils';

interface SeniorityBarProps {
  level: 'estagiario' | 'assistente' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'lider' | 'coordenador' | 'gerente' | 'diretor' | 'executivo';
  score: number;
}

const levelLabels: Record<string, string> = {
  estagiario: 'Estagiário',
  assistente: 'Assistente',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
  lider: 'Líder',
  coordenador: 'Coordenador',
  gerente: 'Gerente',
  diretor: 'Diretor',
  executivo: 'Executivo',
};

const levelColors: Record<string, string> = {
  estagiario: 'bg-slate-400',
  assistente: 'bg-slate-500',
  junior: 'bg-blue-500',
  pleno: 'bg-primary',
  senior: 'bg-purple-500',
  especialista: 'bg-accent',
  lider: 'bg-orange-500',
  coordenador: 'bg-amber-500',
  gerente: 'bg-success',
  diretor: 'bg-emerald-600',
  executivo: 'bg-teal-600',
};

export function SeniorityBar({ level, score }: SeniorityBarProps) {
  const levels = ['estagiario', 'assistente', 'junior', 'pleno', 'senior', 'especialista', 'lider', 'coordenador', 'gerente', 'diretor', 'executivo'];
  const currentLevelIndex = levels.indexOf(level);

  // Simplified display for visualization - show key milestones
  const displayLevels = ['estagiario', 'junior', 'pleno', 'senior', 'especialista', 'coordenador', 'gerente', 'diretor', 'executivo'];
  const displayLevelIndex = displayLevels.indexOf(level);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Nível de Senioridade</h4>
        <span className={cn(
          'rounded-full px-3 py-1 text-sm font-semibold text-white',
          levelColors[level]
        )}>
          {levelLabels[level]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000 ease-out',
              levelColors[level]
            )}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>{score}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Level indicators - simplified view */}
      <div className="flex justify-between gap-1">
        {displayLevels.map((lvl, index) => {
          const isActive = displayLevelIndex >= index;
          return (
            <div
              key={lvl}
              className={cn(
                'flex flex-col items-center gap-1 flex-1',
                isActive ? 'opacity-100' : 'opacity-40'
              )}
            >
              <div className={cn(
                'h-2.5 w-2.5 rounded-full',
                isActive ? levelColors[lvl] : 'bg-secondary'
              )} />
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {levelLabels[lvl]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
