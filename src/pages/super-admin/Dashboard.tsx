import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Building2,
  Users,
  PlayCircle,
  TrendingUp,
  Activity,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { companies, libraryContent } from '@/lib/mockData'

const mockGrowthData = [
  { name: 'Jan', companies: 2, users: 45 },
  { name: 'Fev', companies: 3, users: 120 },
  { name: 'Mar', companies: 5, users: 230 },
  { name: 'Abr', companies: 7, users: 340 },
  { name: 'Mai', companies: 8, users: 450 },
  { name: 'Jun', companies: 12, users: 680 },
]

export default function SuperAdminDashboard() {
  const totalCompanies = companies.length
  const totalUsers = 1250 // Mock total
  const totalContent = libraryContent.length
  const activeUsersPercentage = 78

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-heading text-primary">
          Visão Geral da Plataforma
        </h1>
        <p className="text-muted-foreground">
          Métricas globais de uso e engajamento do Health&Trust.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Empresas
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCompanies}</div>
            <p className="text-xs text-muted-foreground">
              +20% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {activeUsersPercentage}% de taxa de ativação
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conteúdos Publicados
            </CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContent}</div>
            <p className="text-xs text-muted-foreground">
              +3 novos itens esta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engajamento Médio
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              Taxa de conclusão de jornada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crescimento da Plataforma</CardTitle>
            <CardDescription>
              Novas empresas e usuários cadastrados no último semestre.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={mockGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="users"
                  name="Usuários"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="companies"
                  name="Empresas"
                  fill="hsl(var(--secondary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
            <CardDescription>Visão geral de infraestrutura.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      API Gateway
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Operacional - 24ms latência
                    </p>
                  </div>
                </div>
                <div className="ml-auto font-medium text-green-600">99.9%</div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Banco de Dados
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Operacional - Backup ok
                    </p>
                  </div>
                </div>
                <div className="ml-auto font-medium text-green-600">100%</div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Serviço de Email
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Degradação parcial
                    </p>
                  </div>
                </div>
                <div className="ml-auto font-medium text-yellow-600">95.0%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
