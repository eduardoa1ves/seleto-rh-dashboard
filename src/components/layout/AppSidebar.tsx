import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { FileSearch, History, Briefcase, Settings, Sparkles, CreditCard, Plus, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { to: '/dashboard', icon: FileSearch, label: 'Analisar' },
  { to: '/historico', icon: History, label: 'Histórico' },
  // { to: '/vagas', icon: Briefcase, label: 'Vagas' },
  { to: '/creditos', icon: CreditCard, label: 'Créditos' },
/*   { to: '/configuracoes', icon: Settings, label: 'Configurações' },
 */];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">Seleto AI</h1>
            <p className="text-xs text-sidebar-foreground/60">Recrutamento Inteligente</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
              (item.to !== '/' && location.pathname.startsWith(item.to));
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive && 'text-sidebar-primary')} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="border-t border-sidebar-border">
          {/* User Info */}
          <div className="border-b border-sidebar-border p-3">
            <div onClick={handleLogout} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-200">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </div>
          </div>

          {/* Credits Card */}
          <div className="p-4">
            <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-sidebar-foreground">Créditos Disponíveis</p>
                  <p className="mt-1 text-2xl font-bold text-sidebar-foreground">
                    {user?.credits ?? 0}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary/10">
                  <CreditCard className="h-5 w-5 text-sidebar-primary" />
                </div>
              </div>
              <Button 
                asChild 
                size="sm" 
                className="w-full"
                variant="default"
              >
                <Link to="/creditos">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Créditos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
