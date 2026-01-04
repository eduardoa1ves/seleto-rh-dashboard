import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Download, Share2 } from 'lucide-react';
import { useState } from 'react';
import { CandidateAnalysis } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ScoreCircle } from './ScoreCircle';
import { SkillsRadarChart } from './SkillsRadarChart';
import { SeniorityBar } from './SeniorityBar';
import { ExecutiveSummary } from './ExecutiveSummary';
import { DataExtraction } from './DataExtraction';
import { exportAnalysisToPDF } from '@/lib/pdfExport';
import { useToast } from '@/hooks/use-toast';

interface AnalysisPanelProps {
  analysis: CandidateAnalysis;
  onBack: () => void;
}

export function AnalysisPanel({ analysis, onBack }: AnalysisPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      await exportAnalysisToPDF(analysis);
      toast({
        title: 'PDF exportado com sucesso!',
        description: 'O arquivo foi baixado para seu computador.',
      });
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast({
        title: 'Erro ao exportar PDF',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <div className="animate-fade-in">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar ao Dashboard
      </Button>

      {/* Header */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {analysis.candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{analysis.candidate.name}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{analysis.target_role || 'N/A'}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {analysis.candidate.email && (
                  <a href={`mailto:${analysis.candidate.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {analysis.candidate.email}
                  </a>
                )}
                {analysis.candidate.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {analysis.candidate.phone}
                  </span>
                )}
                {analysis.candidate.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {analysis.candidate.location}
                  </span>
                )}
                {analysis.candidate.linkedin && (
                  <a href={`https://${analysis.candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ScoreCircle score={analysis.fit_score} size="lg" />
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
              >
                <Download className="mr-2 h-4 w-4" />
                {isExporting ? 'Gerando PDF...' : 'Exportar PDF'}
              </Button>
              {/* <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Charts */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Análise de Competências</h3>
        <SkillsRadarChart softSkills={analysis.soft_skills} hardSkills={analysis.hard_skills} />
      </div>

      {/* Seniority */}
      <div className="mb-8">
        <SeniorityBar level={analysis.seniority_level} score={analysis.seniority_score} />
      </div>

      {/* Executive Summary */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Parecer da IA</h3>
        <ExecutiveSummary summary={analysis.summary} />
      </div>

      {/* Data Extraction */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Dados Extraídos</h3>
        <DataExtraction
          experience={analysis.experience}
          education={analysis.education}
          languages={analysis.languages}
        />
      </div>
    </div>
  );
}
