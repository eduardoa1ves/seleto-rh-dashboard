import { Briefcase, GraduationCap, Languages, Calendar, Building } from 'lucide-react';
import { CandidateAnalysis } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DataExtractionProps {
  experience: CandidateAnalysis['experience'];
  education: CandidateAnalysis['education'];
  languages: CandidateAnalysis['languages'];
}

const levelColors: Record<string, string> = {
  básico: 'bg-muted text-muted-foreground',
  intermediário: 'bg-primary/10 text-primary',
  avançado: 'bg-accent/10 text-accent',
  fluente: 'bg-success/10 text-success',
  nativo: 'bg-success text-success-foreground',
};

export function DataExtraction({ experience, education, languages }: DataExtractionProps) {
  return (
    <div className="space-y-6">
      {/* Experience */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="mb-6 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Experiência Profissional</h4>
        </div>
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div 
              key={index} 
              className="relative border-l-2 border-primary/20 pl-6 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="mb-1 flex items-center gap-2">
                <h5 className="font-medium text-foreground">{exp.role}</h5>
              </div>
              <div className="mb-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.period}
                </span>
              </div>
              {exp.highlights.length > 0 && (
                <ul className="space-y-1">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Formação Acadêmica</h4>
          </div>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="rounded-lg bg-secondary/30 p-4 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h5 className="font-medium text-foreground">
                  {edu.degree} em {edu.field}
                </h5>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{edu.institution}</span>
                  <span className="text-border">•</span>
                  <span>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Idiomas</h4>
          </div>
          <div className="space-y-3">
            {languages.map((lang, index) => (
              <div 
                key={index}
                className="flex items-center justify-between animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium text-foreground">{lang.language}</span>
                <span className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium capitalize',
                  levelColors[lang.level]
                )}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
