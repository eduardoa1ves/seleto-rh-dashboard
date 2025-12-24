import { cn } from '@/lib/utils';

interface SeniorityBarProps {
  level: 'junior' | 'pleno' | 'senior' | 'especialista';
  score: number;
}

const levelLabels: Record<string, string> = {
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista',
};

const levelColors: Record<string, string> = {
  junior: 'bg-muted-foreground',
  pleno: 'bg-primary',
  senior: 'bg-accent',
  especialista: 'bg-success',
};

export function SeniorityBar({ level, score }: SeniorityBarProps) {
  const levels = ['junior', 'pleno', 'senior', 'especialista'];
  const currentLevelIndex = levels.indexOf(level);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Nível de Senioridade</h4>
        <span className={cn(
          'rounded-full px-3 py-1 text-sm font-semibold',
          level === 'junior' && 'bg-muted text-muted-foreground',
          level === 'pleno' && 'bg-primary/10 text-primary',
          level === 'senior' && 'bg-accent/10 text-accent',
          level === 'especialista' && 'bg-success/10 text-success',
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

      {/* Level indicators */}
      <div className="flex justify-between">
        {levels.map((lvl, index) => (
          <div
            key={lvl}
            className={cn(
              'flex flex-col items-center gap-1',
              index <= currentLevelIndex ? 'opacity-100' : 'opacity-40'
            )}
          >
            <div className={cn(
              'h-3 w-3 rounded-full',
              index <= currentLevelIndex ? levelColors[lvl] : 'bg-secondary'
            )} />
            <span className="text-xs text-muted-foreground">
              {levelLabels[lvl]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
