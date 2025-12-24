import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  FileSearch, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: FileSearch,
    title: 'Análise Inteligente',
    description: 'Nossa IA extrai automaticamente informações de currículos em PDF ou imagem com alta precisão.',
  },
  {
    icon: BarChart3,
    title: 'Score de Compatibilidade',
    description: 'Avalie candidatos com scores objetivos baseados em soft skills, hard skills e senioridade.',
  },
  {
    icon: Zap,
    title: 'Resultados em Segundos',
    description: 'Análise completa em menos de 30 segundos. Economize horas do seu time de RH.',
  },
  {
    icon: Shield,
    title: 'LGPD Compliant',
    description: 'Seus dados e dos candidatos protegidos com criptografia e conformidade total com a LGPD.',
  },
];

const stats = [
  { value: '50K+', label: 'Currículos Analisados' },
  { value: '98%', label: 'Precisão na Extração' },
  { value: '500+', label: 'Empresas Confiam' },
  { value: '30s', label: 'Tempo Médio de Análise' },
];

const testimonials = [
  {
    name: 'Carla Mendes',
    role: 'Head de RH, TechCorp',
    content: 'O Seleto AI reduziu nosso tempo de triagem em 70%. A precisão dos scores nos ajuda a tomar decisões mais assertivas.',
    avatar: 'CM',
  },
  {
    name: 'Roberto Silva',
    role: 'Diretor de Pessoas, Innovare',
    content: 'Ferramenta indispensável para quem recruta em volume. A análise de soft skills é surpreendentemente precisa.',
    avatar: 'RS',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para pequenas empresas',
    features: ['20 análises/mês', 'Relatórios básicos', 'Suporte por email', '1 usuário'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 297',
    period: '/mês',
    description: 'Para times de RH',
    features: ['100 análises/mês', 'Relatórios avançados', 'Suporte prioritário', '5 usuários', 'API de integração'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    description: 'Para grandes operações',
    features: ['Análises ilimitadas', 'Relatórios customizados', 'Suporte dedicado', 'Usuários ilimitados', 'API + Webhooks', 'SLA garantido'],
    highlighted: false,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Seleto AI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preços</a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/cadastro">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
              <Sparkles className="h-4 w-4" />
              Powered by AI
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Recrutamento Inteligente com{' '}
              <span className="text-primary">Análise de IA</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
              Transforme a triagem de currículos. Nossa IA analisa competências, gera scores de compatibilidade e entrega insights acionáveis em segundos.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link to="/cadastro">
                  Testar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/creditos">Ver Planos</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              5 análises grátis • Sem cartão de crédito
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Tudo que seu RH precisa
            </h2>
            <p className="text-lg text-muted-foreground">
              Ferramentas poderosas para tornar seu processo de recrutamento mais eficiente e assertivo.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Como funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Em apenas 3 passos, tenha uma análise completa do candidato.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Upload', description: 'Faça upload do currículo em PDF ou imagem' },
              { step: '2', title: 'Análise', description: 'Nossa IA processa e extrai todas as informações' },
              { step: '3', title: 'Resultado', description: 'Receba scores, insights e recomendações' },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Planos e Preços
            </h2>
            <p className="text-lg text-muted-foreground">
              Escolha o plano ideal para o tamanho da sua operação.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.highlighted 
                    ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                    : 'border-border bg-card shadow-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    <Star className="h-3 w-3" /> Mais Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link to="/cadastro">
                    {plan.name === 'Enterprise' ? 'Falar com Vendas' : 'Começar Agora'}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-secondary/30 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.name}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mb-6 text-foreground">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center lg:p-12">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
              Pronto para transformar seu RH?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Comece gratuitamente e descubra como a IA pode otimizar seus processos de recrutamento.
            </p>
            <Button size="xl" variant="secondary" asChild>
              <Link to="/cadastro">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Seleto AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Seleto AI. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
