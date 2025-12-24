import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Download, Share2 } from 'lucide-react';
import { CandidateAnalysis } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ScoreCircle } from './ScoreCircle';
import { SkillsRadarChart } from './SkillsRadarChart';
import { SeniorityBar } from './SeniorityBar';
import { ExecutiveSummary } from './ExecutiveSummary';
import { DataExtraction } from './DataExtraction';

interface AnalysisPanelProps {
  analysis: CandidateAnalysis;
  onBack: () => void;
}

export function AnalysisPanel({ analysis, onBack }: AnalysisPanelProps) {
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
              {analysis.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{analysis.name}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{analysis.targetRole}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {analysis.email && (
                  <a href={`mailto:${analysis.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {analysis.email}
                  </a>
                )}
                {analysis.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    {analysis.phone}
                  </span>
                )}
                {analysis.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {analysis.location}
                  </span>
                )}
                {analysis.linkedin && (
                  <a href={`https://${analysis.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <ScoreCircle score={analysis.fitScore} size="lg" />
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Charts */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Análise de Competências</h3>
        <SkillsRadarChart softSkills={analysis.softSkills} hardSkills={analysis.hardSkills} />
      </div>

      {/* Seniority */}
      <div className="mb-8">
        <SeniorityBar level={analysis.seniorityLevel} score={analysis.seniorityScore} />
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
