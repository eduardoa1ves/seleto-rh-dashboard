import { CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExecutiveSummaryProps {
  summary: {
    strengths: string[];
    attentionPoints: string[];
    executiveSummary: string;
  };
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Resumo Executivo</h4>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {summary.executiveSummary}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-xl border border-success/20 bg-success/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h4 className="text-sm font-semibold text-foreground">Pontos Fortes</h4>
          </div>
          <ul className="space-y-3">
            {summary.strengths.map((strength, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-sm text-foreground/80 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Attention Points */}
        <div className="rounded-xl border border-warning/20 bg-warning/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <h4 className="text-sm font-semibold text-foreground">Pontos de Atenção</h4>
          </div>
          <ul className="space-y-3">
            {summary.attentionPoints.map((point, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-sm text-foreground/80 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
