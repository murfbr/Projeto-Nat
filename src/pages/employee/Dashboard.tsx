import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { libraryContent, companies } from '@/lib/mockData'
import { PlayCircle, FileText, ClipboardCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import useUserStore from '@/stores/useUserStore'

export default function EmployeeDashboard() {
  const { user } = useUserStore()

  // Helper to find partner ID for current user
  const getUserPartnerId = () => {
    if (!user?.companyId) return null
    const company = companies.find((c) => c.id === user.companyId)
    return company?.partnerId
  }

  // Filter content logic
  const filteredContent = libraryContent.filter((item) => {
    if (!item.visible) return false
    if (item.scope === 'global') return true

    // Partner check
    if (item.scope === 'partner') {
      const partnerId = getUserPartnerId()
      return partnerId && item.targetId === partnerId
    }

    if (item.scope === 'company' && item.targetId === user?.companyId)
      return true
    if (item.scope === 'sector' && item.targetId === user?.sectorId) return true
    if (item.scope === 'user' && item.targetId === user?.id) return true
    return false
  })

  // Take top 5 for dashboard
  const featuredContent = filteredContent.slice(0, 5)

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold font-heading text-primary">
          Olá, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu espaço de cuidado e bem-estar no Psi Med.
        </p>

        <Card className="border-l-4 border-l-secondary bg-gradient-to-r from-blue-50 to-transparent shadow-md">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-secondary" />
                Questionário Pendente
              </h2>
              <p className="text-sm text-gray-600">
                Sua avaliação mensal está disponível. Leva menos de 5 minutos.
              </p>
            </div>
            <Button
              className="bg-primary shadow-lg shadow-blue-900/20 hover:bg-primary/90"
              asChild
            >
              <Link to="/employee/questionnaire">Responder Agora</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-heading">
            Destaques da Biblioteca
          </h2>
          <Link
            to="/employee/library"
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver tudo
          </Link>
        </div>

        {featuredContent.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {featuredContent.map((item) => (
              <Link
                key={item.id}
                to={`/employee/library`}
                className="snap-start min-w-[280px] w-[280px]"
              >
                <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-video w-full relative">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 right-2 text-xs font-medium text-white bg-black/50 px-2 py-0.5 rounded">
                      {item.type === 'video' ? item.duration : 'Artigo'}
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-10 w-10 text-white/80" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium leading-tight text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.category}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm italic">
            Nenhum conteúdo destacado.
          </div>
        )}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sua Jornada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <span>Progresso Mensal</span>
                <span className="font-medium text-primary">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <p className="text-sm text-muted-foreground">
              Complete os questionários e assista aos conteúdos para completar
              sua jornada de saúde.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
