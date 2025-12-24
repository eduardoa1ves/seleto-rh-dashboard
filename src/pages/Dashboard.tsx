import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDropzone } from '@/components/dashboard/FileDropzone';
import { RecentAnalyses } from '@/components/dashboard/RecentAnalyses';
import { AnalysisLoading } from '@/components/analysis/AnalysisLoading';
import { AnalysisPanel } from '@/components/analysis/AnalysisPanel';
import { mockCandidates, CandidateAnalysis } from '@/data/mockData';

type ViewState = 'dashboard' | 'loading' | 'analysis';

export default function Dashboard() {
  const [viewState, setViewState] = useState<ViewState>('dashboard');
  const [analyses, setAnalyses] = useState<CandidateAnalysis[]>(mockCandidates);
  const [currentAnalysis, setCurrentAnalysis] = useState<CandidateAnalysis | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = useCallback((file: File) => {
    setViewState('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    // Simulate creating a new analysis with the first mock data
    const newAnalysis: CandidateAnalysis = {
      ...mockCandidates[0],
      id: Date.now().toString(),
      analyzedAt: new Date().toISOString(),
    };
    
    setCurrentAnalysis(newAnalysis);
    setAnalyses(prev => [newAnalysis, ...prev]);
    setViewState('analysis');
  }, []);

  const handleViewAnalysis = useCallback((id: string) => {
    const analysis = analyses.find(a => a.id === id);
    if (analysis) {
      setCurrentAnalysis(analysis);
      setViewState('analysis');
    }
  }, [analyses]);

  const handleBackToDashboard = useCallback(() => {
    setCurrentAnalysis(null);
    setViewState('dashboard');
  }, []);

  if (viewState === 'loading') {
    return (
      <div className="mx-auto max-w-2xl">
        <AnalysisLoading onComplete={handleLoadingComplete} />
      </div>
    );
  }

  if (viewState === 'analysis' && currentAnalysis) {
    return (
      <AnalysisPanel analysis={currentAnalysis} onBack={handleBackToDashboard} />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analisar Currículo</h1>
        <p className="mt-1 text-muted-foreground">
          Faça upload de um currículo para análise inteligente com IA
        </p>
      </div>

      {/* Dropzone */}
      <div className="mx-auto max-w-2xl">
        <FileDropzone onFileUpload={handleFileUpload} />
      </div>

      {/* Recent Analyses */}
      <div className="mt-12">
        <RecentAnalyses analyses={analyses} onViewAnalysis={handleViewAnalysis} />
      </div>
    </div>
  );
}
