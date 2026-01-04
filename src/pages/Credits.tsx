import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CreditCard, 
  Zap, 
  Check, 
  Shield,
  Clock,
  Star,
  AlertCircle,
  Calendar,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useSearchParams } from 'react-router-dom';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

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
    price: 47,
    features: [
      '20 análises por mês',
      'Análise de soft e hard skills',
      'Score de senioridade',
      'Histórico completo',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: 100,
    price: 197,
    popular: true,
    features: [
      '100 análises por mês',
      'Todos os recursos do Starter',
      'Suporte por email',
      'Créditos nunca expiram'
    ],
  },
  {
    id: 'business',
    name: 'Business',
    credits: '',
    price: 'Sob consulta',
    features: [
      'Créditos ilimitados',
      'Todos os recursos do Pro',
      'Suporte prioritário',
      'Relatórios avançados'
    ],
  },
];

type Tab = 'credits' | 'subscription';

export default function Credits() {
  const [activeTab, setActiveTab] = useState<Tab>('subscription');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();

  // Handle payment callback
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    
    if (paymentStatus === 'success') {
      toast({
        title: "Pagamento aprovado!",
        description: "Seus créditos foram adicionados com sucesso.",
      });
      refreshUser();
      // Clear URL params
      window.history.replaceState({}, '', '/creditos');
    } else if (paymentStatus === 'failure') {
      toast({
        title: "Pagamento não aprovado",
        description: "Houve um problema com o pagamento. Tente novamente.",
        variant: "destructive",
      });
      window.history.replaceState({}, '', '/creditos');
    } else if (paymentStatus === 'pending') {
      toast({
        title: "Pagamento pendente",
        description: "Aguardando confirmação do pagamento.",
      });
      window.history.replaceState({}, '', '/creditos');
    }
  }, [searchParams, toast, refreshUser]);

  const handlePurchase = async (type: 'subscription' | 'credits', id: string) => {
    setIsProcessing(true);

    try {
      const response = await api.post('/payments/create_preference', {
        type,
        plan_id: type === 'subscription' ? id : undefined,
        package_id: type === 'credits' ? id : undefined,
      });

      // Redirect to Mercado Pago checkout
      window.location.href = response.init_point;
    } catch (error: any) {
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate subscription expiry info
  const getSubscriptionInfo = () => {
    if (!user?.subscription_expires_at) return null;

    const expiryDate = new Date(user.subscription_expires_at);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = daysUntilExpiry < 0;
    const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;

    return {
      expiryDate,
      daysUntilExpiry: Math.abs(daysUntilExpiry),
      isExpired,
      isExpiringSoon,
      isActive: user.subscription_status === 'active' && !isExpired
    };
  };

  const subscriptionInfo = getSubscriptionInfo();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Gerenciar Créditos</h1>
        <p className="mt-1 text-muted-foreground">
          Adicione créditos ou gerencie sua assinatura
        </p>
      </div>

      {/* Subscription Status Alerts */}
      {subscriptionInfo && subscriptionInfo.isExpired && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Assinatura Expirada</AlertTitle>
          <AlertDescription>
            Sua assinatura expirou há {subscriptionInfo.daysUntilExpiry} {subscriptionInfo.daysUntilExpiry === 1 ? 'dia' : 'dias'}. 
            Renove agora para continuar recebendo créditos mensais.
          </AlertDescription>
        </Alert>
      )}

      {subscriptionInfo && subscriptionInfo.isExpiringSoon && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertTitle>Assinatura Expirando</AlertTitle>
          <AlertDescription>
            Sua assinatura vence em {subscriptionInfo.daysUntilExpiry} {subscriptionInfo.daysUntilExpiry === 1 ? 'dia' : 'dias'} 
            ({subscriptionInfo.expiryDate.toLocaleDateString('pt-BR')}). Renove para não perder acesso aos benefícios.
          </AlertDescription>
        </Alert>
      )}

      {subscriptionInfo && subscriptionInfo.isActive && !subscriptionInfo.isExpiringSoon && (
        <Alert className="border-success/50 bg-success/5">
          <CheckCircle2 className="h-4 w-4 text-success" />
          <AlertTitle className="text-success">Assinatura Ativa</AlertTitle>
          <AlertDescription>
            Seu plano <strong>{user?.subscription_plan?.toUpperCase()}</strong> está ativo até{' '}
            {subscriptionInfo.expiryDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}. 
            Você ainda tem {subscriptionInfo.daysUntilExpiry} dias de acesso.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Credits Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Saldo Atual de Créditos</p>
            <p className="mt-1 text-4xl font-bold text-foreground">{user?.credits ?? 0}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Cada crédito = 1 análise de currículo completa
            </p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CreditCard className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Escolha seu Plano
          </h2>
          <p className="text-muted-foreground">
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
                      <span className="text-4xl font-bold text-foreground">{plan.id != "business" ? `R$ ${plan.price}` : 'Sob consulta'}</span>
                      {plan.id != "business" && <span className="text-muted-foreground">/mês</span>}
                    </div>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {plan.id != "business" ? `${plan.credits} análises incluídas por mês` : 'Créditos ilimitados'}
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
                        handlePurchase('subscription', plan.id);
                      }}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Processando...
                        </>
                      ) : (
                        selectedPlan === plan.id ? 'Assinar Agora' : 'Selecionar'
                      )}
                    </Button>
                  </div>
                ))}
              </div>

{/*               <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-6 text-center">
                <h3 className="mb-2 font-semibold text-foreground">Precisa de mais?</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Para volumes maiores ou necessidades específicas, entre em contato com nossa equipe comercial.
                </p>
                <Button variant="outline">Falar com Vendas</Button>
              </div> */}
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
                  <Button 
                    size="lg" 
                    onClick={() => handlePurchase('credits', selectedPackage)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Comprar {creditPackages.find(p => p.id === selectedPackage)?.credits} Créditos
                      </>
                    )}
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
  );
}