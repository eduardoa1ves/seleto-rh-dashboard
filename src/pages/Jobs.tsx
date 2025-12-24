import { Plus, Briefcase, Users, Clock, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const mockJobs = [
  {
    id: '1',
    title: 'Gerente de Projetos',
    department: 'Tecnologia',
    location: 'São Paulo, SP',
    type: 'CLT',
    candidates: 12,
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'Analista de Dados Sênior',
    department: 'Business Intelligence',
    location: 'Remoto',
    type: 'CLT',
    candidates: 8,
    status: 'active',
    createdAt: '2024-01-08',
  },
  {
    id: '3',
    title: 'UX Designer Pleno',
    department: 'Design',
    location: 'Rio de Janeiro, RJ',
    type: 'CLT',
    candidates: 5,
    status: 'paused',
    createdAt: '2024-01-05',
  },
];

export default function Jobs() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vagas</h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie suas vagas e acompanhe os candidatos
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Vaga
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Vagas Ativas</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">25</p>
              <p className="text-sm text-muted-foreground">Candidatos</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
              <Clock className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4.2 dias</p>
              <p className="text-sm text-muted-foreground">Tempo Médio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {mockJobs.map((job, index) => (
          <div 
            key={job.id}
            className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <span className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      job.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {job.status === 'active' ? 'Ativa' : 'Pausada'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {job.department} • {job.location} • {job.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{job.candidates}</p>
                  <p className="text-xs text-muted-foreground">candidatos</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Candidatos
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
