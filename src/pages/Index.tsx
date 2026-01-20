import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ShieldCheck,
  Activity,
  BookOpen,
  Lock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <span className="font-heading text-xl font-bold text-primary">
              Conviva<span className="text-secondary">Psi</span>
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Button asChild variant="default" className="font-medium">
              <Link to="/login">Acessar Plataforma</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="font-heading text-4xl font-bold tracking-tighter text-slate-900 sm:text-5xl xl:text-6xl/none">
                    Transforme a{' '}
                    <span className="text-primary">Saúde Corporativa</span> com
                    Dados e <span className="text-secondary">Privacidade</span>.
                  </h1>
                  <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                    A plataforma completa para gestão de riscos psicossociais.
                    Diagnósticos precisos, anonimato garantido e conteúdo
                    educativo para o bem-estar dos seus colaboradores.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button asChild size="lg" className="h-12 px-8 text-base">
                    <Link to="/login">
                      Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base"
                  >
                    <Link to="/login">Conheça os Planos</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Conformidade LGPD</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Metodologia Científica</span>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl bg-slate-200 ring-1 ring-slate-900/10">
                  <img
                    alt="Dashboard Conviva Psi"
                    className="object-cover w-full h-full"
                    src="https://img.usecurling.com/p/800/450?q=corporate%20dashboard%20analytics&color=blue"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 hidden md:block rounded-lg bg-white p-4 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                      <Activity className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Índice de Bem-estar
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        +24%{' '}
                        <span className="text-xs font-normal">este mês</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FRPS Impact Section - Strategic Value */}
        <section className="bg-slate-900 py-16 md:py-24 text-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary">
                  <Activity className="h-6 w-6" />
                  <span>Impacto Estratégico</span>
                </div>
                <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
                  A gestão dos FRPS impacta diretamente:
                </h2>
                <ul className="space-y-4 pt-4">
                  {[
                    'Processos trabalhistas',
                    'Custos com afastamentos',
                    'Retenção de talentos',
                    'Clima organizacional',
                    'Riscos reputacionais',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg">
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8 rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10">
                <p className="text-xl leading-relaxed text-slate-200">
                  "Empresas que se antecipam a essa mudança não apenas reduzem
                  riscos, mas também elevam engajamento, produtividade e
                  desempenho das lideranças."
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="text-base font-semibold"
                  >
                    <Link to="/login">Começar Diagnóstico</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Pillars Section */}
        <section className="bg-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nossos Pilares de Atuação
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Combinamos tecnologia e ciência para criar um ambiente de
                trabalho mais saudável e produtivo.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden border-t-4 border-t-primary transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Diagnóstico Psicossocial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">
                    Questionários validados cientificamente para mapear riscos,
                    estresse e burnout, gerando insights precisos para a gestão.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-t-4 border-t-secondary transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Lock className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Anonimato Garantido</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">
                    Segurança absoluta para os colaboradores. Dados apresentados
                    apenas de forma agregada, respeitando rigorosamente a LGPD.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden border-t-4 border-t-primary transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Biblioteca Educativa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-slate-600">
                    Acesso a um vasto acervo de vídeos e artigos sobre saúde
                    mental e física, promovendo o autocuidado contínuo.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-50 py-16 md:py-24 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              Pronto para transformar sua empresa?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10">
              Junte-se a empresas que já estão cuidando do seu ativo mais
              importante: as pessoas.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-semibold"
            >
              <Link to="/login">Acessar Plataforma</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-bold text-slate-700">Conviva Psi</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            &copy; 2025 Conviva Psi. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
