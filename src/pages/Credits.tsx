import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  CreditCard, 
  Zap, 
  Check, 
  ArrowLeft,
  Shield,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const creditPackages = [
  {
    id: 'pack-10',
    credits: 10,
    price: 49,
    pricePerCredit: 4.90,
    popular: false,
  },
  {
    id: 'pack-25',
    credits: 25,
    price: 99,
    pricePerCredit: 3.96,
    popular: false,
    discount: '19%',
  },
  {
    id: 'pack-50',
    credits: 50,
    price: 179,
    pricePerCredit: 3.58,
    popular: true,
    discount: '27%',
  },
  {
    id: 'pack-100',
    credits: 100,
    price: 299,
    pricePerCredit: 2.99,
    popular: false,
    discount: '39%',
  },
];

const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    credits: 20,
    price: 97,
    features: [
      '20 análises por mês',
      'Relatórios básicos',
      'Suporte por email',
      '1 usuário',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 100,
    price: 297,
    popular: true,
    features: [
      '100 análises por mês',
      'Relatórios avançados',
      'Suporte prioritário',
      '5 usuários',
      'API de integração',
      'Exportação em PDF',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    credits: 300,
    price: 697,
    features: [
      '300 análises por mês',
      'Relatórios customizados',
      'Suporte dedicado',
      '15 usuários',
      'API + Webhooks',
      'Treinamento incluso',
    ],
  },
];

type Tab = 'credits' | 'subscription';

export default function Credits() {
  const [activeTab, setActiveTab] = useState<Tab>('subscription');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será redirecionado para o checkout seguro.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/landing" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Seleto AI</span>
          </Link>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao App
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Escolha seu Plano
            </h1>
            <p className="text-lg text-muted-foreground">
              Créditos avulsos ou assinatura mensal - você decide
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg border border-border bg-secondary/30 p-1">
              <button
                onClick={() => setActiveTab('subscription')}
                className={cn(
                  'rounded-md px-6 py-2.5 text-sm font-medium transition-all',
                  activeTab === 'subscription'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Clock className="mr-2 inline-block h-4 w-4" />
                Assinatura Mensal
              </button>
              <button
                onClick={() => setActiveTab('credits')}
                className={cn(
                  'rounded-md px-6 py-2.5 text-sm font-medium transition-all',
                  activeTab === 'credits'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Zap className="mr-2 inline-block h-4 w-4" />
                Créditos Avulsos
              </button>
            </div>
          </div>

          {/* Subscription Plans */}
          {activeTab === 'subscription' && (
            <div className="animate-fade-in">
              <div className="grid gap-6 md:grid-cols-3">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={cn(
                      'cursor-pointer rounded-xl border p-6 transition-all',
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                        : 'border-border bg-card shadow-card hover:border-primary/50'
                    )}
                  >
                    {plan.popular && (
                      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        <Star className="h-3 w-3" /> Mais Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <div className="my-4">
                      <span className="text-4xl font-bold text-foreground">R$ {plan.price}</span>
                      <span className="text-muted-foreground">/mês</span>
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {plan.credits} análises incluídas por mês
                    </p>
                    <ul className="mb-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="h-4 w-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={selectedPlan === plan.id ? 'default' : 'outline'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase();
                      }}
                    >
                      {selectedPlan === plan.id ? 'Assinar Agora' : 'Selecionar'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-6 text-center">
                <h3 className="mb-2 font-semibold text-foreground">Precisa de mais?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Para volumes maiores ou necessidades específicas, entre em contato com nossa equipe comercial.
                </p>
                <Button variant="outline">Falar com Vendas</Button>
              </div>
            </div>
          )}

          {/* Credit Packages */}
          {activeTab === 'credits' && (
            <div className="animate-fade-in">
              <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <Zap className="mr-1 inline-block h-4 w-4 text-accent" />
                  Créditos avulsos <strong>não expiram</strong> e podem ser usados a qualquer momento
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {creditPackages.map((pack) => (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPackage(pack.id)}
                    className={cn(
                      'cursor-pointer rounded-xl border p-6 text-center transition-all',
                      selectedPackage === pack.id
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                        : 'border-border bg-card shadow-card hover:border-primary/50',
                      pack.popular && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    )}
                  >
                    {pack.popular && (
                      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        <Star className="h-3 w-3" /> Melhor Custo
                      </div>
                    )}
                    {pack.discount && !pack.popular && (
                      <div className="mb-4 inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                        -{pack.discount}
                      </div>
                    )}
                    <div className="mb-2 text-4xl font-bold text-primary">{pack.credits}</div>
                    <div className="mb-4 text-sm text-muted-foreground">créditos</div>
                    <div className="mb-1 text-2xl font-bold text-foreground">
                      R$ {pack.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      R$ {pack.pricePerCredit.toFixed(2)} por análise
                    </div>
                  </div>
                ))}
              </div>

              {selectedPackage && (
                <div className="mt-8 flex justify-center">
                  <Button size="lg" onClick={handlePurchase}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Comprar {creditPackages.find(p => p.id === selectedPackage)?.credits} Créditos
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5" />
              Pagamento Seguro
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-5 w-5" />
              Cartão, PIX ou Boleto
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5" />
              Cancele quando quiser
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
