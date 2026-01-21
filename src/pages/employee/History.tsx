import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { questionnaireHistory } from '@/lib/mockData'
import useUserStore from '@/stores/useUserStore'
import { CheckCircle2, Calendar } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function History() {
  const { user } = useUserStore()

  const myHistory = questionnaireHistory.filter(
    (h) => h.employeeId === user?.id,
  )

  // Group by year
  const groupedHistory = myHistory.reduce(
    (acc, curr) => {
      const year = curr.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(curr)
      return acc
    },
    {} as Record<number, typeof myHistory>,
  )

  // Sort years descending
  const sortedYears = Object.keys(groupedHistory)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading text-primary">
          Histórico de Avaliações
        </h1>
        <p className="text-muted-foreground">
          Consulte as avaliações de risco psicossocial já realizadas.
        </p>
      </div>

      {sortedYears.length > 0 ? (
        sortedYears.map((year) => (
          <div key={year} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              {year}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groupedHistory[year]
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .map((item) => (
                  <Card
                    key={item.id}
                    className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge
                          variant="outline"
                          className="font-mono bg-slate-50"
                        >
                          {item.acronym}
                        </Badge>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <CardTitle className="text-base mt-2">
                        {item.title}
                      </CardTitle>
                      <CardDescription>
                        Realizado em{' '}
                        {format(parseISO(item.date), "d 'de' MMMM", {
                          locale: ptBR,
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Status:{' '}
                        <span className="text-green-600 font-medium">
                          Concluído
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))
      ) : (
        <Card className="bg-slate-50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-200 p-4 mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-lg text-slate-700">
              Nenhuma avaliação encontrada
            </h3>
            <p className="text-muted-foreground">
              Você ainda não completou nenhum questionário de diagnóstico.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
