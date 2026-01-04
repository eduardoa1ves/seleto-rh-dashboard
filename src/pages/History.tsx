import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Filter, Download, Eye, Trash2, TrendingUp, Briefcase, Loader2 } from 'lucide-react';
import { CandidateAnalysis } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { AnalysisPanel } from '@/components/analysis/AnalysisPanel';

const seniorityLabels: Record<string, string> = {
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

export default function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [analyses, setAnalyses] = useState<CandidateAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<CandidateAnalysis | null>(null);
  const { toast } = useToast();

  const fetchAnalyses = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.get('/analyses');
      setAnalyses(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar histórico",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta análise?')) return;

    try {
      await api.delete(`/analyses/${id}`);
      setAnalyses(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Análise excluída",
        description: "O registro foi removido com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredAnalyses = analyses.filter(
    analysis =>
      analysis.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (analysis.target_role && analysis.target_role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-accent';
    if (score >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  if (selectedAnalysis) {
    return (
      <AnalysisPanel
        analysis={selectedAnalysis}
        onBack={() => setSelectedAnalysis(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Histórico de Análises</h1>
          <p className="mt-1 text-muted-foreground">
            {analyses.length} currículos analisados
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div> */}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredAnalyses.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
              <Briefcase className="mb-2 h-12 w-12 opacity-20" />
              <p>Nenhuma análise encontrada.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Candidato
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Cargo Pretendido
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Senioridade
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Data
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAnalyses.map((analysis, index) => (
                  <tr
                    key={analysis.id}
                    className="transition-colors hover:bg-secondary/20 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {analysis.candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{analysis.candidate.name}</p>
                          {analysis.candidate.email && (
                            <p className="text-xs text-muted-foreground">{analysis.candidate.email}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        {analysis.target_role || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                        {seniorityLabels[analysis.seniority_level] || analysis.seniority_level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn('flex items-center gap-1 font-semibold', getScoreColor(analysis.fit_score))}>
                        <TrendingUp className="h-4 w-4" />
                        {analysis.fit_score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {format(new Date(analysis.analyzed_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedAnalysis(analysis)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(analysis.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
