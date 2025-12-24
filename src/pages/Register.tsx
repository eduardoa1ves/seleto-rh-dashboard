import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Building, User, Mail, Phone, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  companyName: string;
  cnpj: string;
  industry: string;
  employees: string;
  responsibleName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    cnpj: '',
    industry: '',
    employees: '',
    responsibleName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: "Cadastro enviado!",
      description: "Analisaremos seu cadastro em até 24 horas.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Cadastro Enviado com Sucesso!
          </h1>
          <p className="mb-6 text-muted-foreground">
            Recebemos sua solicitação de cadastro. Nossa equipe irá analisar as informações e você receberá um e-mail de confirmação em até <strong>24 horas úteis</strong>.
          </p>
          <div className="rounded-xl border border-border bg-card p-6 text-left shadow-card">
            <h3 className="mb-4 font-semibold text-foreground">Próximos passos:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">1</span>
                Nossa equipe validará os dados da empresa
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">2</span>
                Você receberá um e-mail com o link de ativação
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">3</span>
                Crie sua senha e comece a usar com 5 análises grátis
              </li>
            </ul>
          </div>
          <Button variant="outline" className="mt-6" asChild>
            <Link to="/landing">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Início
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link to="/landing" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Seleto AI</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Cadastre sua Empresa</h1>
            <p className="text-muted-foreground">
              Preencha os dados abaixo para solicitar acesso ao Seleto AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Dados da Empresa</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="companyName">Razão Social *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Segmento *</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Ex: Tecnologia, Varejo..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Número de Funcionários *</Label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="São Paulo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="SP"
                    maxLength={2}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Responsible */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Responsável</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="responsibleName">Nome Completo *</Label>
                  <Input
                    id="responsibleName"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Corporativo *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@empresa.com.br"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm text-muted-foreground">
                Ao enviar este formulário, você concorda com nossos{' '}
                <a href="#" className="text-primary hover:underline">Termos de Uso</a> e{' '}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
                Suas informações serão analisadas por nossa equipe e você receberá um e-mail de confirmação em até 24 horas úteis.
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <Button variant="outline" asChild>
                <Link to="/landing">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Link>
              </Button>
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
