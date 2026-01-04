import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileDropzone } from '@/components/dashboard/FileDropzone';
import { RecentAnalyses } from '@/components/dashboard/RecentAnalyses';
import { AnalysisLoading } from '@/components/analysis/AnalysisLoading';
import { AnalysisPanel } from '@/components/analysis/AnalysisPanel';
import { mockCandidates, CandidateAnalysis } from '@/data/mockData';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

type ViewState = 'dashboard' | 'loading' | 'analysis';

export default function Dashboard() {
  const [viewState, setViewState] = useState<ViewState>('dashboard');
  const [analyses, setAnalyses] = useState<CandidateAnalysis[]>(mockCandidates);
  const [currentAnalysis, setCurrentAnalysis] = useState<CandidateAnalysis | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setViewState('loading');

      // Cria FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('resume', file);

      // Faz a chamada à API
      const response = await api.post('/analyses', formData, true);

      // Atualiza os créditos do usuário
      await refreshUser();

      // Converte a resposta do backend para o formato esperado pelo frontend
      const newAnalysis: CandidateAnalysis = {
        id: response.id.toString(),
        candidate: {
          id: response.candidate.id,
          name: response.candidate.name || 'Candidato',
          email: response.candidate.email,
          phone: response.candidate.phone,
          location: response.candidate.location,
          linkedin: response.candidate.linkedin,
        },
        analyzed_at: response.analyzed_at,
        fit_score: response.fit_score,
        soft_skills: response.soft_skills || {},
        hard_skills: response.hard_skills || {},
        seniority_level: response.seniority_level,
        seniority_score: response.seniority_score,
        summary: response.summary || {
          strengths: [],
          attentionPoints: [],
          executiveSummary: '',
        },
        experience: response.experience || [],
        education: response.education || [],
        languages: response.languages || [],
        status: response.status,
      };

      setCurrentAnalysis(newAnalysis);
      setAnalyses(prev => [newAnalysis, ...prev]);
      setViewState('analysis');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao analisar currículo. Por favor, tente novamente.');
      setViewState('dashboard');
    } finally {
      setIsUploading(false);
    }
  }, [refreshUser]);

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
        <FileDropzone onFileUpload={handleFileUpload} isUploading={isUploading} />
      </div>

      {/* Recent Analyses */}
      <div className="mt-12">
        <RecentAnalyses analyses={analyses} onViewAnalysis={handleViewAnalysis} />
      </div>
    </div>
  );
}
