import { User, Building, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const settingsSections = [
  { id: 'profile', icon: User, label: 'Perfil' },
  { id: 'company', icon: Building, label: 'Empresa' },
  { id: 'notifications', icon: Bell, label: 'Notificações' },
  { id: 'security', icon: Shield, label: 'Segurança' },
  { id: 'help', icon: HelpCircle, label: 'Ajuda' },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

          {/* Security & Logout Section */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="mb-6 text-lg font-semibold text-foreground">Segurança e Sessão</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-foreground">Senha</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Altere sua senha regularmente para manter sua conta segura
                </p>
                <Button variant="outline">Alterar Senha</Button>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="mb-2 font-medium text-foreground">Encerrar Sessão</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Saia da sua conta em todos os dispositivos
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você será desconectado da sua conta e redirecionado para a página de login.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Sair
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
