import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, User, Briefcase, TrendingUp } from 'lucide-react';
import { CandidateAnalysis } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RecentAnalysesProps {
  analyses: CandidateAnalysis[];
  onViewAnalysis: (id: string) => void;
}

function ScoreBadge({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-success/10 text-success border-success/20';
    if (score >= 70) return 'bg-accent/10 text-accent border-accent/20';
    if (score >= 50) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold',
      getScoreColor(score)
    )}>
      <TrendingUp className="h-3 w-3" />
      {score}%
    </span>
  );
}

function SeniorityBadge({ level }: { level: string }) {
  const labels: Record<string, string> = {
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

  return (
    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
      {labels[level] || level}
    </span>
  );
}

export function RecentAnalyses({ analyses, onViewAnalysis }: RecentAnalysesProps) {
  if (analyses.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Nenhuma análise realizada ainda.
        </p>
        <p className="mt-1 text-sm text-muted-foreground/70">
          Faça upload de um currículo para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <div className="border-b border-border bg-secondary/30 px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Análises Recentes</h2>
      </div>
      <div className="divide-y divide-border">
        {analyses.map((analysis, index) => (
          <div
            key={analysis.id}
            className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-secondary/20 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {analysis.candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{analysis.candidate.name}</h3>
                  <SeniorityBadge level={analysis.seniority_level} />
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    {analysis.target_role || 'N/A'}
                  </span>
                  <span className="text-border">•</span>
                  <span>
                    {format(new Date(analysis.analyzed_at), "d 'de' MMM, HH:mm", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ScoreBadge score={analysis.fit_score} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewAnalysis(analysis.id)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                Ver detalhes
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
