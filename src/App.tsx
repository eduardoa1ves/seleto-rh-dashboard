import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Jobs from "./pages/Jobs";
import Settings from "./pages/Settings";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Credits from "./pages/Credits";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/creditos" element={<Credits />} />
          <Route path="/login" element={<Login />} />
          
          {/* App pages with sidebar */}
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/historico" element={<AppLayout><History /></AppLayout>} />
          <Route path="/vagas" element={<AppLayout><Jobs /></AppLayout>} />
          <Route path="/configuracoes" element={<AppLayout><Settings /></AppLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
