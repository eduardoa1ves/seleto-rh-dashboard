import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Building, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

type AccountType = 'individual' | 'company';

interface FormData {
  accountType: AccountType;
  // Common fields
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  // Individual fields
  cpf: string;
  // Company fields
  companyName: string;
  cnpj: string;
  industry: string;
  employees: string;
  responsibleName: string;
  // Address
  city: string;
  state: string;
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    accountType: 'individual',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    cpf: '',
    companyName: '',
    cnpj: '',
    industry: '',
    employees: '',
    responsibleName: '',
    city: '',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setFormData(prev => ({ ...prev, cpf: formatted }));
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData(prev => ({ ...prev, cnpj: formatted }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        name: formData.accountType === 'company' ? formData.companyName : formData.name,
      };

      const response = await api.post('/auth/register', payload);

      api.setToken(response.token);
      
      // Refresh user data to get credits and other info
      await refreshUser();
      
      setIsSuccess(true);

      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo ao Seleto AI.",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center animate-fade-in">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Cadastro Realizado com Sucesso!
          </h1>
          <p className="mb-6 text-muted-foreground">
            Você será redirecionado para o dashboard em alguns segundos...
          </p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Ir para o Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center animate-fade-in">
          <Link to="/" className="mx-auto mb-6 flex w-fit items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-bold">Seleto AI</span>
          </Link>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Criar Conta</h1>
          <p className="text-muted-foreground">Comece a otimizar seu processo de seleção com inteligência artificial</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-8 shadow-card animate-slide-up">
          {/* Account Type Selection */}
{/*           <div className="mb-8">
            <Label className="mb-4 block text-base">Tipo de Conta</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'individual' }))}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all hover:border-primary/50",
                  formData.accountType === 'individual'
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <User className={cn(
                  "h-8 w-8",
                  formData.accountType === 'individual' ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="text-center">
                  <p className="font-semibold text-foreground">Pessoa Física</p>
                  <p className="text-sm text-muted-foreground">Para profissionais autônomos</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'company' }))}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all hover:border-primary/50",
                  formData.accountType === 'company'
                    ? "border-primary bg-primary/5"
                    : "border-border"
                )}
              >
                <Building className={cn(
                  "h-8 w-8",
                  formData.accountType === 'company' ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="text-center">
                  <p className="font-semibold text-foreground">Pessoa Jurídica</p>
                  <p className="text-sm text-muted-foreground">Para empresas e organizações</p>
                </div>
              </button>
            </div>
          </div>
 */}
          {/* Individual Fields */}
          {formData.accountType === 'individual' && (
            <div className="space-y-6 mb-8">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Dados Pessoais
                </h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Digite seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  required
                  maxLength={14}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone/WhatsApp</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    required
                    maxLength={15}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="São Paulo"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Company Fields */}
          {formData.accountType === 'company' && (
            <div className="space-y-6 mb-8">
              <div className="pb-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Dados da Empresa
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="companyName">Razão Social</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Digite a razão social"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={handleCNPJChange}
                    required
                    maxLength={18}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Segmento de Atuação</Label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="comercio">Comércio</option>
                    <option value="servicos">Serviços</option>
                    <option value="industria">Indústria</option>
                    <option value="saude">Saúde</option>
                    <option value="educacao">Educação</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 sm:col-span-2">
                  <div className="space-y-2">
                    <Label htmlFor="employees">Número de Funcionários</Label>
                    <select
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="São Paulo"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Responsável pela Conta
                </h3>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="responsibleName">Nome Completo</Label>
                    <Input
                      id="responsibleName"
                      name="responsibleName"
                      placeholder="Nome do responsável"
                      value={formData.responsibleName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Common Access Fields */}
          <div className="space-y-6 mb-8">
            <div className="pb-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Dados de Acesso
              </h2>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Fazer login
              </Link>
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Termos de Uso
          </Link>{' '}
          {/* e{' '}
          <Link to="/privacy" className="text-primary hover:underline">
            Política de Privacidade
          </Link> */}
        </p>
      </div>
    </div>
  );
}
