import { useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';
import { loadingSteps } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AnalysisLoadingProps {
  onComplete: () => void;
}

export function AnalysisLoading({ onComplete }: AnalysisLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep >= loadingSteps.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    }, loadingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progress = ((currentStep) / loadingSteps.length) * 100;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
        <Loader2 className="h-10 w-10 text-accent animate-spin" />
      </div>
      
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        Analisando Currículo
      </h2>
      <p className="mb-8 text-muted-foreground">
        Nossa IA está extraindo informações importantes...
      </p>

      {/* Progress bar */}
      <div className="mb-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-secondary">
        <div 
          className="h-full bg-gradient-success transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {loadingSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          
          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-300',
                isCompleted && 'bg-success/5',
                isCurrent && 'bg-secondary'
              )}
            >
              <div className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300',
                isCompleted ? 'bg-success' : isCurrent ? 'bg-accent/20' : 'bg-secondary'
              )}>
                {isCompleted ? (
                  <Check className="h-3.5 w-3.5 text-success-foreground" />
                ) : isCurrent ? (
                  <Loader2 className="h-3.5 w-3.5 text-accent animate-spin" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                )}
              </div>
              <span className={cn(
                'text-sm transition-colors duration-300',
                isCompleted ? 'text-success font-medium' : 
                isCurrent ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
