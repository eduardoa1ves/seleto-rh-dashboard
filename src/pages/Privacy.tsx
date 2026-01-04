import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Seleto AI</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Política de Privacidade</h1>
                <p className="text-muted-foreground">
                  Última atualização: {new Date().toLocaleDateString('pt-BR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <p className="text-lg text-foreground/80">
              A Seleto AI está comprometida com a proteção da sua privacidade e dos seus dados pessoais. 
              Esta Política descreve como coletamos, usamos, armazenamos e protegemos suas informações.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <Lock className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Criptografia</p>
                <p className="text-xs text-muted-foreground">Dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Conformidade LGPD</p>
                <p className="text-xs text-muted-foreground">Lei 13.709/2018</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <UserCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Seus Direitos</p>
                <p className="text-xs text-muted-foreground">Controle total</p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Informações que Coletamos</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">1.1. Dados Fornecidos por Você</h3>
                <p className="text-foreground/80 mb-4">
                  <strong>Durante o Cadastro:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Pessoa Física:</strong> Nome completo, CPF, e-mail, telefone, cidade</li>
                  <li><strong>Pessoa Jurídica:</strong> Razão social, CNPJ, segmento, número de funcionários, dados do responsável (nome, e-mail, telefone)</li>
                  <li><strong>Credenciais:</strong> Senha criptografada para acesso à conta</li>
                </ul>

                <p className="text-foreground/80 mb-4">
                  <strong>Durante o Uso da Plataforma:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Currículos:</strong> Arquivos PDF enviados para análise contendo dados de candidatos</li>
                  <li><strong>Informações de Vagas:</strong> Descrições de cargos e requisitos (quando aplicável)</li>
                  <li><strong>Histórico de Análises:</strong> Registro de currículos analisados e relatórios gerados</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">1.2. Dados Coletados Automaticamente</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, sistema operacional, dispositivo</li>
                  <li><strong>Dados de Uso:</strong> Páginas visitadas, tempo de sessão, funcionalidades utilizadas</li>
                  <li><strong>Cookies:</strong> Pequenos arquivos para manter sessão e preferências (veja seção 6)</li>
                  <li><strong>Logs de Sistema:</strong> Registros de acesso, erros e ações na plataforma</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">1.3. Dados de Pagamento</h3>
                <p className="text-foreground/80">
                  Informações de pagamento (número de cartão, dados bancários) são processadas por gateways de terceiros certificados PCI-DSS. Armazenamos apenas dados não sensíveis como últimos 4 dígitos do cartão e histórico de transações.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Como Usamos Seus Dados</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.1. Finalidades Principais</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Prestação de Serviços:</strong> Processar análises de currículos, gerar relatórios, manter histórico</li>
                  <li><strong>Gestão de Conta:</strong> Autenticação, gerenciamento de créditos, comunicação com usuário</li>
                  <li><strong>Processamento de IA:</strong> Enviar dados de currículos para análise pela Google Gemini AI</li>
                  <li><strong>Cobrança:</strong> Processar pagamentos, emitir notas fiscais, gerenciar assinaturas</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.2. Melhoria e Desenvolvimento</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Aprimorar algoritmos de análise e precisão da IA</li>
                  <li>Desenvolver novas funcionalidades</li>
                  <li>Realizar análises estatísticas agregadas e anônimas</li>
                  <li>Detectar e prevenir fraudes e uso indevido</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">2.3. Comunicação</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Enviar notificações sobre análises concluídas</li>
                  <li>Comunicar atualizações importantes da plataforma</li>
                  <li>Responder solicitações de suporte</li>
                  <li>Enviar comunicações de marketing (com opt-out disponível)</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Compartilhamento de Dados</h2>
                
                <p className="text-foreground/80 mb-4">
                  <strong>Não vendemos seus dados pessoais.</strong> Compartilhamos informações apenas nas seguintes situações:
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1. Prestadores de Serviços</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Google Cloud / Gemini AI:</strong> Processamento de análises de currículos</li>
                  <li><strong>Gateways de Pagamento:</strong> Stripe, Mercado Pago ou similar para processar transações</li>
                  <li><strong>Serviços de Email:</strong> SendGrid, Postmark ou similar para comunicações</li>
                  <li><strong>Hospedagem:</strong> AWS, Google Cloud ou similar para infraestrutura</li>
                  <li><strong>Analytics:</strong> Google Analytics (dados anonimizados) para métricas de uso</li>
                </ul>
                <p className="text-foreground/80 mb-4 italic">
                  Todos os fornecedores são contratualmente obrigados a proteger seus dados e usá-los apenas para finalidades específicas.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.2. Exigências Legais</h3>
                <p className="text-foreground/80 mb-4">
                  Podemos divulgar dados quando exigido por:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Ordem judicial ou intimação legal</li>
                  <li>Requisição de autoridades governamentais</li>
                  <li>Proteção de direitos, propriedade ou segurança</li>
                  <li>Investigação de fraudes ou violações dos Termos</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Armazenamento e Segurança</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1. Localização dos Dados</h3>
                <p className="text-foreground/80 mb-4">
                  Seus dados são armazenados em servidores seguros localizados no Brasil ou em países com legislação de proteção de dados equivalente à LGPD.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2. Medidas de Segurança</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Criptografia:</strong> SSL/TLS para dados em trânsito, AES-256 para dados em repouso</li>
                  <li><strong>Senhas:</strong> Armazenadas com hash bcrypt (não reversível)</li>
                  <li><strong>Controle de Acesso:</strong> Autenticação de múltiplos fatores, permissões granulares</li>
                  <li><strong>Monitoramento:</strong> Logs de auditoria, detecção de intrusões</li>
                  <li><strong>Backups:</strong> Cópias regulares e seguras dos dados</li>
                  <li><strong>Atualizações:</strong> Patches de segurança aplicados regularmente</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.3. Retenção de Dados</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li><strong>Dados de Conta:</strong> Mantidos enquanto a conta estiver ativa</li>
                  <li><strong>Currículos e Análises:</strong> Armazenados por até 5 anos ou até exclusão pelo usuário</li>
                  <li><strong>Dados Financeiros:</strong> Mantidos por 5 anos conforme legislação fiscal</li>
                  <li><strong>Logs de Sistema:</strong> Retidos por 6 meses</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Seus Direitos (LGPD)</h2>
                
                <p className="text-foreground/80 mb-4">
                  De acordo com a LGPD, você tem os seguintes direitos sobre seus dados pessoais:
                </p>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Confirmação e Acesso
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Confirmar se tratamos seus dados e solicitar acesso a eles
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Correção
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Corrigir dados incompletos, inexatos ou desatualizados
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Anonimização, Bloqueio ou Eliminação
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Solicitar anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Portabilidade
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Solicitar portabilidade dos dados a outro fornecedor de serviço (formato estruturado)
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Eliminação de Dados
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Solicitar eliminação dos dados tratados com seu consentimento
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Informação sobre Compartilhamento
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Obter informações sobre entidades públicas e privadas com as quais compartilhamos dados
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Revogação de Consentimento
                    </h4>
                    <p className="text-sm text-foreground/80">
                      Revogar consentimento a qualquer momento (pode limitar funcionalidades)
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Como Exercer Seus Direitos</h3>
                <p className="text-foreground/80 mb-4">
                  Para exercer qualquer um desses direitos, entre em contato através de:
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <p className="text-foreground mb-2"><strong>Email:</strong> privacidade@seletoai.com.br</p>
                  <p className="text-foreground mb-2"><strong>Encarregado de Dados (DPO):</strong> [NOME]</p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Responderemos sua solicitação em até 15 dias úteis.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies e Tecnologias Similares</h2>
                
                <p className="text-foreground/80 mb-4">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência:
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.1. Tipos de Cookies</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Essenciais:</strong> Necessários para funcionamento (autenticação, segurança)</li>
                  <li><strong>Funcionais:</strong> Lembram preferências e configurações</li>
                  <li><strong>Analíticos:</strong> Coletam informações sobre uso da plataforma (anônimo)</li>
                  <li><strong>Marketing:</strong> Rastreiam visitantes para campanhas publicitárias (com consentimento)</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">6.2. Gerenciamento de Cookies</h3>
                <p className="text-foreground/80">
                  Você pode gerenciar cookies através das configurações do navegador. Note que desabilitar cookies essenciais pode afetar funcionalidades da plataforma.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Dados de Menores de Idade</h2>
                <p className="text-foreground/80">
                  A Seleto AI não é destinada a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se tomarmos conhecimento de que coletamos dados de menores inadvertidamente, tomaremos medidas para deletá-los imediatamente.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Transferência Internacional de Dados</h2>
                <p className="text-foreground/80 mb-4">
                  Alguns de nossos prestadores de serviços (como Google Cloud) podem estar localizados fora do Brasil. Nestes casos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Asseguramos que o país de destino oferece grau de proteção adequado</li>
                  <li>Implementamos cláusulas contratuais padrão aprovadas pela ANPD</li>
                  <li>Garantimos que os dados são protegidos conforme a LGPD</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Alterações nesta Política</h2>
                <p className="text-foreground/80 mb-4">
                  Podemos atualizar esta Política periodicamente para refletir mudanças em nossas práticas ou legislação aplicável. Notificaremos sobre alterações significativas através de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Email para o endereço cadastrado</li>
                  <li>Aviso destacado na Plataforma</li>
                  <li>Atualização da data no topo deste documento</li>
                </ul>
                <p className="text-foreground/80">
                  Recomendamos revisar esta Política periodicamente.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Autoridade Nacional de Proteção de Dados (ANPD)</h2>
                <p className="text-foreground/80 mb-4">
                  Caso suas solicitações não sejam atendidas satisfatoriamente, você pode contatar a ANPD:
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <p className="text-foreground mb-2"><strong>Website:</strong> www.gov.br/anpd</p>
                  <p className="text-foreground mb-2"><strong>Endereço:</strong> SAN Quadra 02, Bloco A, Brasília/DF</p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Contato</h2>
                <p className="text-foreground/80 mb-4">
                  Para questões sobre privacidade e proteção de dados:
                </p>
                <div className="bg-secondary/30 rounded-lg p-6 space-y-2">
                  <p className="text-foreground"><strong>Email de Privacidade:</strong> privacidade@seletoai.com.br</p>
                  <p className="text-foreground"><strong>Email de Suporte:</strong> suporte@seletoai.com.br</p>
                  <p className="text-foreground"><strong>DPO (Encarregado):</strong> [NOME E EMAIL]</p>
                  <p className="text-foreground"><strong>Website:</strong> www.seletoai.com.br</p>
                  <p className="text-foreground"><strong>Endereço:</strong> [ENDEREÇO COMPLETO]</p>
                </div>
              </section>

              {/* Final */}
              <div className="mt-12 border-t border-border pt-8">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Compromisso com Sua Privacidade
                  </h3>
                  <p className="text-sm text-foreground/80">
                    A Seleto AI está comprometida em proteger sua privacidade e tratar seus dados com o máximo cuidado e transparência. 
                    Implementamos as melhores práticas de segurança da informação e estamos em conformidade com a LGPD e demais 
                    legislações aplicáveis de proteção de dados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Seleto AI</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-foreground transition-colors">
                Voltar ao Início
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Seleto AI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
