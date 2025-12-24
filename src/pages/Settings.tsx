import { User, Building, Bell, Shield, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const settingsSections = [
  { id: 'profile', icon: User, label: 'Perfil' },
  { id: 'company', icon: Building, label: 'Empresa' },
  { id: 'notifications', icon: Bell, label: 'Notificações' },
  { id: 'security', icon: Shield, label: 'Segurança' },
  { id: 'billing', icon: CreditCard, label: 'Faturamento' },
  { id: 'help', icon: HelpCircle, label: 'Ajuda' },
];

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie sua conta e preferências
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <section.icon className="h-5 w-5" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Section */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 text-lg font-semibold text-foreground">Informações do Perfil</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" defaultValue="Ana Carolina Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" defaultValue="ana.silva@empresa.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" defaultValue="Gerente de RH" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" defaultValue="(11) 99999-9999" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Salvar Alterações</Button>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 text-lg font-semibold text-foreground">Preferências de Notificação</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Análises concluídas</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificação quando uma análise for finalizada</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Relatórios semanais</p>
                  <p className="text-sm text-muted-foreground">Receba um resumo semanal das suas análises</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Novos candidatos</p>
                  <p className="text-sm text-muted-foreground">Notificações sobre novos candidatos para suas vagas</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Plan Section */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Plano Pro</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  50 análises por mês • Relatórios avançados • Suporte prioritário
                </p>
              </div>
              <Button variant="outline">Gerenciar Plano</Button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">47 análises restantes</span>
                <span className="font-medium text-foreground">94%</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                <div className="h-full w-[94%] rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
