import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Terms() {
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
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-foreground">Termos de Uso</h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert">
            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Aceitação dos Termos</h2>
                <p className="text-foreground/80 mb-4">
                  Ao acessar e usar a plataforma Seleto AI ("Plataforma"), você ("Usuário") concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
                <p className="text-foreground/80">
                  A Seleto AI é uma plataforma de análise de currículos com inteligência artificial.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Descrição dos Serviços</h2>
                <p className="text-foreground/80 mb-4">
                  A Seleto AI oferece:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Análise automatizada de currículos utilizando inteligência artificial</li>
                  <li>Geração de scores de compatibilidade e senioridade</li>
                  <li>Extração de competências técnicas e comportamentais</li>
                  <li>Relatórios detalhados em formato digital e PDF</li>
                  <li>Histórico de análises realizadas</li>
                  <li>Sistema de créditos para utilização dos serviços</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Cadastro e Conta de Usuário</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.1. Requisitos de Cadastro</h3>
                <p className="text-foreground/80 mb-4">
                  Para utilizar a Plataforma, você deve:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Ter capacidade legal para contratar (maior de 18 anos)</li>
                  <li>Fornecer informações verdadeiras, precisas e atualizadas</li>
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Ser responsável por todas as atividades realizadas em sua conta</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">3.2. Contas Empresariais</h3>
                <p className="text-foreground/80">
                  Contas criadas em nome de empresas devem ser registradas por representantes autorizados. O representante garante ter autoridade para vincular a empresa a estes Termos.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Sistema de Créditos e Pagamentos</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.1. Créditos</h3>
                <p className="text-foreground/80 mb-4">
                  Cada análise de currículo consome 1 (um) crédito. Os créditos podem ser adquiridos através de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Pacotes avulsos de créditos</li>
                  <li>Assinaturas mensais com créditos inclusos</li>
                  <li>Promoções e ofertas especiais</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.2. Validade dos Créditos</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li><strong>Créditos de Assinatura:</strong> Renovam mensalmente e não acumulam. Créditos não utilizados expiram ao final do período.</li>
                  <li><strong>Créditos Avulsos:</strong> Não expiram.</li>
                  <li><strong>Créditos Promocionais:</strong> Podem ter validades específicas conforme termos da promoção.</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.3. Pagamentos</h3>
                <p className="text-foreground/80 mb-4">
                  Os pagamentos são processados por gateways de terceiros seguros. Aceitamos:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Cartões de crédito (Visa, Mastercard, Elo, etc.)</li>
                  <li>PIX</li>
                  <li>Boleto bancário</li>
                </ul>
                <p className="text-foreground/80">
                  Todas as transações são realizadas em Real brasileiro (BRL).
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">4.4. Cancelamento e Reembolso</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Assinaturas podem ser canceladas a qualquer momento, mantendo acesso até o fim do período pago</li>
                  <li>Créditos não utilizados de pacotes avulsos não são reembolsáveis</li>
                  <li>Reembolsos serão analisados caso a caso em situações de falha técnica comprovada</li>
                  <li>O usuário tem direito ao arrependimento em até 7 dias após a compra, conforme CDC</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Uso Aceitável</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.1. Você PODE:</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Analisar currículos para fins de recrutamento e seleção legítimos</li>
                  <li>Exportar e compartilhar relatórios gerados pela Plataforma</li>
                  <li>Utilizar os insights para tomada de decisões de contratação</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">5.2. Você NÃO PODE:</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Fazer engenharia reversa, descompilar ou desmontar a Plataforma</li>
                  <li>Usar a Plataforma para fins ilegais ou não autorizados</li>
                  <li>Tentar obter acesso não autorizado a sistemas ou dados</li>
                  <li>Revender ou redistribuir o acesso à Plataforma sem autorização</li>
                  <li>Realizar scraping, data mining ou atividades automatizadas não autorizadas</li>
                  <li>Submeter malware, vírus ou código malicioso</li>
                  <li>Violar direitos de propriedade intelectual</li>
                  <li>Usar a Plataforma de forma discriminatória ou que viole direitos humanos</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Propriedade Intelectual</h2>
                <p className="text-foreground/80 mb-4">
                  Todo o conteúdo da Plataforma, incluindo mas não limitado a textos, gráficos, logos, ícones, imagens, algoritmos, código-fonte e software, é propriedade da Seleto AI ou de seus licenciadores e está protegido por leis de direitos autorais e propriedade intelectual.
                </p>
                <p className="text-foreground/80 mb-4">
                  <strong>Dados dos Usuários:</strong> Você mantém todos os direitos sobre os currículos e dados que envia para análise. Ao usar a Plataforma, você concede à Seleto AI uma licença limitada para processar esses dados com o objetivo de fornecer os serviços.
                </p>
                <p className="text-foreground/80">
                  <strong>Relatórios Gerados:</strong> Os relatórios e análises gerados pela IA são de sua propriedade e podem ser utilizados conforme sua necessidade.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Privacidade e Proteção de Dados</h2>
                {/* <p className="text-foreground/80 mb-4">
                  O tratamento de dados pessoais pela Seleto AI está descrito em nossa{' '}
                  <Link to="/privacy" className="text-primary hover:underline font-semibold">
                    Política de Privacidade
                  </Link>
                  , que é parte integrante destes Termos.
                </p> */}
                <p className="text-foreground/80">
                  Estamos comprometidos com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitação de Responsabilidade</h2>
                <p className="text-foreground/80 mb-4">
                  <strong>A Seleto AI fornece a Plataforma "no estado em que se encontra" e "conforme disponível".</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>As análises geradas por IA são ferramentas de apoio à decisão, não substituem o julgamento humano</li>
                  <li>Não garantimos a precisão, completude ou adequação das análises para todos os propósitos</li>
                  <li>Não nos responsabilizamos por decisões de contratação tomadas com base nas análises</li>
                  <li>Não garantimos disponibilidade ininterrupta ou livre de erros</li>
                  <li>Não nos responsabilizamos por danos indiretos, incidentais ou consequenciais</li>
                </ul>
                <p className="text-foreground/80">
                  Nossa responsabilidade total está limitada ao valor pago pelo Usuário nos últimos 12 meses.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Disponibilidade e Manutenção</h2>
                <p className="text-foreground/80 mb-4">
                  Nos reservamos o direito de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Realizar manutenções programadas com aviso prévio</li>
                  <li>Suspender temporariamente o serviço para atualizações emergenciais</li>
                  <li>Modificar ou descontinuar funcionalidades mediante aviso de 30 dias</li>
                  <li>Implementar melhorias e novos recursos</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Suspensão e Encerramento</h2>
                <p className="text-foreground/80 mb-4">
                  Podemos suspender ou encerrar sua conta imediatamente, sem aviso prévio, se:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Você violar estes Termos de Uso</li>
                  <li>Houver suspeita de atividade fraudulenta</li>
                  <li>Seu uso prejudicar a Plataforma ou outros usuários</li>
                  <li>Por ordem judicial ou exigência legal</li>
                </ul>
                <p className="text-foreground/80">
                  Você pode encerrar sua conta a qualquer momento através das configurações da conta ou entrando em contato conosco.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Modificações dos Termos</h2>
                <p className="text-foreground/80 mb-4">
                  Podemos atualizar estes Termos periodicamente. Notificaremos sobre alterações significativas através de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4 mb-4">
                  <li>Email para o endereço cadastrado</li>
                  <li>Aviso destacado na Plataforma</li>
                  <li>Atualização da data no topo deste documento</li>
                </ul>
                <p className="text-foreground/80">
                  O uso continuado da Plataforma após as alterações constitui aceitação dos novos Termos.
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Lei Aplicável e Jurisdição</h2>
                <p className="text-foreground/80 mb-4">
                  Estes Termos são regidos pelas leis da República Federativa do Brasil.
                </p>
                <p className="text-foreground/80">
                  Qualquer disputa decorrente destes Termos será submetida ao foro da comarca de [CIDADE], com exclusão de qualquer outro, por mais privilegiado que seja.
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contato</h2>
                <p className="text-foreground/80 mb-4">
                  Para dúvidas, suporte ou questões relacionadas a estes Termos:
                </p>
                <div className="bg-secondary/30 rounded-lg p-6 space-y-2">
                  <p className="text-foreground"><strong>Email:</strong> suporte@seletoai.com.br</p>
                  <p className="text-foreground"><strong>Website:</strong> www.seletoai.com.br</p>
                  <p className="text-foreground"><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h</p>
                </div>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">14. Disposições Gerais</h2>
                <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                  <li>Se qualquer disposição destes Termos for considerada inválida, as demais permanecem em vigor</li>
                  <li>A falha em exercer qualquer direito não constitui renúncia</li>
                  <li>Estes Termos não criam relação de sociedade, agência ou emprego</li>
                  <li>Você não pode transferir seus direitos sem nosso consentimento</li>
                  <li>Podemos ceder nossos direitos a qualquer momento</li>
                </ul>
              </section>

              {/* Final */}
              <div className="mt-12 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground text-center">
                  Ao utilizar a Seleto AI, você declara ter lido, compreendido e concordado com estes Termos de Uso.
                </p>
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
              {/* <Link to="/privacy" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </Link> */}
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
